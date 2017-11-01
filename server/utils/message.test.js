const expect = require('expect');

const {generateMessage} = require('./message');
const {generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate a message object', () => {
    let from = 'Richard';
    let text = 'Oi, eu não sou o Goku!';
    let message = generateMessage(from, text);
    expect(message).toMatchObject({from, text});
    expect(typeof message.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should return correct location object', () => {
    let from = 'Richard';
    let coords = {
      latitude: 123,
      longitude: 321
    };
    let url = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
    let message = generateLocationMessage(from, coords);
    expect(message).toMatchObject({from, url});
    expect(typeof message.createdAt).toBe('number');
  });
});