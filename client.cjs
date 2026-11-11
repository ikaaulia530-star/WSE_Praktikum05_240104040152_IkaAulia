const fs = require('node:fs');

const method = (process.argv[2] || 'GET').toUpperCase();
const resource = process.argv[3] || '/api/buku';
const file = process.argv[4];
const mediaType = process.argv[5] || 'application/json';

const BASE = 'http://127.0.0.1:3200';

async function main() {
  const options = {
    method,
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(5000)
  };

  if (file) {
    options.body = fs.readFileSync(file, 'utf8');
    options.headers['Content-Type'] = mediaType;
  }

  console.log('Request:', method, BASE + resource);
  console.log('Body request:', options.body || '(kosong)');

  let response;
  let text;

  try {
    response = await fetch(BASE + resource, options);
    text = await response.text();
  } catch (error) {
    console.error(
      'Tidak memperoleh respons HTTP lengkap:', error.name
    );
    process.exitCode = 1;
    return;
  }

  console.log('HTTP:', response.status);
  console.log('Content-Type:', response.headers.get('content-type'));
  console.log('Location:', response.headers.get('location') || '-');
  console.log('Cache-Control:', response.headers.get('cache-control'));
  console.log('Body respons:', text || '(kosong)');
}

main().catch((error) => {
  console.error('Client gagal:', error.message);
  process.exitCode = 1;
});
