const keystone = require('keystone');
const Category = new keystone.List('Category');

Category.add({
        name:{type:String, required:true}
});
Category.register();

