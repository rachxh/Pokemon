const pokeCard = document.querySelector(".pokedex");

const fetchData = () => {
  fetch(" https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")
    .then((res) => res.json())
    .then((data) => {
      const fetches = data.results.map((p) => {
        return fetch(p.url).then((res) => res.json());
      });
      Promise.all(fetches).then((res) => {
        pokeCards(res);
      });
    });
};

const pokeCards = (data) => {
  const types = document.querySelector("#types").value;
  if (types != "") {
    data = data.filter((card) => {
      return card.types[0].type.name === types;
    });
  }

  const pokeName = document.querySelector("#pokeName").value;
  console.log(pokeName);
  if (pokeName.length > 0) {
    data = data.filter((card) => {
      return card.name.startsWith(pokeName);
    });
  }

  const cards = data
    .map((card) => {
      return `    <div class="card">
          <img  src="${card.sprites.other.dream_world.front_default}" alt="${card.name}" />
          <span class="card-name">${card.name}<br>${card.types[0].type.name}</span>
          
      </div>`;
    })
    .join("");
  pokeCard.innerHTML = cards;
};

fetchData();
