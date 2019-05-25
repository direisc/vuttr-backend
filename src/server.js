const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const OAuth2Server = require('oauth2-server'),
	Request = OAuth2Server.Request,
	Response = OAuth2Server.Response;

const OauthController = require('./controllers/OauthController');

const app = express();

app.use(cors());

mongoose.connect(
	'mongodb+srv://boxfiles:boxFiles2019@cluster0-jcs5n.mongodb.net/vuttr?retryWrites=true',
	// 'mongodb://127.0.0.1/vuttr?retryWrites=true',
	{
		useNewUrlParser: true
	}
);
mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('/oauth/token', OauthController.obtainToken);

app.use(require('./routes'));

app.use(function (err, req, res, next) {
	res.status(err.status || 500).end();
});

app.listen(process.env.PORT || 3000);
