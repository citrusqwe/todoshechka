const prodConfig = require('./.webpack/config.prod');
const devConfig = require('./.webpack/config.dev');

module.exports = (env) => (env.mode === 'development' ? devConfig : prodConfig);
