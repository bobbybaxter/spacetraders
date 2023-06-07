module.exports = {
  apps: [
    {
      name: 'spacetraders-api',
      script: './dist/index.js',
      node_args: '--experimental-loader=extensionless',
      env: {
        NODE_ENV: 'production',
        TS_NODE_BASEURL: './dist',
      },
    },
  ],
};
