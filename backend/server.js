'use strict';

const Path = require('path');
const Pkg = require(Path.join(__dirname, '..', 'package.json'));
const express = require('express');

const app = express();

var count = 0;

app.use(require('body-parser').raw({
	type: 'application/jwt'
}));

app.post('/activity/execute', (req, res) => {
    count += 1;
    console.log('Execute method is called!');
    await sleep(10000);

    if (count % 2 == 0) {
        console.log('Execute method: Success1');

        return res.status(200).json({branchResult: 'Success'});
    } else {
        console.log('Execute method: Failure1');
        return res.status(200).json({branchResult: 'Failure'});
    }
});

async function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

app.post(/\/activity\/(save|publish|validate)/, (req, res) => {
    console.log('Save2, publish and validate is called!');
    return res.status(200).json({success: true});
});

app.use(express.static(Path.join(__dirname, '..', 'public')));

app.listen(process.env.PORT || 12345, () => {
	console.log('customsplit backend is now running!');
});

