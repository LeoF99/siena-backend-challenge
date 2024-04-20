import stringToCsv from '../stringToCsv';

describe('stringToCsv function', () => {
  it('should convert a single line CSV string to JSON', () => {
    const csvString = 'Name,Age,City\nJohn,30,New York';
    const expectedJson = [{ Name: 'John', Age: '30', City: 'New York' }];
    expect(stringToCsv(csvString)).toEqual(expectedJson);
  });

  it('should convert a multi-line CSV string to JSON', () => {
    const csvString = 'Name,Age,City\nJohn,30,New York\nAlice,25,Paris';
    const expectedJson = [
      { Name: 'John', Age: '30', City: 'New York' },
      { Name: 'Alice', Age: '25', City: 'Paris' },
    ];
    expect(stringToCsv(csvString)).toEqual(expectedJson);
  });

  it('should handle empty values in CSV string', () => {
    const csvString = 'Name,Age,City\nJohn,30,\nAlice,,Paris';
    const expectedJson = [
      { Name: 'John', Age: '30', City: '' },
      { Name: 'Alice', Age: '', City: 'Paris' },
    ];
    expect(stringToCsv(csvString)).toEqual(expectedJson);
  });
});
