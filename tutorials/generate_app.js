'use strict';
console.log('module.id: ', module.id);
console.log('module.exports: ', module.exports);
console.log('module.parent: ', module.parent);
console.log('module.filename: ', module.filename);
console.log('module.loaded: ', module.loaded);
console.log('module.children: ', module.children);
console.log('module.paths: ', module.paths);
const utility  = require('utility.js');

let appAddress = null;
let keyPair    = utility.createKeyPair({dump: true});

let Mocha     = require('mocha'),
    argv      = require('yargs').argv,
    mocha     = new Mocha({ grep: argv.grep || '', timeout: 10000 }),
    casePath  = __dirname + '/cases/';

global.should  = require('chai').should();
global.expect  = require('chai').expect;
global.api     = require('supertest')(`https://dev.press.one`);
// global.api     = require('supertest')(`http://127.0.0.1:8090`);

global.fileHost = 'https://storage.googleapis.com/pressone';

global.user    = {
    email: 'test1@press.one',
    keystore: '{"address":"ee6ddad145f681fd5bd19eca003c9d204d214471","crypto":{"cipher":"aes-128-ctr","ciphertext":"c8f1317ad80d4702ea5589080d83adf3dd1b16ad830204a865f67a2b75d33c3f","cipherparams":{"iv":"3ac3a7e6c1914a3550c319861c5210ba"},"mac":"087795020c77bd306acb07597ea894b1f654178893783b619f5c8372b65a7720","kdf":"pbkdf2","kdfparams":{"c":262144,"dklen":32,"prf":"hmac-sha256","salt":"017430a85e4dd61584ed0dcdc24545a2c647b993a2b347f42fa81322185f679f"}},"id":"59e94a3d-aa8b-4050-892e-f569b7be77a3","version":3}',
    password: 'nopassword', 
    address: 'ee6ddad145f681fd5bd19eca003c9d204d214471',
    privateKey: '16cf5d9cdc66927a24bec53d56e3b7640f6c2c39d2fd733975f7eb861a61a391',
    // must use valid mixin to withdraw and both of them have limitation for withdraw every day
    validMixinIds: [
        'c39c2ecc-2109-499f-b6c4-d6f278ea29fb',
        '96cb8b89-0808-427e-a58c-a04adb8119ce',
    ],
};

global.developer = {
    email: '', // TODO: email of developer
    keystore: '', //TODO: keysotre of developer
    password: '', //TODO: password of developer
    address: 'a72447953e0eda38b3d951c9c16e1276a693ba00' //TODO: address in keystore
};


const payload = {
    name        : 'name' + new Date(), // TODO: name of app
    description : 'describe.', // TODO: describe of app
    url         : 'urlurlurl', // TODO: url of app
    logo        : 'logologologo',  // TODO: logo of app
};
global.api.post(
    '/api/apps'
).send({payload: payload}).set(
    utility.getAuthHeader('/apps', payload, developer.keystore, developer.password)
    //utility.getAuthHeader('/apps', payload, keystore,password)
    ).end((err, res) => {
    res.status.should.equal(200);
    appAddress = res.body && res.body.data && res.body.data.app && res.body.data.app.address;
    console.log("app Address is:")
    console.log(appAddress)    
});

//Press Resume:e93dcbb0a0acfe42f93104a7477428d13b1e3625
