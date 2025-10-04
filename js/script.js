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
    console.log(`--- ${this.name.toUpperCase()} (#${this.id}) ---`);
    console.log(`Height: ${this.height}`);
    console.log(`Weight: ${this.weight}`);
    console.log(`Types: ${this.types.join(", ")}`);
    console.log(`Sprite: ${this.sprite}`);
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
        throw new Error(`Pokémon not found: ${nameOrId}`);
      }
      const data = await response.json();

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

(async () => {
  const api = new PokemonAPI();

  // Get Pikachu
  const pikachu = await api.getPokemon("pikachu");
  pikachu.displayInfo();

  // Get Bulbasaur
  const bulbasaur = await api.getPokemon(1); // also works with ID
  bulbasaur.displayInfo();
})();
