module.exports = {
  apps: [
    {
      name: 'Invoicious',
      exec_mode: 'cluster',
      instances: 1, // or 'max'
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}