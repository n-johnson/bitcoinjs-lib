var Script = require('../src/script.js')
var assert = require('assert')

describe('Script', function() {
  var p2shScriptPubKey, pubkeyScriptPubkey, addressScriptSig

  beforeEach(function(){
    p2shScriptPubKey = "a914e8c300c87986efa84c37c0519929019ef86eb5b487"
    pubkeyScriptPubKey = "76a9145a3acbc7bbcc97c5ff16f5909c9d7d3fadb293a888ac"
    addressScriptSig = "48304502206becda98cecf7a545d1a640221438ff8912d9b505ede67e0138485111099f696022100ccd616072501310acba10feb97cecc918e21c8e92760cd35144efec7622938f30141040cd2d2ce17a1e9b2b3b2cb294d40eecf305a25b7e7bfdafae6bb2639f4ee399b3637706c3d377ec4ab781355add443ae864b134c5e523001c442186ea60f0eb8"
  })

  describe('constructor', function() {
    it('works for a byte array', function() {
      assert.ok(new Script([]))
    })

    it('works when nothing is passed in', function() {
      assert.ok(new Script())
    })

    it('throws an error when input is not an array', function() {
      assert.throws(function(){ new Script({}) })
    })
  })

  describe('getOutType', function() {
    it('works for p2sh', function() {
      var script = Script.fromHex(p2shScriptPubKey)
      assert.equal(script.getOutType(), 'P2SH')
    })

    it('works for pubkey', function() {
      var script = Script.fromHex(pubkeyScriptPubKey)
      assert.equal(script.getOutType(), 'Pubkey')
    })
  })

  describe('getInType', function() {
    it('works for address', function() {
      var script = Script.fromHex(addressScriptSig)
      assert.equal(script.getInType(), 'Address')
    })
  })

  describe('getToAddress', function() {
    it('works for p2sh type output', function() {
      var script = Script.fromHex(p2shScriptPubKey)
      assert.equal(script.getToAddress().toString(), '3NukJ6fYZJ5Kk8bPjycAnruZkE5Q7UW7i8')
    })

    it('works for pubkey type output', function() {
      var script = Script.fromHex(pubkeyScriptPubKey)
      assert.equal(script.getToAddress().toString(), '19E6FV3m3kEPoJD5Jz6dGKdKwTVvjsWUvu')
    })
  })

  describe('getFromAddress', function() {
    it('works for address type input', function() {
      var script = Script.fromHex(addressScriptSig)
      assert.equal(script.getFromAddress().toString(), '1BBjuhF2jHxu7tPinyQGCuaNhEs6f5u59u')
    })
  })
})
