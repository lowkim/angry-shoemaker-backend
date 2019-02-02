const keystone = require("keystone")
const DisabledDate = keystone.list('DisabledDate');

exports.list = (req, res) => {
    DisabledDate.model.find((err, Dates) => {
        if(err){
            return res.send("Database error", err)
        }else{
            let DateAndTime = []
            let DateWithout;
            Dates.map(dateArr => {
                dateArr["_doc"]["Dates-to-disable"].forEach(dates => {
                    return DateAndTime.push(dates)
                })
            })

            DateWithout = DateAndTime.map(x => {
                return `new Date(${x.getFullYear()},${x.getMonth()},${x.getDate()})`
            })
            
            return res.send(DateWithout);
        }
    })
}