const keystone = require("keystone");
const SuprisemeProduct = keystone.list("SuprisemeProduct");

exports.listIndv = (req, res) => {
  SuprisemeProduct.model
    .find()
    .populate("sizes")
    .exec((err, items) => {
      if (err) {
        return res.send(err);
      } else {
        let lol = items.reduce((acc, cur) => {
          acc[cur["_id"]] = { _id: cur["_id"], title: cur["title"], price:cur['price'], size:cur['sizes'],image:cur['image'] };
          return acc;
        }, {});
        return res.send(lol);
      }
    });
};
