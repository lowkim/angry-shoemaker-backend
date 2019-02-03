const stripe = require("stripe")(process.env.STRIPE_SECRET);
const keystone = require('keystone');
const Order = keystone.list('Order');

exports.charge = (req, res) => {
  // Create the charge object with data from the Vue.js client
  var newCharge = {
    amount: req.body.total*100,
    currency: "sgd",
    source: req.body.token_from_stripe, // obtained with Stripe.js on the client side
    description: req.body.specialNote,
    receipt_email: req.body.email,
    shipping: {
      name: req.body.name,
      phone:req.body.phone,
      address: {
        line1: req.body.address.street,
        line2:req.body.address.unitNum,
        postal_code: req.body.address.postalCode,
        country: "Singapore"
      }
    }
  };

  let orderItems = "";
  req.body.cartInfo.forEach(x => {
    orderItems += `${x.title} ${x.qty}\n`
  })
  
  let newOrderInfo = {
    name:req.body.name,
    total_amount:req.body.total,
    order_item:orderItems,
    email:req.body.email,
    phoneNumber:req.body.phone,
    Address:req.body.address.street,
    postalCode:req.body.address.postalCode,
    unitNumber:req.body.address.unitNum,
    order_date:req.body.orderDate

  }
  const newOrder = new Order.model(newOrderInfo);
  Order.updateItem(newOrder, {ignoreNoEdit:true},(error)=>{
    res.locals.enquirySubmitted = true;
    if (error) res.locals.saveError = true;

    console.log(error)
  })

  // Call the stripe objects helper functions to trigger a new charge
  stripe.charges.create(newCharge, function(err, charge) {
    // send response
    if (err) {
      console.error(err);
      res.json({ error: err, charge: false });
    } else {
      // send response with charge data
      res.json({ error: false, charge: charge });
    }
  });
};

exports.getChargeById = function(req, res) {
  stripe.charges.retrieve(req.params.id, function(err, charge) {
    if (err) {
      res.json({ error: err, charge: false });
    } else {
      res.json({ error: false, charge: charge });
    }
  });
};
