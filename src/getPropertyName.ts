export const getPropertyName = (propertyFunction: string) => {
  let properties: string[] = [];

  if (propertyFunction) {
    if (propertyFunction.toString().includes('=>')) {
      // propertyFunction.toString() sample value:
      // x => x.hero.address.postcode
      // we need the 'hero.address.postcode'
      // for gr.get('hero.address.postcode') function
      properties = propertyFunction
        .split('=>')[1]
        .trim()
        .split('.')
        .splice(1);
    } else {
      // https://github.com/dsherret/ts-nameof - helped me with the code below, THANX!!!!
      // propertyFunction.toString() sample value:
      //  function(x) { return x.hero.address.postcode;}
      // we need the 'hero.address.postcode'
      // for gr.get('hero.address.postcode') function

      const step1 = propertyFunction.match(/return\s+([.a-zA-Z0-9]+)/i); // get the return part of the propertyFunction eg: return x.hero.address.postcode;
	    const step2 = step1 && step1[1].match(/([a-z0-9_]+)/gi); // split the step1[1] text to return an array eg: ['x','hero','address','postcode']
	    properties = (step2 && step2.splice(1)) || [];
    }
  }

  return properties.join('.');
};
