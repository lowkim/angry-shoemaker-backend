const keystone = require("keystone");
const ProductSize = new keystone.List('ProductSize',{
    map:{name:'title'},
    autokey: {path: 'slug', from: 'title', unique: true},
});
const Types = keystone.Field.Types;

ProductSize.add({
    title: {type: String, required: true, initial: true},
    price: {type: Number},
    quantity: {type: Number},
    MainProduct:{type: Types.Relationship, ref:'Product'}
})
ProductSize.defaultColumns = 'title';
ProductSize.register();