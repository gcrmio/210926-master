'use strict';
// Module Dependencies
// -------------------
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
var routes      = require('./routes');
var activity    = require('./routes/activity');
//var de          = require('./routes/de');
var mcapi       = require('./routes/mcapi');
var url         = require('url');
// added 2021-10-15 for file upload from local pc
var formidable = require('formidable');

require('request').debug = true;

var app = express();

// Configure Express
app.set('port', process.env.PORT || 3000);

//app.use(bodyParser.raw({type: 'application/jwt'}));
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.methodOverride());
//app.use(express.favicon());

app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

app.use((req, res, next) => {
  console.log('INFLOW START ------------------------------------------------------------------------------');
  console.log("HEADER : "+JSON.stringify(req.headers));
  console.log("URL    : "+req.url);
  console.log("BODY   : "+JSON.stringify(req.body));
  console.log("path   : "+req.ip);

  console.log('INFLOW END ------------------------------------------------------------------------------');
  //console.log('PORT: '+req.PORT);
  next();
 });

 

 // HubExchange Routes
app.get('/', routes.index );
app.post('/login', routes.login );
app.post('/logout', routes.logout );

// Custom Hello World Activity Routes
app.post('/journeybuilder/save/', activity.save );
app.post('/journeybuilder/validate/', activity.validate );
app.post('/journeybuilder/publish/', activity.publish );
app.post('/journeybuilder/execute/', activity.execute );

//app.route('/*').get(function(req, res) { 
//    return res.sendFile(path.join(__dirname, 'public/index.html')); 
//});

// added 2021-10-15 for file upload from local pc
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.post('/', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function(name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });
    form.on('file', function(name, file){
        console.log('Uploaded ' + file.name);
    });
    res.sendFile(__dirname + '/index.html');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));

  app.use((req, res, next) => {
    var pathname=url.parse(req.url).pathname;
    console.log('Pathname: '+pathname);
  
    switch(pathname){
        case '/routes/activity.js':
            res.end('activity');
        break;
        case '/public/js/customActivity.js':
            res.end('customActivity');
        break;
        case '/journeybuilder/save/':
            res.end('/journeybuilder/save/');
        break;
//        case '/de/addDE/':
//            de.addDE(req,res);
//            res.end('/de/addDE/');
//            break;
        case '/routes/mcapi/':
            console.log('mcapi is called ');
            mcapi.checkapi(req,res);
            res.end('/routes/mcapi/');
            break;
        default:
            res.end('default');
        break;
    }
    
      next();
   });
});



/*
const { Pool, Client } = require('pg');

const pool = new Pool({
    host: 'ec2-52-203-74-38.compute-1.amazonaws.com',
    user: 'wgjgqytdjizusr',
    password: 'ff8d9ae7ac3c1a64f3a1a2654cf134a708d57c79400b7c420f9dfa39ff24f6c8',  
    database: 'd841858886d6en',
    port: 5432,
    ssl: { rejectUnauthorized: false },
});

*/

/*
pool.query('INSERT INTO mms_list VALUES( $1, $2, $3)', ['10','999','MMM'], (err, res) => {
    console.log(res); // Hello World!
    pool.end();
  });
*/

/*
var server=http.createServer(function(req,res){
    var pathname=url.parse(req.url).pathname;
    switch(pathname){
        case '/routes/activity.js':
            res.end('activity');
        break;
        case '/public/js/customActivity.js':
            res.end('customActivity');
        break;
        default:
            res.end('default');
        break;
    }

}).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/
