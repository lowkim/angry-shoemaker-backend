const keystone = require('keystone');
const SubCategory = new keystone.List('SubCategory');

const Types = keystone.Field.Types;

SubCategory.add({
    name:{type:String, required:true},
    category:{type:Types.Relationship, ref:'Category'}
})


SubCategory.register();