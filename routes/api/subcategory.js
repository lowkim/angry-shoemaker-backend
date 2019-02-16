const keystone = require('keystone');
const SubCategory = keystone.list('SubCategory');
const Product = keystone.list("Product")

exports.list = (req, res) =>{
    SubCategory.model.findOne({name:req.params.subcategories},(err, subcat) => {
        if(err){
            return res.send(err);
        }else{
            Product.model.find({subCategory:subcat._id}, (err, prods)=>{
                prods.forEach(x => {
                    x["_doc"].subCategory = subcat.name;
                })
                if(err){
                    return res.send(err)
                }else{
                    return res.send(prods);
                }
            })
        }
    })
}



