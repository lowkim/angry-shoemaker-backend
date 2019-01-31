const keystone = require('keystone');
const User = new keystone.List('User');

User.add({
        displayName:{type:String},
        password:{type:keystone.Field.Types.Password},
        email:{type:keystone.Field.Types.Email, unique:true},
});

User.schema.virtual('canAccessKeystone').get(()=>{
        return true;
});


User.register();


