const keystone = require('keystone');
const importRoutes = keystone.importer(__dirname);
const cors = require('cors');

const routes = {
        api: importRoutes('./api')
};

exports = module.exports = function(app){
        app.use(cors());
        app.get('/promotionImage', routes.api.promotionImage.list);
        app.get('/product/:id', routes.api.product.listIndv);
        app.get('/supriseme', routes.api.supriseme.listIndv);
        app.get('/categories', routes.api.category.list);
        app.get('/categories/:category/:subcategories', routes.api.subcategory.list)
        app.post('/charge', routes.api.charge.charge);
        app.get("/charge/:id", routes.api.charge.getChargeById);
        app.get("/disabledDates", routes.api.disableddate.list);
}

