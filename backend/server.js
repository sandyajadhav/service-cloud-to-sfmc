'use strict';

const Path = require('path');
const Pkg = require(Path.join(__dirname, '..', 'package.json'));
const express = require('express');

const axios = require('axios');


var mung = require('express-mung');

var util = require('util');

const app = express();
var qs = require('querystring');

var router = express.Router();
var count = 0;

var Request = require("request");

var bodyParser = require('body-parser')//add this

app.post(bodyParser())//add this before any route or before using req.body

var http = require('http-debug').http;
http.debug = 2;
app.use(mung.json(
    function transform(body, req, res) {
        console.log('info', {Message:'API REQUEST RESPONSE LOG',  responseBody:JSON.stringify(body)});
        return body;
    }
));

app.use(require('body-parser').raw({
	type: 'application/jwt'
}));

app.post('/journeybuilder/seg/execute', async function(req, res){
    console.log('Request Token from SFMC : ' + req.body.toString());
    console.log("Headers: "+JSON.stringify(req.headers));
    count += 1;
    if (count % 2 == 0) {
        console.log('Execute method: Success1');

         res.status(200).json({branchResult: 'Success'});

    } else {
        console.log('Execute method: Failure1');
         res.status(200).json({branchResult: 'Failure'});
    }
});


app.post('/journeybuilder/p13n/execute', async function(req, res) {
    console.log('Request Token from SFMC : ' + req.body.toString());
    console.log("Headers: "+JSON.stringify(req.headers));
    count= 1;
    let url = "https://sfmc-customactivity-l2.ancestry.com/journeybuilder/p13n/execute";
    if (count % 2  ==1){
        console.log("redirected url")
        res.redirect(307,url);
        console.log("Redirected: Response code "+res.statusCode);
        console.log("Redirected: Response "+res.body);

    }else {
        console.log("Forwarded url")

        await Request.post({
                               "url": "https://sfmc-customactivity-l2.ancestry.com/journeybuilder/p13n/execute",
                               "body": req.body.toString()
                           }, (error, response, body) => {
            if (error) {
                return console.log(error);
            }
            //res = response;
            console.log(response.body);
            console.log("Status: " + response.statusCode);
            console.log("Headers: " + response.headers);

             res.status(307).json(response.body);

            //res.status(response.statusCode).json(response.body);
        });
    }
});


/*    count= count +1;
    logData(req);
    console.log('p13n api is called');


    res.on('finish', function () {
        console.log("Body: "+res.body);
    });

    let url = "https://sfmc-customactivity-l2.ancestry.com/journeybuilder/p13n/execute";
    if (count % 2  ==0){
        // res.redirect(307,url);

/!*
      let resspone = await  axios({
                 method: 'post',
                 url: url,
                 data: req.body,
                 config: { headers: {'Content-Type': 'application/jwt' }}
             })
            .then(function (response) {
                //handle success
                console.log(response);
                return response;

            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });*!/



    }else
{

    let resspone = await  axios({
                                    method: 'get',
                                    url: "wwww.google.com",
                                    data: "",
                                    config: { headers: {'Content-Type': 'application/json' }}
                                })
        .then(function (response) {
            //handle success
            console.log(response);
            return response;
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });*/

/*});*/


function logData(req) {
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


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function work() {

    console.log('Start sleeping');
    await sleep(20000);
    console.log('Five seconds later');
}

app.post(/\/journeybuilder\/(save|publish|validate)/, (req, res) => {
    console.log('Save2, publish and validate is called!');
    return res.status(200).json({success: true});
});

app.use(express.static(Path.join(__dirname, '..', 'public')));

app.listen(process.env.PORT || 12345, () => {
    console.log('customsplit backend is now running!');

});


