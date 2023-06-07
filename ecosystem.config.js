module.exports = {
  apps: [
    {
      name: 'spacetraders-api',
      script: './dist/index.js',
      env: {
        NODE_ENV: 'production',
        TS_NODE_BASEURL: './dist',
      },
    },
  ],
};
