module.exports = {
  apps: [
    {
      name: 'spacetraders-api',
      script: 'dist/index.js',
      env: {
        NODE_ENV: 'PROD',
      },
      env_dev: {
        NODE_ENV: 'DEV'
      },
      watch: true,
      time: true,
      merge_logs: true,
    },
  ],
};
