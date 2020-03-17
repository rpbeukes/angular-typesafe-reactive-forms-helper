export const getPropertyName = (propertyFunction: any): string => {
    let properties: string[];
    if (propertyFunction.toString().indexOf('=>') !== -1) {
        // propertyFunction.toString() sample value:
        // x => x.hero.address.postcode
        // we need the 'hero.address.postcode'
        // for gr.get('hero.address.postcode') function
        properties = propertyFunction.toString().split('=>')[1].trim()
                                       .split('.')
                                       .splice(1);
    } else {
         // https://github.com/dsherret/ts-nameof - helped me with the code below, THANX!!!!
        // propertyFunction.toString() sample value:
        //  function(x) { return x.hero.address.postcode;}
        // we need the 'hero.address.postcode'
        // for gr.get('hero.address.postcode') function
        properties = propertyFunction.toString()
                                     .match(/(return [;.a-zA-Z0-9 ]+)/gi)[0]
                                     .match(/(?![. ])([a-z0-9_]+)(?=[};.])/gi).splice(1);
    }

    return properties.join('.');
};
