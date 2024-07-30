const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined')); // Ajoute des logs de requêtes HTTP

app.use('/users', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: { '^/users': '' },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying request to /users: ${req.method} ${req.originalUrl}`);
  },
}));

app.use('/tenants', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: { '^/tenants': '' },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying request to /tenants: ${req.method} ${req.originalUrl}`);
  },
}));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
