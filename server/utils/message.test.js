const expect = require('expect');

var {generateMessage} = require('./message');


describe('generateMessage', () => {
  it('should generate correct mess obj', () => {
    var from = 'jen' ;
    var message = 'some mes';
    var res = generateMessage(from,message);

    expect(typeof res.createdAt).toBe('number');
    expect(res).toMatchObject({from,message});

  });
});
