var expect = require('expect');
var {generateMessage , generateLocationMessage} = require('./message');

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


describe('generateLocationMessage' , () => {

  it('Should generate correct location object' , () =>{ //syncronis - no need to call done()
    var from = 'Niz';
    var latitude = 1111;
    var langitude = 2222;
    var url = 'https://www.google.com/maps?q=1111,2222';
    var message = generateLocationMessage(from, latitude, langitude);
    // expect(answer.from).toBe('Niz');
    // expect(answer.text).toBe(text);
    // expect(answer.createdAt).toExist();
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  });
});
