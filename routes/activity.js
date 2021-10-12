'use strict';

var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var http = require('https');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path, 
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {

    console.log("Edit");	
    
    // Data from the req and put it in an array accessible to the main app.

    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    
    console.log("Save");	
    
    // Data from the req and put it in an array accessible to the main app.

    logData(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {

    console.log("Execute");	
    console.log("==============b4Decode========================");
    console.log(req.body);
    console.log("==============b4Decode Done===================");
     JWT(req.body, process.env.jwtSecret, (err, decoded) => {

         // verification error -> unauthorized request
         if (err) {
             console.error(err);
             return res.status(401).end();
         }

         if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            
             // decoded in arguments
             var decodedArgs = decoded.inArguments[0];
             console.log("Executed: ----------------------------------------------------------------------------");
             console.log("Executed: ",decodedArgs);
             console.log("Executed: ----------------------------------------------------------------------------");
         
             //logData(req);
             res.send(200, 'Execute');
         } else {
             console.error('inArguments invalid.');
             return res.status(400).end();
         }
     });

};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {

    console.log("Publish");	
    
    // Data from the req and put it in an array accessible to the main app.

     logData(req);
     res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {

    console.log("Validate");	
    
    // Data from the req and put it in an array accessible to the main app.

    logData(req);
    res.send(200, 'Validate');
};

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


pool.query('INSERT INTO mms_list VALUES( $1, $2, $3)', ['10','999','MMM'], (err, res) => {
    console.log(res); // Hello World!
    pool.end();
  });
  */