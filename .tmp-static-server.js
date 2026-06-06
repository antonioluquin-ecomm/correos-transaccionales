const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(process.cwd());
const port = 8723;
const host = '127.0.0.1';

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

http
  .createServer((req, res) => {
    let urlPath;
    try {
      urlPath = decodeURIComponent(req.url.split('?')[0]);
    } catch (error) {
      res.writeHead(400);
      res.end('Bad request');
      return;
    }

    if (urlPath === '/') urlPath = '/index.html';
    const filePath = path.resolve(root, '.' + urlPath);
    const isInsideRoot = filePath === root || filePath.startsWith(root + path.sep);
    if (!isInsideRoot) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found: ' + urlPath);
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
      res.end(data);
    });
  })
  .listen(port, host, () => console.log(`listening on http://${host}:${port}`));
