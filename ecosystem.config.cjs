module.exports = {
  apps: [
    {
      name: "techtitans-api-server",
      script: "pnpm",
      args: "--filter @workspace/api-server start",
      env: {
        NODE_ENV: "production",
        PORT: 8080
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      error_file: "logs/pm2-error.log",
      out_file: "logs/pm2-out.log"
    }
  ]
};
