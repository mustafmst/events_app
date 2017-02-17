var eventService = require('./services/eventService');

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

  //Logout
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  //Profile
  app.get('/profile', function(req,res){
    if(req.user){
      res.render('../views/pages/profile.ejs', {user: req.user});
    }else{
      res.redirect('/');
    }
  });

  //Add Event
  app.get('/addEvent', function(req,res){
    if(req.user){
      res.render('../views/pages/addEvent.ejs', {user: req.user});
    }else{
      res.redirect('/');
    }
  });

  app.post('/addEvent', function(req,res){
    console.log(req);
    eventService.createEvent(req.user, req.body);
    res.redirect('/');
  });

  //Getting Events
  app.get('/todayEvents', function(req,res){
    eventService.getEventsForToday(res);
  });
};
