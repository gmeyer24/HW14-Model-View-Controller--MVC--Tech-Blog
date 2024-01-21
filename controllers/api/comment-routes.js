const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Create New Comment
router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    });

    console.log(newComment);

    res.json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

// // add comment
// router.post("/comment", withAuth, async (req, res) => {
//     try {
//       const { commentContent } = req.body;
//       const postId = req.body.id;
//       const userId = req.session.user_id;
  
//       console.log("User ID:", userId);
//       console.log("Plog ID:", postId);
//       console.log("Comment Content:", commentContent);
//       console.log("Session Data:", req.session);
  
//       // Check if comment content is empty
//       if (!commentContent) {
//         return res.status(400).json({ error: "Comment content cannot be empty" });
//       }
  
//       // Retrieve the signed-in user's username from the session
//       const signedInUser = await User.findByPk(userId);
//       // Check the result of the query
//       console.log("User found in database:", signedInUser);
//       const username = signedInUser.username;
  
//       // Get the current date and time
//       const currentDate = new Date();
  
//       // Create a new comment
//       const newComment = await Comment.create({
//         content: commentContent,
//         username: username,
//         posted_date: currentDate,
//         post_id: postId,
//         user_id: userId,
//       });
  
//       console.log("New Comment:", newComment);
  
//       // Redirect back to the blog page
//       res.redirect(`/post/${postId}`);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

