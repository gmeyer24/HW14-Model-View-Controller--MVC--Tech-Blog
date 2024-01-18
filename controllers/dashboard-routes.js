const router = require("express").Router();
const { Dashboard, Blog, Post, Comment, User } = require("../models");
const withAuth = require('../utils/auth');

//  route to display posts by the logged-in user
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Check if the user is logged in
      if (!req.session.loggedIn) {
        // Redirect to login page if not logged in
        return res.redirect('/login');
      }
  
      // Get the logged-in user's ID from the session
      const userId = req.session.userId;
  
      // Fetch all posts by the logged-in user
      const userPosts = await Dashboard.findAll({
        where: {
          UserId: userId,
        },
        // You can include other options like order, attributes, etc.
      });
  
      res.render('dashboard', { userPosts, loggedIn: true });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

module.exports = router;