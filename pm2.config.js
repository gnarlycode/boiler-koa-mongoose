const path = require('path')

module.exports = {
  apps: [
    {
      name: '_app_name_',
      cwd: path.resolve(__dirname, '../'),
      script: 'npm',
      args: 'start',
    },
  ],
}
