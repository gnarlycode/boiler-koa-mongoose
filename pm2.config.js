const path = require('path')

module.exports = {
  apps: [
    {
      name: 'dropin-backend',
      cwd: path.resolve(__dirname, '../'),
      script: 'npm',
      args: 'start',
    },
  ],
}
