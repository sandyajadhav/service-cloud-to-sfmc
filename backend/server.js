'use strict';

const Path = require('path');
const Pkg = require(Path.join(__dirname, '..', 'package.json'));
const express = require('express');

const axios = require('axios');


var mung = require('express-mung');

var util = require('util');

const app = express();

var router = express.Router();
var count = 0;

var Request = require("request");

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
    count += 1;
    console.log('Execute method is called!');
    console.log('Start sleeping');
    console.log('10 seconds later');


    if (count % 2 == 0) {
        console.log('Execute method: Success1');

         res.status(200).json({branchResult: 'Success'});

    } else {
        console.log('Execute method: Failure1');
         res.status(200).json({branchResult: 'Failure'});
    }

    console.log("Body: "+res.body);

});


app.post('/journeybuilder/p13n/execute', async function(req, res) {

    await Request.post({
                     "headers": {"content-type": "application/jwt"},
                     "url": "https://sfmc-customactivity-l2.ancestry.com/journeybuilder/p13n/execute",
                     "body": req.body
                 }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        res = response;
        console.dir(JSON.parse(res.body));
    })
    console.log("Final Response"+res.body);
    res.send();

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

