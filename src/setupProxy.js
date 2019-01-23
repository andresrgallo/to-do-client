const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(proxy(['/todos', '/users'], { target: 'http://localhost:5000' }));
};
