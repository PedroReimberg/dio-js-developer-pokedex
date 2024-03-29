const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = '#' + String(pokeDetail.id).padStart(3, '0');
    pokemon.name = (pokeDetail.name[0]).toUpperCase() + (pokeDetail.name).slice(1);

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.weight = pokeDetail.weight
    pokemon.height = pokeDetail.height    
    pokemon.health = pokeDetail.stats[0].base_stat

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (limit, offset) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        // .then((pokemonsDetails) => pokemonsDetails)
        .catch((error => { console.log(error) }))
}