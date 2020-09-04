import { getPropertyName } from '../../src/getPropertyName';

const expectedProperty = 'hero.address.postcode';

const testScenarios = [
  'function(x) { return x.hero.address.postcode;}',
  'function(t){return t.hero.address.postcode}', 
  'function(t){return t.hero.address.postcode} ', 
  'function(t){return t.hero.address.postcode }', 
  'function(t){return t.hero.address.postcode ;}',
  'x => x.hero.address.postcode',
  'function(x){cov_2imlqdpfhj.f[46]++;cov_2imlqdpfhj.s[149]++;return x.hero.address.postcode;}',
];

describe.only(`getPropertyName should return '${expectedProperty}' when`, () => {
  test.each(testScenarios)(
    "%p",
    (testScenario) => {
      expect(getPropertyName(testScenario)).toBe(expectedProperty);
    }
  );
});

