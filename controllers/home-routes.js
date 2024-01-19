const router = require("express").Router();
const { Dashboard, Blog, Post, Comment, User } = require("../models");

// get all blog posts for homepage
router.get("/", async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll();

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
    res.render("homepage", {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog post
router.get("/blog/:id", async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          attributes: ["id", "author", "contents"],
        },
        {
          model: Comment,
          attributes: ["id", "content", "posted_date"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const blog = dbBlogData.get({ plain: true });
    res.render("blog", { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// add comment
router.post("/blog/:id/comment", async (req, res) => {
  try {
    const { commentContent } = req.body;
    const blogId = req.params.id;
    const userId = req.session.user_id;

    console.log("User ID:", userId);
    console.log("Blog ID:", blogId);
    console.log("Comment Content:", commentContent);
    console.log("Session Data:", req.session);

    // Check if comment content is empty
    if (!commentContent) {
      return res.status(400).json({ error: "Comment content cannot be empty" });
    }

    // Retrieve the signed-in user's username from the session
    const signedInUser = await User.findByPk(userId);
    // Check the result of the query
    console.log("User found in database:", signedInUser);
    const username = signedInUser.username;

    // Get the current date and time
    const currentDate = new Date();

    // Create a new comment
    const newComment = await Comment.create({
      content: commentContent,
      username: username,
      posted_date: currentDate,
      blog_id: blogId,
      user_id: userId,
    });

    console.log("New Comment:", newComment);

    // Redirect back to the blog page
    res.redirect(`/blog/${blogId}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Dashboard data.. users blog posts
router.get("/dashboard", async (req, res) => {
  try {
    const dashboardData = await Dashboard.findAll();

    const dashboard = dashboardData.map((dashboard) =>
      dashboard.get({ plain: true })
    );
    res.render("dashboard", { dashboard, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
