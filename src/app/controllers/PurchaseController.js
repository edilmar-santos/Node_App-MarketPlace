const Ad = require("../models/Ad");
const User = require("../models/User");
const Purchase = require("../models/Purchase");
const Queue = require("../services/Queue");
const PurchaseMail = require("../jobs/PurchaseMail");

class PurchaseController {
  async index(req, res) {
    const purchases = await Purchase.find({});
    return res.json(purchases);
  }

  async store(req, res) {
    const { ad, content } = req.body;

    const purchaseAd = await Ad.findById(ad).populate("author");
    const user = await User.findById(req.userId);

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save();

    const purchase = await Purchase.create({ content, ad });

    return res.json(purchase);
  }
}

module.exports = new PurchaseController();
