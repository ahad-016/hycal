import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get token from arguments or environment variable
const token = process.argv[2] || process.env.VERCEL_TOKEN;

if (!token) {
  console.log('====================================================');
  console.log('  Vercel Direct Deployment Tool');
  console.log('====================================================');
  console.log('Usage: node deploy_to_vercel.js <YOUR_VERCEL_TOKEN>');
  console.log('');
  console.log('How to get your free Vercel token:');
  console.log('1. Open: https://vercel.com/account/tokens');
  console.log('2. Click "Create Token", give it a name (e.g. "hycal"), and copy it.');
  console.log('3. Run: node deploy_to_vercel.js <paste_token_here>');
  console.log('====================================================');
  process.exit(1);
}

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        const text = buffer.toString('utf-8');
        try {
          const json = JSON.parse(text);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ statusCode: res.statusCode, data: json });
          } else {
            reject({ statusCode: res.statusCode, error: json });
          }
        } catch {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ statusCode: res.statusCode, data: text });
          } else {
            reject({ statusCode: res.statusCode, error: text });
          }
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function getAllFiles(dir, base = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === '.git' || file === 'node_modules') continue;
    const fullPath = path.join(dir, file);
    const relPath = base ? `${base}/${file}` : file;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, relPath));
    } else {
      results.push({ fullPath, relPath });
    }
  }
  return results;
}

async function deploy() {
  console.log('Reading project files...');
  const filesList = getAllFiles(__dirname);
  console.log(`Found ${filesList.length} files to upload.`);

  const filesPayload = [];

  for (const item of filesList) {
    const content = fs.readFileSync(item.fullPath);
    const sha = crypto.createHash('sha1').update(content).digest('hex');

    // Upload file if not present
    try {
      await request({
        hostname: 'api.vercel.com',
        path: '/v2/files',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Length': content.length,
          'x-vercel-digest': sha
        }
      }, content);
    } catch (err) {
      // 409 or already exists is fine
    }

    filesPayload.push({
      file: item.relPath,
      sha: sha,
      size: content.length
    });
  }

  console.log('Creating Vercel deployment...');
  const deployPayload = JSON.stringify({
    name: 'hycal-aircon',
    files: filesPayload,
    projectSettings: {
      framework: null
    }
  });

  const res = await request({
    hostname: 'api.vercel.com',
    path: '/v13/deployments',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(deployPayload)
    }
  }, deployPayload);

  console.log('\n====================================================');
  console.log('  SUCCESSFULLY DEPLOYED TO VERCEL!');
  console.log('====================================================');
  console.log(`Live URL: https://${res.data.url}`);
  if (res.data.alias && res.data.alias.length > 0) {
    console.log(`Production Alias: https://${res.data.alias[0]}`);
  }
  console.log('====================================================\n');
}

deploy().catch(err => {
  console.error('\nDeployment failed:', JSON.stringify(err, null, 2));
  process.exit(1);
});
