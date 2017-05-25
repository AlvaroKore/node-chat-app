var expect = require('expect')
var {generateMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object' , () => {
        var from = 'Alvaro'
        var text = "some text"
        var obj = generateMessage(from, text)
        expect(obj.from).toBe(from)
        expect(obj.text).toBe(text)
        expect(obj).toInclude({from,text})
        expect(obj.createdAt).toBeA('number')
    })
})
