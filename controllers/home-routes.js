const { Post, User } = require('../models');

const router = require('express').Router();

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_body',
            'created_at', 
            'user_id'
        ],
        include: {
            model: User,
            attributes: ['username']
        }
    })
  .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
    console.log(posts);
      res.render('homepage', {
          posts
      })
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })
});

module.exports = router;