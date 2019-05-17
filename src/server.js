const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());

mongoose.connect(
	// 'mongodb+srv://boxfiles:boxFiles2019@cluster0-jcs5n.mongodb.net/vuttr?retryWrites=true',
	'mongodb://127.0.0.1/vuttr?retryWrites=true',
	{
		useNewUrlParser: true
	}
);
mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

app.listen(process.env.PORT || 3000);