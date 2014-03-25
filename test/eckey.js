/* global describe, it */
var assert = require('assert');

var ECKey = require('../src/eckey.js').ECKey;
var ECPubKey = require('../src/eckey.js').ECPubKey;

var convert = require('../src/convert.js');
var bytesToHex = convert.bytesToHex;
var hexToBytes = convert.hexToBytes;
var Address = require('../src/address');
var Network = require('../src/network')
var testnet = Network.testnet.addressVersion

describe('ECKey', function() {
    describe('constructor', function() {
        it('parses hex', function() {
            var priv = 'ACDA49E9CEB45F3071A9BB2A15C17E6DBA0E699D3F26805833653123F279CDEE';
            var pub = '04a844973f1354a6b6d87673d1d27dc89c063fb18142d0cce0633b194a5309b61de5dc846cf5ed3499f1f30bdbc6404ea0341dd8b6205e29dc52a7062e30b8138c';
            var key = new ECKey(priv);

            assert.equal(key.getPub().toHex(), pub);
            assert.equal(key.compressed, false);
        })

        it('parses base64', function() {
            var priv = 'rNpJ6c60XzBxqbsqFcF+bboOaZ0/JoBYM2UxI/J5ze4=';
            var pub = '04a844973f1354a6b6d87673d1d27dc89c063fb18142d0cce0633b194a5309b61de5dc846cf5ed3499f1f30bdbc6404ea0341dd8b6205e29dc52a7062e30b8138c';
            var key = new ECKey(priv);

            assert.equal(key.getPub().toHex(), pub);
            assert.equal(key.compressed, false);
        })

        it('parses WIF', function() {
            var priv = '7rrzH84Q95jhDYbMy4izL8tsaRi5hgeGaT27A5gUSHi3g2DryVU';
            var pub = '04a844973f1354a6b6d87673d1d27dc89c063fb18142d0cce0633b194a5309b61de5dc846cf5ed3499f1f30bdbc6404ea0341dd8b6205e29dc52a7062e30b8138c';
            var addr = 'XtdV8c8G1VFhXbrswGCi8NRUWkSkaGv2Mh';
            var key = new ECKey(priv);

            assert.equal(key.compressed, false);
            assert.equal(key.getPub().toHex(), pub);
            assert.equal(key.getAddress().toString(), addr);
        })

        it('parses compressed WIF', function() {
            var priv = 'XH5dpAA18fuSWNSfYTSL3TqxEY4KkZyVkdqtB5fE6ckAo1xDr6qE';
            var pub = '02a844973f1354a6b6d87673d1d27dc89c063fb18142d0cce0633b194a5309b61d'
            var addr = 'XeZibEUhDr1tgVhktA5iS15E61Z97CP7z8';
            var key = new ECKey(priv);

            assert.equal(key.compressed, true);
            assert.equal(key.getPub().toHex(), pub);
            assert.equal(key.getAddress().toString(), addr);
        })

        it('alternative constructor syntax', function() {
            var priv = 'ca48ec9783cf3ad0dfeff1fc254395a2e403cbbc666477b61b45e31d3b8ab458';
            var pub = '044b12d9d7c77db68388b6ff7c89046174c871546436806bcd80d07c28ea81199' +
                      '283fbec990dad6fb98f93f712d50cb874dd717de6a184158d63886dda3090f566';
            var key = ECKey(priv, false);

            assert.equal(key.getPub().toHex(), pub);
            assert.equal(key.compressed, false);
            assert.equal(key.toHex(), priv);
        })
    })

    describe('toAddress', function() {
        var privkeys = [
            'ca48ec9783cf3ad0dfeff1fc254395a2e403cbbc666477b61b45e31d3b8ab458',
            '1111111111111111111111111111111111111111111111111111111111111111',
            '18e14a7b6a307f426a94f8114701e7c8e774e7f9a47e2c2035db29a206321725'
        ];

        // compressed pubkeys
        var cpubkeys = [
            '024b12d9d7c77db68388b6ff7c89046174c871546436806bcd80d07c28ea811992',
            '034f355bdcb7cc0af728ef3cceb9615d90684bb5b2ca5f859ab0f0b704075871aa',
            '0250863ad64a87ae8a2fe83c1af1a8403cb53f53e486d8511dad8a04887e5b2352'
        ];

        var pubkeys = cpubkeys.map(function(x) {
            return ECPubKey(x).toHex(false)
        });

        it('mainnet', function() {
            var addresses = [
                'Xj8Xc48d2g2XPgYUPogPk58xWwW79vMPAH',
                'XwZ8Lgf5keaCCpvoz9MJL4ZDuUF1msarf7',
                'XanKmaz3PS6CCMFyh4o9BLM5bWyowyrnGR'
            ];
            var compressedAddresses = [
                'XjquhyyPzHhMkpxdDmxuVTPLiYmHKyku2n',
                'Xyhf4LaHDwSwzND5HEv72qoqrsg625rCMt',
                'Xy3pSqGgGHfS6suRbUFk2mYaBD8oTYApAZ',
            ];

            for (var i = 0; i < addresses.length; ++i) {
                var priv = new ECKey(privkeys[i], false);
                var pub = new ECPubKey(pubkeys[i], false);
                var cpub = new ECPubKey(cpubkeys[i], true);

                var addr = addresses[i];
                var caddr = compressedAddresses[i];

                assert.equal(priv.getAddress().toString(), addr);
                assert.equal(pub.getAddress().toString(), addr);
                assert.equal(cpub.getAddress().toString(), caddr);
            }
        })

/*        it('testnet', function() {
            var addresses = [
                '19SgmoUj4xowEjwtXvNAtYTAgbvR9iBCui',
                '1MsHWS1BnwMc3tLE8G35UXsS58fKipzB7a',
                '16UwLL9Risc3QfPqBUvKofHmBQ7wMtjvM'
            ];
            var compressedAddresses = [
                '1AA4sjKW2aUmbtN3MtegdvhYtDBbDEke1q',
                '1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9',
                '1PMycacnJaSqwwJqjawXBErnLsZ7RkXUAs',
            ];

            for (var i = 0; i < addresses.length; ++i) {
                var priv = new ECKey(privkeys[i], false);
                var pub = new ECPubKey(pubkeys[i], false);
                var cpub = new ECPubKey(cpubkeys[i], true);

                var addr = addresses[i];
                var caddr = compressedAddresses[i];

                assert.equal(priv.getAddress().toString(), addr);
                assert.equal(pub.getAddress().toString(), addr);
                assert.equal(cpub.getAddress().toString(), caddr);
            }
        })*/
    });

    describe('signing', function() {
      var hpriv = 'ca48ec9783cf3ad0dfeff1fc254395a2e403cbbc666477b61b45e31d3b8ab458'
      var hcpub = '024b12d9d7c77db68388b6ff7c89046174c871546436806bcd80d07c28ea811992'
      var message = 'Vires in numeris'

      it('should verify against the private key', function() {
        var priv = new ECKey(hpriv)
        var signature = priv.sign(message)

        assert(priv.verify(message, signature))
      })

      it('should verify against the public key', function() {
        var priv = new ECKey(hpriv)
        var pub = new ECPubKey(hcpub, true)
        var signature = priv.sign(message)

        assert(pub.verify(message, signature))
      })

      it('should not verify against the wrong private key', function() {
        var priv1 = new ECKey(hpriv)
        var priv2 = new ECKey('1111111111111111111111111111111111111111111111111111111111111111')

        var signature = priv1.sign(message)

        assert(!priv2.verify(message, signature))
      })
    })

    describe('output of ECPubKey', function() {
      var hcpub = '024b12d9d7c77db68388b6ff7c89046174c871546436806bcd80d07c28ea811992'
      var hpub = '044b12d9d7c77db68388b6ff7c89046174c871546436806bcd80d07c28ea81199283fbec990dad6fb98f93f712d50cb874dd717de6a184158d63886dda3090f566'

      it('using toHex should support compression', function() {
        var pub = new ECPubKey(hpub)

        assert.equal(pub.toHex(true), hcpub)
        assert.equal(pub.toHex(false), hpub)
      })

      it('using toBytes should support compression', function() {
        var pub = new ECPubKey(hpub)

        assert.equal(bytesToHex(pub.toBytes(true)), hcpub)
        assert.equal(bytesToHex(pub.toBytes(false)), hpub)
      })
    })
})
