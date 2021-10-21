const { Post, User } = require('../models');

const router = require('express').Router();


//login
router.get('/login', (req, res) => {
  res.render('login');
});

//homepage - localhost:3001/
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

//once click on a post- localhost:3001/post/1
// get single post
router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
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
        //   console.log(dbPostData);
          const post = dbPostData.get({ plain: true });
          console.log(post);
  
        res.render('single-post', {
          post
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    })
    


module.exports = router;