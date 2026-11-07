import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function newsfiedDevPlugin() {
  const dataFilePath = path.resolve(__dirname, 'src/data/newsfied.json');
  const imagesDirPath = path.resolve(__dirname, 'public/newsfied-images');

  return {
    name: 'vite-plugin-newsfied-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Direct image serving helper for /newsfied-images/ (including when called from /admin or nested routes)
        if (req.url && req.url.includes('/newsfied-images/')) {
          const filename = req.url.split('/newsfied-images/')[1].split('?')[0];
          const targetPath = path.join(imagesDirPath, filename);
          if (fs.existsSync(targetPath)) {
            const ext = path.extname(targetPath).toLowerCase();
            const mimeMap = {
              '.png': 'image/png',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.webp': 'image/webp',
              '.gif': 'image/gif',
              '.svg': 'image/svg+xml'
            };
            res.setHeader('Content-Type', mimeMap[ext] || 'application/octet-stream');
            res.setHeader('Cache-Control', 'public, max-age=3600');
            return fs.createReadStream(targetPath).pipe(res);
          }
        }

        if (!req.url?.startsWith('/api/newsfied')) {
          return next();
        }

        // GET all posts
        if (req.method === 'GET') {
          try {
            if (!fs.existsSync(dataFilePath)) {
              fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
              fs.writeFileSync(dataFilePath, '[]', 'utf-8');
            }
            const data = fs.readFileSync(dataFilePath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data || '[]');
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        // POST a new post or save all
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body);
              fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });

              if (Array.isArray(payload)) {
                fs.writeFileSync(dataFilePath, JSON.stringify(payload, null, 2), 'utf-8');
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: true, count: payload.length }));
              }

              let currentList = [];
              if (fs.existsSync(dataFilePath)) {
                try {
                  currentList = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
                } catch {
                  currentList = [];
                }
              }

              // Process base64 image if uploaded
              if (payload.image && payload.image.startsWith('data:image')) {
                try {
                  fs.mkdirSync(imagesDirPath, { recursive: true });
                  const matches = payload.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                  if (matches && matches.length === 3) {
                    const ext = matches[1].split('/')[1]?.replace('jpeg', 'jpg') || 'png';
                    const filename = `news_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
                    const imgPath = path.join(imagesDirPath, filename);
                    fs.writeFileSync(imgPath, Buffer.from(matches[2], 'base64'));
                    payload.image = `/newsfied-images/${filename}`;
                  }
                } catch (e) {
                  console.error('Failed to save image file:', e);
                }
              }

              const existingIdx = currentList.findIndex(item => String(item.id) === String(payload.id));
              let savedPost;
              if (existingIdx !== -1) {
                savedPost = {
                  ...currentList[existingIdx],
                  ...payload
                };
                currentList[existingIdx] = savedPost;
              } else {
                savedPost = {
                  id: payload.id || `news_${Date.now()}`,
                  title: payload.title || '',
                  content: payload.content || '',
                  image: payload.image || '',
                  gradient: payload.gradient || 'from-[#fbb034] via-[#ff9900] to-[#ff5e36]',
                  istFormatted: payload.istFormatted || '',
                  timestamp: payload.timestamp || Date.now(),
                  badge: payload.badge || 'LIVE UPDATE'
                };
                currentList = [savedPost, ...currentList];
              }

              fs.writeFileSync(dataFilePath, JSON.stringify(currentList, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, post: savedPost }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // UPDATE post image (PUT /api/newsfied/:id/image)
        if (req.method === 'PUT' && req.url.startsWith('/api/newsfied')) {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const urlParts = req.url.split('?')[0].split('/');
              // /api/newsfied/:id/image -> id is urlParts[3]
              const id = urlParts[3];
              const payload = JSON.parse(body || '{}');

              // Process base64 image if uploaded
              if (payload.image && payload.image.startsWith('data:image')) {
                try {
                  fs.mkdirSync(imagesDirPath, { recursive: true });
                  const matches = payload.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                  if (matches && matches.length === 3) {
                    const ext = matches[1].split('/')[1]?.replace('jpeg', 'jpg') || 'png';
                    const filename = `news_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
                    const imgPath = path.join(imagesDirPath, filename);
                    fs.writeFileSync(imgPath, Buffer.from(matches[2], 'base64'));
                    payload.image = `/newsfied-images/${filename}`;
                  }
                } catch (e) {
                  console.error('Failed to save image file:', e);
                }
              }

              let currentList = [];
              if (fs.existsSync(dataFilePath)) {
                try {
                  currentList = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
                } catch {
                  currentList = [];
                }
              }

              let updatedPost = null;
              currentList = currentList.map(item => {
                if (String(item.id) === String(id)) {
                  updatedPost = {
                    ...item,
                    ...payload,
                    id: item.id
                  };
                  return updatedPost;
                }
                return item;
              });

              fs.writeFileSync(dataFilePath, JSON.stringify(currentList, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, post: updatedPost, image: payload.image }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // DELETE a post
        if (req.method === 'DELETE') {
          const urlParts = req.url.split('/');
          const id = urlParts[urlParts.length - 1];
          try {
            let currentList = [];
            if (fs.existsSync(dataFilePath)) {
              currentList = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
            }
            const updated = currentList.filter(item => String(item.id) !== String(id));
            fs.writeFileSync(dataFilePath, JSON.stringify(updated, null, 2), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, count: updated.length }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://astrofied.netlify.app'
    }),
    newsfiedDevPlugin()
  ],
  server: {
    port: 5174,
  },
  // Relative base path ensures compatibility across all hosting platforms (Netlify, GH Pages, etc.)
  base: './',
})
