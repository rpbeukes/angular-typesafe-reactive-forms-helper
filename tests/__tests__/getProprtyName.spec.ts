import { getPropertyName } from '../../src/getPropertyName';

const expectedProperty = 'hero.address.postcode';

describe(`getPropertyName should return '${expectedProperty}' when`, () => {
  test('function(x) { return x.hero.address.postcode;}', () => {
    const testScenario = 'function(x) { return x.hero.address.postcode;}';
    expect(getPropertyName(testScenario)).toBe(expectedProperty);
  });

  test('x => x.hero.address.postcode', () => {
    const testScenario = 'x => x.hero.address.postcode';
    expect(getPropertyName(testScenario)).toBe(expectedProperty);
  });

  test('function(x){cov_2imlqdpfhj.f[46]++;cov_2imlqdpfhj.s[149]++;return x.hero.address.postcode;}', () => {
    const testScenario = 'function(x){cov_2imlqdpfhj.f[46]++;cov_2imlqdpfhj.s[149]++;return x.hero.address.postcode;}';
    expect(getPropertyName(testScenario)).toBe(expectedProperty);
    expect(1).toBe(0);
  });
});
