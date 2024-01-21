const router = require("express").Router();
const { Post } = require("../../models");

// Create New Blog Post
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log(newPost);

    res.json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// edit blog post
router.put("/:id", async (req, res) => {
  try {
    const editPost = await Post.update(req.body, {
      where: {
        id: req.params.id
      }
  });

    console.log(editPost);

    res.json(editPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete('/:id', (req, res)=>{
  
})

module.exports = router;