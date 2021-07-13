/*
Input
A string that contains the name of a pokemon or an array of strings with names of pokemon.

Outputs
The type of and name of the pokemon passed in as an input outputted via console.log.

Constraints

Only output the pokemon that have been inputed.

Edge Cases
Any value that isn't a string or an array of strings.

*/

const fetch = require('node-fetch');
const fs = require('fs');

filePath = process.argv[2];

if (filePath === undefined) {
  console.log("Please enter a filepath/name");
} else {
  fs.promises.readFile(filePath, 'utf-8')
  .then(data => data.split('\n'))
  .then(data => pullPokemonTypes(data))
  .catch(error => console.log("Please enter a correct file path and name."));
};
//pokemonNameList = pokemonNameList.split('\n');

function pullPokemonTypes (list) {
  return new Promise ((resolve, reject) => {
    for (let i = 0; i < list.length; i++) {
      let url = 'https://pokeapi.co/api/v2/pokemon/' + list[i];
      fetch(url)
      .then(response => response.json())
      .then((pokemon) => {
        let pokemonTypes = '';
        let numberOfTypes = 0;
        for(let i = 0; i < pokemon.types.length; i++){
          pokemonTypes += pokemon.types[i].type.name + ' ';
          numberOfTypes += 1;
        }
        if (numberOfTypes > 1) {
          pokemonTypes = pokemonTypes.split(' ').join(', ').slice(0, pokemonTypes.length) + '.';
        } else {
          pokemonTypes = pokemonTypes.slice(0, pokemonTypes.length - 1) + '.';
        }
        console.log(pokemon.name + ': ' + pokemonTypes);
        resolve();
      })
      .catch(error => console.log(Error + ' is not a valid pokemon name'));
    }
  })
}