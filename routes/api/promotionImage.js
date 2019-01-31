const keystone = require('keystone');
const PromotionImage = keystone.list('PromotionImage');

exports.list = (req, res) => {
    PromotionImage.model.find((err, items)=>{
        if(err){
            return res.send('database error', err);
        }else{
            return res.send(items);
        }
    });
}