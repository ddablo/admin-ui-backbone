
/**
 * Module dependencies.
 */

  var    express = require('express')
  , mongo_entity = require('mongo-entity')
  ,  controllers = require('./controllers')
  ,         http = require('http')
  ,        mongo = require("mongoskin")
  ,         path = require('path');

var conStr = process.env.MONGOHQ_URL || 'localhost:27017/test';
var mongoDB = mongo.db(conStr, {auto_reconnect : true, safe: true});
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3002);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon);
  app.use(express.logger('dev'));
  app.use(express.bodyParser);
  app.use(express.methodOverride);
  app.use(express.cookieParser('placer-secret-key'));
  app.use(express.session);
  app.use(mongo_entity.addLocals);
  app.use(decorator);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', controllers.main.view);

//region authentication

app.post('/register', controllers.authentication.registerUser);
app.post('/login', controllers.authentication.loginUser);
app.post('/logout', controllers.authentication.logoutUser);
//endregion

function decorator(req, res, next){
    req.mongoRef = mongoDB;
    next();
}

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
