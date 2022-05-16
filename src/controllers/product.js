const Product = require("../models/product");
const slugify = require("slugify");
exports.addProduct = async (req, res) => {
  const { name, price, description, category, createdBy, quantity } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const product = await new Product({
    name,
    slug: slugify(name),
    quantity,
    price,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });
  product.save((error, product) => {
    if (error) {
      res.status(400).json({ error });
    }
    if (product) {
      res.status(201).json({ product });
    }
  });
};
