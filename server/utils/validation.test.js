var expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString' , () => {

  it('Should return false if a string is empty' , () =>{ //syncronis - no need to call done()
    var string = '    ';

    var message = isRealString(string);
    // expect(answer.from).toBe('Niz');
    // expect(answer.text).toBe(text);
    // expect(answer.createdAt).toExist();
    expect(message).toBe(false);
  });
  it('Should return false if a string is only numbers' , () =>{ //syncronis - no need to call done()
    var string = 12345;

    var message = isRealString(string);
    // expect(answer.from).toBe('Niz');
    // expect(answer.text).toBe(text);
    // expect(answer.createdAt).toExist();
    expect(message).toBe(false);
  });
  it('Should return true if a string is ligal' , () =>{ //syncronis - no need to call done()
    var string = '  ok  ';

    var message = isRealString(string);
    // expect(answer.from).toBe('Niz');
    // expect(answer.text).toBe(text);
    // expect(answer.createdAt).toExist();
    expect(message).toBe(true);
  });
});
