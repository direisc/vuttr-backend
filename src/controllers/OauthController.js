const OAuth2Server = require('oauth2-server'),
	Request = OAuth2Server.Request,
	Response = OAuth2Server.Response;
const model = require('../models/model');

class OauthController {

	constructor() {
		this.oauth = new OAuth2Server({
			model,
			accessTokenLifetime: 60 * 60,
			allowBearerTokensInQueryString: true
		});
		// bind das funções para poder pegar os valores internos 
		this.obtainToken = this.obtainToken.bind(this);
		this.authenticateRequest = this.authenticateRequest.bind(this);
	}

	obtainToken(req, res) {
		var request = new Request(req);
		var response = new Response(res);
		return this.oauth.token(request, response)
			.then(function (token) {
				res.json(token);
			})
			.catch(function (err) {
				res.status(err.code || 500).json(err);
			});
	}

	authenticateRequest(req, res, next) {
		var that = this;
		var request = new Request(req);
		var response = new Response(res);
		return that.oauth.authenticate(request, response)
			.then(function (token) {
				next();
			})
			.catch(function (err) {
				res.status(err.code || 500).json(err);
			});
	}
}

module.exports = new OauthController();