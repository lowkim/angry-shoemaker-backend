const keystone = require('keystone');
const DisabledDate = new keystone.List('DisabledDate');
const Types = keystone.Field.Types;
DisabledDate.add({
    "name":{type:String},
    "Dates-to-disable":{type:Types.DateArray}
})

DisabledDate.register();