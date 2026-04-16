/**
 * server-local.js
 * Servidor de desarrollo local para mgcolombia.com_tema1
 * Replica las reglas del .htaccess para poder ver las páginas de ciudades
 * correctamente en local sin necesidad de un servidor Apache.
 *
 * USO: node server-local.js
 * Luego abrir: http://localhost:3000
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT    = 3000;
const ROOT    = __dirname;

// Tipos MIME básicos
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.pdf':  'application/pdf',
};

function serveFile(res, filePath) {
  const ext  = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 - Archivo no encontrado</h1><p>' + filePath + '</p>');
      return;
    }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  // Quitar query string
  let urlPath = req.url.split('?')[0];

  // Intentar servir el archivo/directorio directamente primero
  let fullPath = path.join(ROOT, urlPath);

  // Si el path termina en '/', buscar index.html en ese directorio
  if (urlPath.endsWith('/') || urlPath === '') {
    const indexDirect = path.join(fullPath, 'index.html');
    if (fs.existsSync(indexDirect)) {
      console.log(`[DIRECTO]  ${urlPath} → ${indexDirect.replace(ROOT, '')}`);
      return serveFile(res, indexDirect);
    }
  }

  // Si es un archivo concreto que existe, servirlo directo
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    console.log(`[ARCHIVO]  ${urlPath}`);
    return serveFile(res, fullPath);
  }

  // ─── REGLA .htaccess: /nombre-ciudad/ → ciudad/nombre-ciudad/index.html ───
  // Extrae el primer segmento de la URL (e.g. "medellin" de "/medellin/")
  const parts   = urlPath.replace(/^\//, '').replace(/\/$/, '').split('/');
  const segment = parts[0];

  if (segment && parts.length === 1) {
    // Primero intentar en /ciudad/<nombre>/index.html (como Apache)
    const ciudadPath = path.join(ROOT, 'ciudad', segment, 'index.html');
    if (fs.existsSync(ciudadPath)) {
      console.log(`[CIUDAD]   /${segment}/ → /ciudad/${segment}/index.html`);
      return serveFile(res, ciudadPath);
    }

    // También intentar directamente /<nombre>/index.html (carpeta en raíz)
    const rootCityPath = path.join(ROOT, segment, 'index.html');
    if (fs.existsSync(rootCityPath)) {
      console.log(`[CARPETA]  /${segment}/ → /${segment}/index.html`);
      return serveFile(res, rootCityPath);
    }
  }

  // 404 final
  console.log(`[404]      ${urlPath}`);
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <h1>404 - Página no encontrada</h1>
    <p>URL: <code>${urlPath}</code></p>
    <p><a href="/">← Volver al inicio</a></p>
  `);
});

server.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log('  🧬 Servidor local - Mundo Genético Colombia');
  console.log('═══════════════════════════════════════════════════');
  console.log(`  ✅ Corriendo en: http://localhost:${PORT}`);
  console.log(`  📁 Raíz:        ${ROOT}`);
  console.log('');
  console.log('  Rutas disponibles de ejemplo:');
  console.log(`  → http://localhost:${PORT}/`);
  console.log(`  → http://localhost:${PORT}/medellin/`);
  console.log(`  → http://localhost:${PORT}/bogota/`);
  console.log(`  → http://localhost:${PORT}/pruebas-de-paternidad/`);
  console.log('');
  console.log('  Presiona Ctrl+C para detener el servidor.');
  console.log('═══════════════════════════════════════════════════');
});
