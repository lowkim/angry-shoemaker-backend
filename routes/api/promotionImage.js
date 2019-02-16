const keystone = require('keystone');
const PromotionImage = keystone.list('PromotionImage');
const Category = keystone.list("Category");


exports.list = (req, res) => {
    PromotionImage.model
    .find()
    .populate({
        path:'subCategory',
        populate:{path:"category"}
    })
    .exec((err, items)=>{
        if(err){
            return res.send('database error', err);
        }else{
            return res.send(items);
        }
    });
}