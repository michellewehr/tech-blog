const { Post, User, Comment } = require('../models');

const router = require('express').Router();


//login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
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
    include: [
        {
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            // include: {
            //     model: User,
            //     attributes: 'username'
            //         }
        }
    ]
})
  .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', {
          posts,
          loggedIn: req.session.loggedIn
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
    include: [
      {
          model: User,
          attributes: ['username']
      },
      {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          // include: {
          //   model: User,
          //   attributes: 'username',
          //   as: 'user'
          // }
      }
  ]
    })
      .then(dbPostData => {
        //   console.log(dbPostData);
          const post = dbPostData.get({ plain: true });
          console.log(post);
  
          res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    })
    


module.exports = router;