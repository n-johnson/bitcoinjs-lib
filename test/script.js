var Script = require('../src/script.js')
var assert = require('assert')

describe('Script', function() {
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
      var script = Script.fromHex("a914e8c300c87986efa84c37c0519929019ef86eb5b487")
      assert.equal(script.getOutType(), 'P2SH')
    })

    it('works for pubkey', function() {
      var script = Script.fromHex("76a9145a3acbc7bbcc97c5ff16f5909c9d7d3fadb293a888ac")
      assert.equal(script.getOutType(), 'Pubkey')
    })
  })

  describe('getToAddress', function() {
    it('works for p2sh type output', function() {
      var script = Script.fromHex("a914e8c300c87986efa84c37c0519929019ef86eb5b487")
      assert.equal(script.getToAddress(), '3NukJ6fYZJ5Kk8bPjycAnruZkE5Q7UW7i8')
    })

    it('works for pubkey type output', function() {
      var script = Script.fromHex("76a9145a3acbc7bbcc97c5ff16f5909c9d7d3fadb293a888ac")
      assert.equal(script.getToAddress(), '19E6FV3m3kEPoJD5Jz6dGKdKwTVvjsWUvu')
    })
  })
})
