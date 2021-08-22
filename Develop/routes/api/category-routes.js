const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    include: Product,
  })
    .then((ctData) => res.json(ctData))
    .catch((err) => {
      res.status(500).json(err);
    });
  // be sure to include its associated Products
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    include: Product,
    where: { id: req.params.id },
  }).then(
    ((ctData) => res.json(ctData)).catch((err) => {
      res.status(500).json(err);
    })
  );
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((ctData) => res.json(ctData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(
    { category_name: req.body.category_name },
    { where: { id: req.params.id } }
  )
    .then((ctData) => {
      if (!ctData) {
        res.status(500).json({ message: "No category found" });
        return;
      }
      res.json(ctData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then((ctData) => {
    if (!ctData) {
      res.status(500).json({ message: "No category found" });
      return;
    }
    res.json(ctData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500);

  });
});

module.exports = router;
