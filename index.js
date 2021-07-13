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

let argv = process.argv;
argv = argv.slice(2)

let url;

// fetch('https://pokeapi.co/api/v2/pokemon/charizard')
//   .then(response => response.json())
//   .then((pokemon) => {
//     let pokemonTypes = ''
//     for(let i = 0; i < pokemon.types.length; i++){
//       pokemonTypes += pokemon.types[i].type.name + ' ';
//     }
//     pokemonTypes = pokemonTypes.split(' ').join(', ').slice(0, pokemonTypes.length - 0) + '.';
//     console.log(pokemon.name + ': ' + pokemonTypes);
//   })
//   .catch(error => console.log(error));

for (let i = 0; i < argv.length; i++) {
  let url = 'https://pokeapi.co/api/v2/pokemon/' + argv[i];
  fetch(url)
  .then(response => response.json())
  .then((pokemon) => {
    let pokemonTypes = ''
    let numberOfTypes = 0;
    for(let i = 0; i < pokemon.types.length; i++){
      pokemonTypes += pokemon.types[i].type.name + ' ';
      numberOfTypes += 1;
    }
    if (numberOfTypes > 1) {
      pokemonTypes = pokemonTypes.split(' ').join(', ').slice(0, pokemonTypes.length - 0) + '.';
    } else {
      pokemonTypes = pokemonTypes.slice(0, pokemonTypes.length - 1) + '.';
    }
    console.log(pokemon.name + ': ' + pokemonTypes);
  })
  .catch(error => console.log('Please enter a valid pokemon name.'));
}