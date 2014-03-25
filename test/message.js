/* global describe, it */
var assert = require('assert');
var Message = require('../src/message.js');
var ECKey = require('../src/eckey.js').ECKey;
var hexToBytes = require('../src/convert.js').hexToBytes;

var priv = 'ACDA49E9CEB45F3071A9BB2A15C17E6DBA0E699D3F26805833653123F279CDEE';
var addr = 'XtdV8c8G1VFhXbrswGCi8NRUWkSkaGv2Mh';
var msg = 'foobar';

describe('Message', function() {
    describe('verify', function() {
        it('passes case 1', function() {
            var key = new ECKey(hexToBytes(priv));
            assert.equal(key.getAddress().toString(), addr);

            var sig = Message.signMessage(key, msg);
            assert.ok(Message.verifyMessage(addr, sig, msg));

            // wrong message
            assert.ok(!Message.verifyMessage(addr, sig, 'not foobar'));

            // wrong address
            assert.ok(!Message.verifyMessage('XyZcx8auUmLWpvGFSjRybTtmZeagDZRaQi', sig, msg));
        })

        it('passes case 2', function() {
            var priv = '7rrzH84Q95jhDYbMy4izL8tsaRi5hgeGaT27A5gUSHi3g2DryVU';
            var key = new ECKey(hexToBytes(priv));
            var sig = Message.signMessage(key, msg);
            assert.ok(!Message.verifyMessage(addr, sig, msg));
        })

        it('handles compressed keys', function() {
            var key = new ECKey(hexToBytes(priv));
            key.compressed = true

            var addr = key.getAddress().toString()

            var sig = Message.signMessage(key, msg);
            assert.ok(Message.verifyMessage(addr, sig, msg));

            // wrong message
            assert.ok(!Message.verifyMessage(addr, sig, 'not foobar'));

            // wrong address
            assert.ok(!Message.verifyMessage('XyZcx8auUmLWpvGFSjRybTtmZeagDZRaQi', sig, msg));
        })
    })
})
