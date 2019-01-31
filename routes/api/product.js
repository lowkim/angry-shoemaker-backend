const keystone = require('keystone');
const Product = keystone.list('Product');

exports.listIndv = (req, res) => {
  console.log(req.params)
  Product.model.findById(req.params.id,(err, items) => {
    if (err) {
      return res.send('database error', err);
    } else {
      console.log({products: items});
      return res.send(items);
    }
  });
};
