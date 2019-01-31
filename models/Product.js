const keystone = require('keystone');
const Product = new keystone.List('Product', {
  map: {name: 'title'},
  autokey: {path: 'slug', from: 'title', unique: true},
});
const Types = keystone.Field.Types;

Product.add({
  title: {type: String, required: true, initial: true},
  price: {type: Number},
  quantity: {type: Number},
  description: {type: Types.Html, wysiwyg: true, height: 300},
  image: {type: Types.CloudinaryImage},
  addon: {type:Types.Select, options:'first, second, third'},
  subCategory: {type: Types.Relationship, ref: 'SubCategory'},
  txtArray:{type:Types.TextArray}
});

Product.defaultColumns = 'title, image, addon';
Product.register();
