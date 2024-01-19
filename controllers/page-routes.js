const router = require("express").Router();
const { log } = require("console");
const { Dashboard, Post, Comment, User } = require("../models");

// get all blog posts for homepage
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll();

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    console.log("BLOGS", posts);
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog post
router.get("/post/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, 
      {
      include: [
        {
          model: Comment,
          // attributes: ["id", "content", "posted_date"],
          include: [
            {
              model: User,
              // attributes: ["username"],
            },
          ],
        },
      ],
    }
    );

    const post = dbPostData.get({ plain: true });
    console.log("LOOK", post);
    res.render("post", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// add comment
router.post("/post/:id/comment", async (req, res) => {
  try {
    const { commentContent } = req.body;
    const postId = req.params.id;
    const userId = req.session.user_id;

    console.log("User ID:", userId);
    console.log("Plog ID:", postId);
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
      post_id: postId,
      user_id: userId,
    });

    console.log("New Comment:", newComment);

    // Redirect back to the blog page
    res.redirect(`/post/${postId}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create New Blog Post
router.post("/dashboard/createpost", async (req, res) => {
  try {
    const { postContent } = req.body;
    const userId = req.session.user_id;

    console.log("User ID:", userId);
    console.log("Post Content:", postContent);
    console.log("Session Data:", req.session);

    // Check if comment content is empty
    if (!postTitle || !postContent) {
      return res.status(400).json({ error: "Post title and content cannot be empty" });
    }

    // Retrieve the signed-in user's username from the session
    const signedInUser = await User.findByPk(userId);
    // Check the result of the query
    console.log("User found in database:", signedInUser);
    const username = signedInUser.username;

    // Get the current date and time
    const currentDate = new Date();

    // Create a new comment
    const newPost = await Post.create({
      content: postContent,
      username: username,
      posted_date: currentDate,
      user_id: userId,
    });

    console.log("New Post:", newPost);

    // Redirect back to the blog page
    res.redirect(`/dashboard`);
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

// //  route to display posts by the logged-in user
// router.get('/dashboard', withAuth, async (req, res) => {
//   try {
//     // Check if the user is logged in
//     if (!req.session.loggedIn) {
//       // Redirect to login page if not logged in
//       return res.redirect('/login');
//     }

//     // Get the logged-in user's ID from the session
//     const userId = req.session.userId;

//     // Fetch all posts by the logged-in user
//     const userPosts = await Dashboard.findAll({
//       where: {
//         user_id: userId,
//       },
//     });

//     res.render('dashboard', { userPosts, loggedIn: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
