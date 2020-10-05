const { createProxyMiddleware } = require('http-proxy-middleware');
const token = process.env.BEARER_TOKEN; 

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.twitter.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
      headers: {
        'Authorization': `Bearer ${token}`
      },
      onProxyRes: (pRes, req, res) => {
        console.log('Response success', req.url);
      },
      onError: (err, req, res) => {
        console.log('ERROR', err.message)
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Something went wrong. And we are reporting a custom error message.');
      }
    })
  );
};