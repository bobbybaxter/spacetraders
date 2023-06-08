module.exports = {
  apps: [
    {
      name: 'spacetraders-api',
      script: 'dist/index.js',
      env: {
        NODE_ENV: 'PROD',
      },
      watch: true,
    },
  ],
};
