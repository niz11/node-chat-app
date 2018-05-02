var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage' , () => {

  it('Should generate correct message object' , () =>{ //syncronis - no need to call done()
    var from = 'Niz';
    var text = 'testing message'

    var message = generateMessage(from,text);
    // expect(answer.from).toBe('Niz');
    // expect(answer.text).toBe(text);
    // expect(answer.createdAt).toExist();
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });
});
