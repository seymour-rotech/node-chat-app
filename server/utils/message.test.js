var expect = require('expect')

var {generateMessage} = require('./message')

describe('generateMessage', () =>{

    it ('should generate correct message object', () => {
        var from = 'Seymour'
        var text = 'This is a test Message'
        var message = generateMessage(from, text)

        expect(message.createAt).toBeA('number')
        expect(message).toInclude({from, text})


    })
})