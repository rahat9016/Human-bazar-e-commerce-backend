const Product = require("../models/product");
const slugify = require("slugify");
const Category = require("../models/category");
exports.addProduct = async (req, res) => {
  const { name, price, description, categoryId, createdBy, quantity } =
    req.body;
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
    category: categoryId,
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
exports.getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  await Category.findOne({ slug: slug })
    .select("_id")
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (products.length > 0) {
            res.status(200).json({
              products,
              productsByPrice: {
                under5K: products.filter((product) => product.price <= 5000),
                under10K: products.filter(
                  (product) => product.price > 5000 && product.price <= 10000
                ),
                under15K: products.filter(
                  (product) => product.price > 10000 && product.price <= 15000
                ),
                under20K: products.filter(
                  (product) => product.price > 15000 && product.price <= 20000
                ),
                under25K: products.filter(
                  (product) => product.price > 20000 && product.price <= 25000
                ),
                under30K: products.filter(
                  (product) => product.price > 25000 && product.price <= 30000
                ),
              },
            });
          }
        });
      }
    });
};
exports.getProductDetailsById = async (req, res) => {
  const { productId } = req.params;
  try {
    if (productId) {
      await Product.findOne({ _id: productId }).exec((error, product) => {
        if (error) {
          return res.status(400).json({ error });
        } else if (product) {
          res.status(200).json({ product });
        }
      });
    } else {
      res.status(400).json({ error: "Params required" });
    }
  } catch (error) {
    res.status(400).json({ error: "Something went wrong!" });
  }
};
