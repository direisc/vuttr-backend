const express = require('express');
const routes = express.Router();

const ToolController = require('./controllers/ToolController');
const OauthController = require('./controllers/OauthController');

routes.post('/tools', ToolController.store);
routes.get('/tools', ToolController.find);
routes.delete('/tools/:id', OauthController.authenticateRequest, ToolController.remove);
// routes.delete('/tools/:id', ToolController.remove);

routes.get('/', (req, res) => {
	return res.send('Sai daqui rapaz!');
});

module.exports = routes;