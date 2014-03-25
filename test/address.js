/* global describe, it */
var assert = require('assert')
var Address = require('../src/address.js')
var network = require('../src/network.js')
var base58 = require('../src/base58.js')
var mainnet = network.mainnet.addressVersion
var testnet = network.testnet.addressVersion

describe('Address', function() {
    var testnetAddress, mainnetAddress;
    var testnetP2shAddress, mainnetP2shAddress

    beforeEach(function(){
        testnetAddress = 'mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef'
        mainnetAddress = 'XcSoAXVkkVqJ6JkB9AghtCC1idrdyVHRQp'
        //mainnetAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
        //testnetP2shAddress = '2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7'
      //  mainnetP2shAddress = '3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt'
    })

    describe('parsing', function() {
        it('works with Address object', function() {
            var addr = new Address(new Address('XcSoAXVkkVqJ6JkB9AghtCC1idrdyVHRQp', network.mainnet.addressVersion))

            assert.equal(addr.toString(), 'XcSoAXVkkVqJ6JkB9AghtCC1idrdyVHRQp')
            assert.equal(addr.version, network.mainnet.addressVersion)
        })

        it('works with hex', function() {
            var addr = new Address('13483382d3c3d43fc9d7b52e652b6bbb70e8b667')
            assert.equal(addr.toString(), 'XcSoAXVkkVqJ6JkB9AghtCC1idrdyVHRQp')
        })

        it('throws error for invalid or unrecognized input', function() {
            assert.throws(function() {
              new Address('beepboopbeepboopbeepboopbeepboopbeepboopbeep')
            }, Error)
        })

        it('works for byte input', function() {
            var hash = base58.checkDecode('XnNxXm3bm2E54QHR9MfqHaz1fYa6J5PJhp')
            var addr = new Address(hash)
            assert.equal(addr.hash, hash)
            assert.equal(network.mainnet.addressVersion, hash.version)

/*            var hash = base58.checkDecode('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef')
            var addr = new Address(hash)
            assert.equal(addr.hash, hash)
            assert.equal(network.testnet.addressVersion, hash.version)*/
        })
      
        it('fails for bad input', function() {
            assert.throws(function() {
              new Address('foo')
            }, Error)
        })
    })

    describe('getVersion', function() {
        it('returns the proper address version', function() {
          assert.equal(Address.getVersion('XnNxXm3bm2E54QHR9MfqHaz1fYa6J5PJhp'), network.mainnet.addressVersion)
       //   assert.equal(Address.getVersion('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef'), network.testnet.addressVersion)
        })
    })

    describe('toString', function() {
        it('defaults to base58', function() {
            var addr = 'XnNxXm3bm2E54QHR9MfqHaz1fYa6J5PJhp';
            assert.equal((new Address(addr)).toString(), addr);
        })
    })

    describe('Constructor', function(){
        it('resolves version correctly', function(){
            //assert.equal((new Address(testnetAddress)).version, testnet)
            assert.equal((new Address(mainnetAddress)).version, mainnet)
           // assert.equal((new Address(testnetP2shAddress)).version, network.testnet.p2shVersion)
            //assert.equal((new Address(mainnetP2shAddress)).version, network.mainnet.p2shVersion)
        })
    })

    describe('validate', function() {
        it('validates known good addresses', function() {
            function validate(addr, expectedVersion) {
                assert.ok(Address.validate(addr));
            }

            validate(testnetAddress);
            validate(mainnetAddress);
            validate('XxPPGa6rn5mHhNRYEPedVpEgkoitQLxiu6');
            validate('Xb8q2SmcCjtYrxee5PpuZAVZKQXXZHfiay');
            validate('XgpFewbqCGKnJG7bSWHtd9AKzBAC2Aix7U');
            validate('XyDfJUEtVsA8qAew8Re4wrviBByMhHe6e6');
            validate('Xyd7tCRYvhm4hja8AbMUyS2iyE6EfPkTsk');

            // p2sh addresses
        //    validate(testnetP2shAddress);
          //  validate(mainnetP2shAddress);
        })

        it('does not validate illegal examples', function() {
            function invalid(addr) {
                assert.ok(!Address.validate(addr));
            }

            invalid(''); //empty should be invalid
            invalid('%%@'); // invalid base58 string
            invalid('1A1zP1eP5QGefi2DzPTf2L5SLmv7DivfNz'); // bad address (doesn't checksum)
            invalid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhe'); // bad address (doesn't checksum)
        })
    })
})
