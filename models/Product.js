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
  subCategory: {type: Types.Relationship, ref: 'SubCategory'},
  sizes:{type: Types.Relationship, ref:'ProductSize', many:true}
});

Product.defaultColumns = 'title, image';
Product.register();
