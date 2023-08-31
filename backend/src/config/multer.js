require('dotenv').config();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storageTypes = {
	local: multer.diskStorage({
		destination: (req, file, callBack) => {
			callBack(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
		},
		filename: (req, file, callBack) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) callBack(err);

				const formatedName = file.originalname.replaceAll(' ', '%20');

				file.key = `${hash.toString('hex')}-${formatedName}`;

				callBack(null, file.key);
			});
		},
	}),
};

module.exports = {
	dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
	storage: storageTypes['local'],
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
	fileFilter: (req, file, callBack) => {
		const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

		if (allowedMimes.includes(file.mimetype)) {
			callBack(null, true);
		} else {
			callBack(new Error('Invalid file type.'));
		}
	},
};
