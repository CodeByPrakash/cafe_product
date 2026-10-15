const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('reference/Brewtoria Café.html', 'utf8');

const imStart = html.indexOf('const IM=');
const phStart = html.indexOf(',PH=');

if (imStart !== -1 && phStart !== -1) {
  const imStr = html.slice(imStart + 9, phStart);
  const im = JSON.parse(imStr);
  console.log('IM keys:', Object.keys(im));

  const phEnd = html.indexOf('},$=');
  const phStr = html.slice(phStart + 4, phEnd + 1);
  const ph = JSON.parse(phStr);
  console.log('PH keys:', Object.keys(ph));

  const outDir = path.join('public', 'extracted');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const metadata = { im: {}, ph: {} };

  for (const [k, v] of Object.entries(im)) {
    const base64Data = v.src.replace(/^data:image\/\w+;base64,/, '');
    const ext = v.src.includes('webp') ? 'webp' : 'png';
    const filename = `${k}.${ext}`;
    fs.writeFileSync(path.join(outDir, filename), Buffer.from(base64Data, 'base64'));
    metadata.im[k] = { file: `/extracted/${filename}`, ar: v.ar };
    console.log(`Saved IM ${k} -> ${filename} (ar: ${v.ar})`);
  }

  for (const [k, v] of Object.entries(ph)) {
    const base64Data = v.replace(/^data:image\/\w+;base64,/, '');
    const filename = `${k}.jpg`;
    fs.writeFileSync(path.join(outDir, filename), Buffer.from(base64Data, 'base64'));
    metadata.ph[k] = { file: `/extracted/${filename}` };
    console.log(`Saved PH ${k} -> ${filename}`);
  }

  fs.writeFileSync(path.join('public', 'extracted', 'metadata.json'), JSON.stringify(metadata, null, 2));
  console.log('Metadata saved to public/extracted/metadata.json');
} else {
  console.error('Could not find IM or PH in html');
}
