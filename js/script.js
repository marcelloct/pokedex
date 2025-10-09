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
    document.getElementById(
      "pokemon-name"
    ).innerText = `${this.name.toUpperCase()} (#${this.id})`;
    document.getElementById("pokemon-sprite").src = this.sprite;
    document.getElementById("pokemon-sprite").alt = this.name;
    document.getElementById("pokemon-height").innerText = this.height;
    document.getElementById("pokemon-weight").innerText = this.weight;
    document.getElementById("pokemon-types").innerText = this.types.join(", ");
    // console.log(`--- ${this.name.toUpperCase()} (#${this.id}) ---`);
    // console.log(`Height: ${this.height}`);
    // console.log(`Weight: ${this.weight}`);
    // console.log(`Types: ${this.types.join(", ")}`);
    // console.log(`Sprite: ${this.sprite}`);
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
        data.sprites.front_default
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

  // Get Bulbasaur
  // const bulbasaur = await api.getPokemon(1); // also works with ID
  // bulbasaur.displayInfo();
}

// For Test
// (async () => {
//   const api = new PokemonAPI();

//   // Get Pikachu
//   const pokemon = await api.getPokemon("pikachu");
//   pokemon.displayInfo();
// })();
