// Core
import { sum, delay, getUniqueID, getFullApiUrl } from './';

describe('instruments: ', () => {
  
  jest.setTimeout(15000);

  test('sum function should be a function', () => {
    expect(sum).toBeInstanceOf(Function);
  });
  
  test('sum function should throw, when called with non-number type as a second argument', () => {
    expect(() => sum(2, 'привет')).toThrow();
  });

  test('sum function should throw, when called with non-number type as a first argument', () => {
    expect(() => sum('hello', 2)).toThrow();
  });

  test('sum function should return an addition of two arguments which were input in function', () => {
    expect(sum(3, 2)).toBe(5);
    expect(sum(1, 7)).toMatchSnapshot();
  });

  test('delay function should return a resolved promise', async () => {
    await expect(delay(5000)).resolves.toBeUndefined();
  });

  test('getUniqueId function should be a function', () => {
    expect(getUniqueID).toBeInstanceOf(Function);
  });
  
  test('getUniqueId function should throw, when called with non-number type as an argument', () => {
    expect(() => getUniqueId('привет')).toThrow();
  });

  test('getUniqueId function should produce a string of a desired given length', () => {
    expect(typeof getUniqueID()).toBe('string');
    expect(getUniqueID(5)).toHaveLength(5);
    expect(getUniqueID(13)).toHaveLength(13);
  });

  test('getFullApiUrl function should be a function', () => {
    expect(getFullApiUrl).toBeInstanceOf(Function);
});

  test('getFullApiUrl function should throw, when called with non-string type as argument', () => {
      expect(() => getFullApiUrl(2, 'hello')).toThrow();
      expect(() => getFullApiUrl('hello', 2)).toThrow();
      expect(() => getFullApiUrl(2, 2)).toThrow();
  });

  test('getFullApiUrl function should return an FullApiUrl', () => {
      expect(getFullApiUrl('apiUrl', 'GROUP_ID')).toBe('apiUrl/GROUP_ID');
      expect(getFullApiUrl('apiUrl', 'GROUP_ID')).toMatchSnapshot();
  });

});
