export const getPropertyName = (propertyFunction: string) => {
    
    let properties: string[] = [];

    if (propertyFunction) {
        if (propertyFunction.toString().indexOf('=>') !== -1) {
            // propertyFunction.toString() sample value:
            // x => x.hero.address.postcode
            // we need the 'hero.address.postcode'
            // for gr.get('hero.address.postcode') function
            properties = propertyFunction.split('=>')[1].trim()
                                        .split('.')
                                        .splice(1);
        } else {
            // https://github.com/dsherret/ts-nameof - helped me with the code below, THANX!!!!
            // propertyFunction.toString() sample value:
            //  function(x) { return x.hero.address.postcode;}
            // we need the 'hero.address.postcode'
            // for gr.get('hero.address.postcode') function
            
            // @ts-ignore (ignore the null complaint by typescript
            properties = propertyFunction.match(/(return [;.a-zA-Z0-9 ]+)/gi)[0]
                                        .match(/(?![. ])([a-z0-9_]+)(?=[};.])/gi).splice(1);

        }
    }

    return properties.join('.');
};
