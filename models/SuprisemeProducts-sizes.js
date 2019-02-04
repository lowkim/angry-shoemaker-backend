const keystone = require("keystone");
const SuprisemeProductSize = new keystone.List('SuprisemeProductSize',{
    map:{name:'title'},
    autokey: {path: 'slug', from: 'title', unique: true},
});
const Types = keystone.Field.Types;

SuprisemeProductSize.add({
    title: {type: String, required: true, initial: true},
    price: {type: Number},
    quantity: {type: Number},
    MainProduct:{type: Types.Relationship, ref:'SuprisemeProduct'}
})
SuprisemeProductSize.defaultColumns = 'title';
SuprisemeProductSize.register();