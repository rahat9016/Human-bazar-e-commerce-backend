const Category = require("../models/category");
const slugify = require("slugify");
const shortid = require("shortid");
function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      parentId: cate.parentId,
      type: cate.type,
      slug: cate.slug,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}

//Create category
exports.addCategory = async (req, res) => {
  try {
    categoryObj = {
      name: req.body.name,
      slug: `${slugify(req.body.name)}-${shortid.generate()}`,
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
          res.status(400).json({ error: "Category already created!" });
        }
      }
      if (category) {
        res.status(201).json({ category });
      }
    });
  } catch (error) {
    console.log("Category add catch error ------>", error);
  }
};

//Get category
exports.getCategories = async (req, res) => {
  try {
    await Category.find({}).exec((error, categories) => {
      if (error) {
        res.status(400).json({ error });
      }
      if (categories) {
        const categoryList = createCategories(categories);
        res.status(200).json({ categoryList });
      }
    });
  } catch (error) {}
};
exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }
      const updateCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        {
          new: true,
        }
      );
      updatedCategories.push(updateCategory);
    }

    return res.status(201).json({ updatedCategories });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updateCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updateCategory });
  }
};
exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id });
    deletedCategories.push(deleteCategory);
  }
  if (deletedCategories.length === ids.length) {
    res.status(200).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong!" });
  }
};
