const Category = require("../models/category");
const slug = require("slugify");

//createCategory:
const createCategory = async (req, res) => {
  const { name } = req.body;
  console.log(name);

  if (!name) {
    return res.status(400).json({ msg: "Please enter a name" });
  }

  try {
    const categoryName = await Category.create({
      name: name,
      slug: slug(name),
    });
    res.status(201).json({ msg: "Category created", categoryName });
  } catch (error) {
    res.status(500).json(error.errors.name.message);
    //get :"Length should'nt be less than 3 characters" if xters are <3
    //and :"Length should'nt be more than 10 characters" if > 10. with the code: res.status(500).json(error.errors.name.message). cuz i set them in the category model
  }
};

//getCategories:
const getCategories = async (req,res) => {
  try {
    const categories = await Category.find({});

    if (!categories) {
      return res.status(404).json({ msg: "No category found." });
    };
    res.status(200).json({categories,nbhits:categories.length})
  } catch (error) {
    res.status(500).json(error);
  }
};

//getSingleCategory:
const getSingleCategory =async (req,res)=>{
    const slug = req.params.slug;

    try{
       const categorySlug = await Category.findOne({slug});
       if(!categorySlug){
        return res.status(404).json({msg:"Slug does 'nt exist"})
       };
       res.status(200).json(categorySlug)
    }catch(error){
        res.status(500).json(error)
    }
}

//deleteCategory:
const deleteCategory =async (req,res) => {
    const slug = req.params.slug

    try{
        const deleteSlug = await Category.findOneAndDelete({slug});
        if(!deleteSlug){
            return res.status(404).json({msg:"Slug does 'nt exist"}) 
        };
        res.status(200).json({msg:`${slug} category deleted`})
    }catch(error){
        res.status(500).json(error.message)
    }
};

module.exports = { createCategory, getCategories, getSingleCategory, deleteCategory };
