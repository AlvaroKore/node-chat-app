var expect = require('expect')
var {generateMessage, generateLocationMessage} = require('./message')

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

describe('generateLocationMessage', () => {
    it('should generate correct location object' , () => {
        var from = 'Alvaro'
        var latitude = 1
        var longitude = 2
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`

        var message = generateLocationMessage(from,latitude,longitude)
        expect(latitude).toBeA('number')
        expect(longitude).toBeA('number')
        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({from, url})
        expect(message.url).toBe(url)
    })
})
