const keystone = require('keystone');
const Product = keystone.list('Product');


exports.listIndv = (req, res) => {
  Product.model
  .findById(req.params.id)
  .populate("sizes")
  .exec((err, items) => {
    if(err){
      return res.send(err)
    }else{
      console.log(items)
      return res.send(items)
    }
  })
};
