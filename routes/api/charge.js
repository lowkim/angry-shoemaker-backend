const stripe = require("stripe")(process.env.STRIPE_SECRET);
const keystone = require("keystone");
const Order = keystone.list("Order");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  process.env.SENDGRIDKEY
);

exports.charge = (req, res) => {
  let orderItems = "Item    Quantity\n";
  req.body.cartInfo.forEach(x => {
    orderItems += `${x.title}   x(${x.qty})\n`;
  });

  // Create the charge object with data from the Vue.js client
  var newCharge = {
    amount: req.body.total * 100,
    currency: "sgd",
    source: req.body.token_from_stripe, // obtained with Stripe.js on the client side
    description: req.body.specialNote,
    receipt_email: req.body.email,
    shipping: {
      name: req.body.name,
      phone: req.body.phone,
      address: {
        line1: req.body.address.street,
        line2: req.body.address.unitNum,
        postal_code: req.body.address.postalCode,
        country: "Singapore"
      }
    },
    metadata: {
      time: req.body.orderTime,
      order_Items: orderItems,
      orderDate:req.body.orderDate,
    }
  };

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
  stripe.charges.retrieve(req.params.id, async (err, charge) => {
    try {
      const theCharge = await charge;
      if (err) {
        res.json({ error: err, theCharge: false });
      } else {
        let newOrderInfo = {
          order_id: theCharge.created,
          name: theCharge.shipping.name,
          total_amount: theCharge.amount / 100, 
          order_item: theCharge.metadata.order_Items,
          email: theCharge.receipt_email,
          phoneNumber: theCharge.shipping.phone,
          Address: theCharge.shipping.address.line1,
          postalCode:theCharge.shipping.address.postal_code,
          unitNumber: theCharge.shipping.address.line2,
          order_date: theCharge.metadata.orderDate,
          order_time: theCharge.metadata.time,
          order_status:"processing"
        };
        const newOrder = new Order.model(newOrderInfo);
        Order.updateItem(newOrder, { ignoreNoEdit: true }, error => {
          res.locals.enquirySubmitted = true;
          if (error) {
            res.locals.saveError = true;
            console.log(error);
          }
        });

        const msg = {
          personalizations: [
            {
              to: [
                {
                  email: `${theCharge.receipt_email}`
                },
                {
                  email: "shunyuan693@gmail.com"
                }
              ],
              dynamic_template_data: {
                name: `${theCharge.shipping.name}`,
                time: `${theCharge.metadata.time}`,
                item: `${theCharge.metadata["order_Items"]}`,
                block: `${theCharge.shipping.address.line1}`,
                unitNum: `${theCharge.shipping.address.line2}`,
                phone: `${theCharge.shipping.phone}`,
                subject: `Order Number: ${theCharge.created}`
              }
            }
          ],
          from: "shunyuan693@gmail.com",
          template_id: "d-d4b2e5a99fc44104860214bf7c302b7b"
        };
        sgMail.send(msg).catch(err => console.error(err.response.body.errors));
        res.json({ error: false, charge: theCharge });
      }
    } 
    catch(error) {
      console.log(error);
    }
  });
};
