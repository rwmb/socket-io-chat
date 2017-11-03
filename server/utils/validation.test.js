const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should allow strings with non-space characters', () => {
    let str = ' b  s ';
    let returnValue = isRealString(str);
    expect(typeof returnValue).toBe('boolean');
    expect(returnValue).toBe(true);
  });

  it('should reject non-string values', () => {
    let notStr = 1234;
    let returnValue = isRealString(notStr);
    expect(returnValue).toBe(false);
  });

  it('should reject string with only spaces', () => {
    let invalidStr = '            ';
    let returnValue = isRealString(invalidStr);
    expect(returnValue).toBe(false);
  });
});