const keystone = require('keystone');
require('dotenv').config();

keystone.init({
        'cookie secret':process.env.COOKIE_SECRET,
        'name':'happy-elves',
        'user model':'User',
        'auto update':true,
        'auth':true,
        'cloudinary config': process.env.CLOUDINARY_URL,

});

keystone.import('models');
keystone.set('admin path', 'admin');
keystone.set('routes', require('./routes'));

keystone.start();

