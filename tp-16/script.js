// Mostrar spinner mientras cargan los datos
function mostrarSpinner(mostrar) {
  document.getElementById("loadingSpinner").style.display = mostrar ? "block" : "none";
}

// Cargar primeros 151 Pokémon
async function cargarPokemons() {
  mostrarSpinner(true);

  let respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  let data = await respuesta.json();

  let lista = document.getElementById("pokemonList");
  lista.innerHTML = "";

  // Generamos cartas con nombre + imagen + botón
  for (let i = 0; i < data.results.length; i++) {
    let pokemon = data.results[i];
    let id = i + 1;

    // Imagen oficial (artwork)
    let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    let card = `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="card shadow-sm text-center h-100">
          <img src="${imgUrl}" class="card-img-top p-2" alt="${pokemon.name}">
          <div class="card-body">
            <h6 class="card-title text-capitalize">${pokemon.name}</h6>
            <button class="btn btn-sm btn-danger" onclick="verPokemon(${id})">
              Ver más
            </button>
          </div>
        </div>
      </div>
    `;
    lista.innerHTML += card;
  }

  mostrarSpinner(false);
}

// Ver detalles de un Pokémon en el modal
async function verPokemon(id) {
  let respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let data = await respuesta.json();

  let nombre = data.name;
  let img = data.sprites.other["official-artwork"].front_default;
  let tipos = data.types.map(t => t.type.name).join(", ");
  let habilidad = data.abilities[0].ability.name; // primera habilidad
  let movimientos = data.moves.slice(0, 4).map(m => m.move.name).join(", ");

  document.getElementById("pokemonModalLabel").innerText = nombre;
  document.getElementById("pokemonModalBody").innerHTML = `
    <div class="text-center">
      <img src="${img}" class="img-fluid mb-3" style="max-height: 200px;">
    </div>
    <p><b>Tipos:</b> ${tipos}</p>
    <p><b>Habilidad:</b> ${habilidad}</p>
    <p><b>Movimientos:</b> ${movimientos}</p>
  `;

  let modal = new bootstrap.Modal(document.getElementById('pokemonModal'));
  modal.show();
}

// Ejecutar al inicio
cargarPokemons();
