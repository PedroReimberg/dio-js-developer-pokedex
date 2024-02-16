const pokemonList = document.getElementById(`pokemonList`);
const loadMoreButton = document.getElementById(`loadMoreButton`);
let limit = 12;
let offset = 0;

const maxRecords = 151;

let nextPageLimit = limit;

loadPokemonItens(limit, offset)

function loadPokemonItens(limit, offset) {
    pokeApi.getPokemons(limit, offset).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => 
            `
            <li class="pokemon ${pokemon.type}">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
            
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                    </ol>
                    <img src=${pokemon.photo} alt="${pokemon.name}">                    
                </div>   
                <div class="attributes" style="display:none">
                        <p class="hp">HP: ${pokemon.health}</p>
                        <div class="weight_height">
                            <ol class="weight_height">Weight: ${pokemon.weight}</ol>
                            <ol class="weight_height">Height: ${pokemon.height}</ol>
                        </div>
                </div>             
            </li>
            `
        ).join(``)
    })
}

function convertPokemonTypesToLi(pokemonTypes){
    return pokemonTypes.map((typeSlot => `<li class="type">${typeSlot.type.name}</li>`))
}

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    
    nextPageLimit = offset + limit;

    if (nextPageLimit >= maxRecords) {        
        limit -= (nextPageLimit - maxRecords)
        loadPokemonItens(limit, offset)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else loadPokemonItens(limit, offset)
})

function showPokemonDetails() {
    let classes = document.getElementsByClassName('attributes')
    let checkBox = document.getElementById("myCheck");
    
    for (item of classes)
    item.style.display = checkBox.checked == true ? "block" : "none";
}