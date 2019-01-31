const keystone = require("keystone");
const Category = keystone.list("Category");
const SubCategory = keystone.list("SubCategory");

exports.list = (req, res) => {
  Category.model.find((err, items) => {
    if (err) {
      return res.send("database errror", err);
    } else {
      let categoryId = items.map(item => item["_doc"]["_id"]);
      let categoryName = items.map(item => item["_doc"]["name"]);
      let allCat = items.map(item=>item["_doc"]);

      SubCategory.model.find(
        { category: { $in: categoryId } },
        (err, subCat) => {
          if (err) {
            return res.send(err);
          } else {
            let allSubCat = subCat.map(x => x["_doc"]);
            let meme = allSubCat.reduce((acc, cur) => {
              allCat.forEach(x=>{
                if(cur.category.toString() == x["_id"].toString()){
                  cur.category = x.name
                  return cur.category
                }
              })
              acc[cur.category] = acc[cur.category] || [];
              acc[cur.category].push(cur);
              return acc;
            }, {});
            return res.send(meme);
          }
        }
      );
    }
  });
};
