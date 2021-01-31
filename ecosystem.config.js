module.exports = {
  apps: [
    {
      name: 'Invoicious',
      script: './start.js',
      env: {
        HOST: 'localhost',
        PORT: 3000
      }
    }
  ]
}