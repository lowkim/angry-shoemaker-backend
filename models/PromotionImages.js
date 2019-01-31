const keystone = require('keystone');
const PromotionImages = new keystone.List('PromotionImage');
const Types = keystone.Field.Types;

PromotionImages.add({
    name:{type: String, requried:true, iniitial: true},
    image:{type:Types.CloudinaryImage},
    description:{type:Types.Html, wysiwyg:true, height: 300}
})

PromotionImages.register();