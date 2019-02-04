const keystone = require('keystone');
const SuprisemeProduct = new keystone.List('SuprisemeProduct', {
  map: {name: 'title'},
  autokey: {path: 'slug', from: 'title', unique: true},
});
const Types = keystone.Field.Types;

SuprisemeProduct.add({
  title: {type: String, required: true, initial: true},
  price: {type: Number},
  quantity: {type: Number},
  description: {type: Types.Html, wysiwyg: true, height: 300},
  image: {type: Types.CloudinaryImage},
  sizes:{type: Types.Relationship, ref:'SuprisemeProductSize', many:true}
});

SuprisemeProduct.defaultColumns = 'title, image';
SuprisemeProduct.register();
