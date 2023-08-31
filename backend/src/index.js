require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

async function main() {
	mongoose.connect(process.env.MONGO_URL, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});
	console.log('conectado com sucesso');
}

main().catch((err) => {
	console.log(err);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.use(require('./routes/routes'));

app.listen(3000);
