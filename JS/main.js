let num_of_pokemon = 899;
let startIndex = 1;

const colors = {
	fire: '#F5AC78',
	grass: '#A7DB8D',
	electric: '#FAE078',
    dark: '#A29288',
	water: '#9DB7F5',
	ground: '#EBD69D',
    ghost: '#A292BC',
    ice: '#BCE6E6',
	rock: '#D1C17D',
	fairy: '#F4BDC9',
	poison: '#C183C1',
	bug: '#C6D16E',
	dragon: '#A27DFA',
	psychic: '#FA92B2',
	flying: '#C6B7F5',
	fighting: '#D67873',
	normal: '#C6C6A7',
    steel: '#D1D1E0'
};
const main_types = Object.keys(colors);

async function getSinglePokemon(pokemonId){
    const api_url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const response = await fetch(api_url);
    const pokemon = await response.json();
    createPokemonCard(pokemon);
}

async function getAllPokemons(){

    for (let index = startIndex; index < num_of_pokemon; index++) {
        await getSinglePokemon(index);
    }
}

async function clearChildContent(){
    const myNode = document.getElementById("pokemon");
    if(myNode.hasChildNodes){
        while (myNode.firstChild) {
            await clearNode(myNode);
        }
    }
}

async function clearNode(node){
    await node.removeChild(node.lastChild);
}

window.onload = async function() {
    await getAllPokemons();
}

async function getSelectedRegion(){
    const region = document.getElementById('region-select').value;
    switch(region){
        case 'kanto':
            await clearChildContent();
            startIndex = 1;
            num_of_pokemon = 152;
            await getAllPokemons();
            break;
        case 'johto':
            await clearChildContent();
            startIndex = 152;
            num_of_pokemon = 252;
            await getAllPokemons();
            break;
        case 'hoenn':
            await clearChildContent();
            startIndex = 252;
            num_of_pokemon = 387;
            await getAllPokemons();
            break;
        case 'sinnoh':
            await clearChildContent();
            startIndex = 387;
            num_of_pokemon = 494;
            await getAllPokemons();
            break;
        case 'unova':
            await clearChildContent();
            startIndex = 494;
            num_of_pokemon = 650;
            await getAllPokemons();
            break;
        case 'kalos':
            await clearChildContent();
            startIndex = 650;
            num_of_pokemon = 722;
            await getAllPokemons();
            break;
        case 'alola':
            await clearChildContent();
            startIndex = 722;
            num_of_pokemon = 810;
            await getAllPokemons();
            break;
        case 'galar':
            await clearChildContent();
            startIndex = 810;
            num_of_pokemon = 899;
            await getAllPokemons();
            break;
        default:
            await clearChildContent();
            startIndex = 1;
            num_of_pokemon = 899;
            await getAllPokemons();
            break;
    }
}

function createPokemonCard(pokemonObject){
    const poke_types = pokemonObject.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemonObject.name[0].toUpperCase() + pokemonObject.name.slice(1);
	const color = colors[type];
    const id = pokemonObject.id;

    const pokemonCardEle = document.createElement('div');
    pokemonCardEle.classList.add('pokemon');
    pokemonCardEle.style.backgroundColor = color;

    const pokemonCardInnerHTML = `
        <div class="img-container">
            <img src= ${pokemonObject.sprites.front_default} />
        </div>
        <div class="info">
            <span class="number">#${id.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type[0].toUpperCase() + type.slice(1)}</span></small>
        </div>
    `;

    pokemonCardEle.innerHTML = pokemonCardInnerHTML;
    document.getElementById('pokemon').appendChild(pokemonCardEle);
}





