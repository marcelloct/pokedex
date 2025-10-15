// start number counter
let searchPokemon = 1;

// Pokemon class: Represents an individual Pokémon
class Pokemon {
  constructor(name, id, height, weight, types, sprite) {
    this.name = name;
    this.id = id;
    this.height = height;
    this.weight = weight;
    this.types = types;
    this.sprite = sprite;
  }

  // Method to display Pokémon info
  displayInfo() {
    document.getElementById("pokemon-number").innerText = `Nº ${this.id}`;
    document.getElementById(
      "pokemon-name"
    ).innerText = `${this.name.toUpperCase()}`;
    document.getElementById("pokemon-image").src = this.sprite;
    document.getElementById("pokemon-image").alt = this.name;
    document.getElementById("pokemon-height").innerText = this.height;
    document.getElementById("pokemon-weight").innerText = this.weight;
    document.getElementById("pokemon-types").innerText = this.types.join(", ");

    document.getElementById("search-field").value = "";
    searchPokemon = this.id;
  }
}

// PokemonAPI class: Handles communication with the PokeAPI
class PokemonAPI {
  constructor(baseURL = "https://pokeapi.co/api/v2/pokemon/") {
    this.baseURL = baseURL;
  }

  // Fetch Pokémon data by name or ID
  async getPokemon(nameOrId) {
    try {
      const response = await fetch(
        `${this.baseURL}${
          typeof nameOrId === "String" ? nameOrId.toLowerCase() : nameOrId
        }`
      );

      if (!response.ok) {
        document.getElementById("error-message").innerText =
          "Pokemon not found";
        throw new Error(`Pokémon not found: ${nameOrId}`);
      } else {
        document.getElementById("error-message").innerText = "";
      }

      const data = await response.json();

      console.log(data);
      // Build a Pokemon object
      return new Pokemon(
        data.name,
        data.id,
        data.height,
        data.weight,
        data.types.map((t) => t.type.name),
        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
          "front_default"
        ]
      );
    } catch (error) {
      console.error(error);
    }
  }
}

// Inicialize
document
  .getElementById("search-button")
  .addEventListener("click", returnPokemon);

async function returnPokemon() {
  const api = new PokemonAPI();

  const value = document.getElementById("search-field").value;

  // Get the chosen pokemon
  const pokemon = await api.getPokemon(value);
  pokemon.displayInfo();
}

// Default result when loads the browser
(async () => {
  const api = new PokemonAPI();

  // Get the first pokemon
  const pokemon = await api.getPokemon(1);
  pokemon.displayInfo();
})();

document.querySelector(".btn-prev").addEventListener("click", async () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    const api = new PokemonAPI();
    const pokemon = await api.getPokemon(searchPokemon);
    pokemon.displayInfo();
  }
});

document.querySelector(".btn-next").addEventListener("click", async () => {
  searchPokemon += 1;
  const api = new PokemonAPI();
  const pokemon = await api.getPokemon(searchPokemon);
  pokemon.displayInfo();
});
