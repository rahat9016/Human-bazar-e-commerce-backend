const Category = require("../models/category");
const slugify = require("slugify");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == parentId);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}

//Create category
exports.addCategory = async (req, res) => {
  categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.file) {
    categoryUrl = process.env.API + "/public/" + req.file.filename;
    categoryObj.categoryImage = categoryUrl;
  }
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const cat = await new Category(categoryObj);
  cat.save((error, category) => {
    if (error) {
      if (error.keyPattern.slug > 0) {
        res.status(400).json({ message: "Category already created!" });
      }
    }
    if (category) {
      res.status(201).json({ category });
    }
  });
};

//Get category
exports.getCategories = async (req, res) => {
  await Category.find({}).exec((error, categories) => {
    if (error) {
      res.status(400).json({ error });
    }
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
};
