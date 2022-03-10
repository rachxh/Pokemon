const pokeCard = document.querySelector(".pokedex");

const fetchData = () => {
  fetch(" https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")
    .then((res) => res.json())
    .then((data) => {
      //   console.log("fetch result", data);
      //   pokeCards(data.results);
      const fetches = data.results.map((p) => {
        return fetch(p.url).then((res) => res.json());
      });
      Promise.all(fetches).then((res) => {
        // console.log("promise all result", res);
        pokeCards(res);
      });
    });
};

const pokeCards = (data) => {
  console.log("pokeCards data come in", data);

  const cards = data
    .map((card) => {
      return `    <div class="card">
          <img  src="${card.sprites.other.dream_world.front_default}" alt="${card.name}" />
          <span class="card-name">${card.name}</span>
      </div>`;
    })
    .join("");
  pokeCard.innerHTML = cards;
};

fetchData();
