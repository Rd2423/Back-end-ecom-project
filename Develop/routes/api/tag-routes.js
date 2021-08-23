const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  }).then(tagData => res.json(tagData)).catch(err => {console.log(err)});
  // be sure to include its associated Product data
});

router.get("/:id", (req, res) => {
  Tag.findOne({
    attributes: [
      "id", 
      "tag_name"
    ],
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    }
  ]
  }).then(data => res.json(data)).catch(err => {console.log(err)});
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(data => res.json(data)).catch(err => {console.log(err)})
});

router.put("/:id", (req, res) => {
  Tag.update(
    {
    tag_name: req.body.tag_name
  }, 
  {
    where: {
      id: req.params.id
    }
  }
  ).then(data => res.json(data)).catch(err => {console.log(err)})
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => res.json(data)).catch(err => {console.log(err)})
});

module.exports = router;
