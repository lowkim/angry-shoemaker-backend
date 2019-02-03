const keystone = require('keystone');
const Product = keystone.list('Product');


exports.listIndv = (req, res) => {

  // Product.model.findOne().populate('sizes').exec(function(err, meme) {
  //   // the author is a fully populated User document
  //   // console.log(meme.sizes)
  //   return res.send(meme)
  // });
  // Product.model.findById(req.params.id,(err, items) => {
  //   if (err) {
  //     return res.send('database error', err);
  //   } else {
  //     console.log(items)
  //     return res.send(items);
  //   }
  // });

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
