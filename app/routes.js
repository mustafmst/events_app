module.exports = function(app, passport){

  //Index page
  app.get('/', function(req,res){
    res.render('../views/pages/index.ejs', {
      message: req.flash('homeMessage'),
      user: req.user
    });
  });

  //signup
  app.get('/signup', function(req,res){
    res.render('../views/pages/signup.ejs', {message: req.flash('signupMessage')});
  });

  app.post('/signup', passport.authenticate('signup',{
    successRedirect: '/',
    successFlash: true,
    failureRedirect: '/signup',
    failureFlash: true,
  }));

  //Login
  app.get('/login', function(req, res){
    res.render('../views/pages/login.ejs', {message: req.flash('loginMessage')});
  });

  app.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    successFlash: true,
    failureRedirect: '/login',
    failureFlash: true
  }));
};
