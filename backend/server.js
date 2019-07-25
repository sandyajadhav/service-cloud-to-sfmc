'use strict';

const Path = require('path');
const Pkg = require(Path.join(__dirname, '..', 'package.json'));
const express = require('express');

const app = express();

var count = 0;

app.use(require('body-parser').raw({
	type: 'application/jwt'
}));

app.post('/activity/seg/execute', async function(req, res){
    count += 1;
    console.log('Execute method is called!');
    console.log('Start sleeping');
    await  work();
    console.log('10 seconds later');


    if (count % 2 == 0) {
        console.log('Execute method: Success1');

        return res.status(200).json({branchResult: 'Success'});
    } else {
        console.log('Execute method: Failure1');
        return res.status(200).json({branchResult: 'Failure'});
    }
});


app.post('/activity/p13n/execute', async function(req, res){
    console.log('P13n api is called');

    return res.status(200).json({branchResult: 'Success'});
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function work() {

    console.log('Start sleeping');
    await sleep(1000);
    console.log('Five seconds later');
}

app.post(/\/activity\/(save|publish|validate)/, (req, res) => {
    console.log('Save2, publish and validate is called!');
    return res.status(200).json({success: true});
});

app.use(express.static(Path.join(__dirname, '..', 'public')));

app.listen(process.env.PORT || 12345, () => {
	console.log('customsplit backend is now running!');
});

