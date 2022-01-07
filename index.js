const lista = document.querySelector('.pokemon-list-container');
let btnPresionar = document.querySelector('.btnCortina');
let btnPresionarStyle = document.querySelector('.cursor').style;
const cambiarStyle = document.querySelector('.pantalla').style;
let divP = document.querySelector('.pokedex-container');


//------------------------------------------------------------------Promesa para tarjeta grande
const buscarPokemon = async ( id ) => {

  let pokemon = `https://pokeapi.co/api/v2/pokemon-form/${id}/`

     try{
      const resp = await fetch( pokemon );

      const {name, id, sprites, types} = await resp.json();

      return { name,
               id,  
               img: sprites.front_default,
               tipo: types[0].type.name }

    }catch( err ){
      throw err;
    }
  
}


//------------------------------------------------------------------Promesa para tarjetas chicas
const buscarImgPokemon = async ( id ) => {

  let pokemon = `https://pokeapi.co/api/v2/pokemon-form/${id}/`

     try{
      const resp = await fetch( pokemon );

      const {id, sprites} = await resp.json();

      return { id, img: sprites.front_default }

    }catch( err ){
      throw err;
    }
  
}


//------------------------------------------------------------------HTML de tarjetas chicas
const pokemonHtml = ( parametro ) => {

    const html = `
    <article class="card-container list">
      <img class="power-off pokemonHtml" src="${ parametro.img }" alt="${parametro.id}" />
    </article>
  `;

    const articlePokemon = document.createElement('div');
    articlePokemon.innerHTML = html;
    lista.append(articlePokemon);

}

//------------------------------------------------------------------HTML de tarjetas grandes
const pokemonHtmlGrande = ( parametro ) => {

  let nombre = parametro.name;

  const html = `
  <article class="card-container">
    <div class="card-container_poke ${parametro.tipo}">
      <p class="titulo">${ nombre.toUpperCase() }</p>
      <img class="img-pokemon" src="${ parametro.img }" alt="${nombre.toUpperCase()}" />
      <p class="numero">No. #${parametro.id}</p>
      <p class="tipo">Tipo: ${parametro.tipo}</p>
      <div class="btn power-off click"><p class="click">Regresar</p></div>
    </div>
  </article>
  `;

  const articlePokemon = document.createElement('div');
  articlePokemon.innerHTML = html;
  lista.append(articlePokemon);

}

//------------------------------------------------------------------Saber cuantos pokemones van a estar 
const numeros = async () => {

  let arr = []

  for (let i = 1; i <= 72 ; i++ ){
    arr.push(i);
  }

  return arr;
}


//------------------------------------------------------------------Llamar a las fichas pequeñas 
const fichasPokemonChica = async () => {

  let num = await numeros()

  let nuevo = await Promise.all( num.map(buscarPokemon) )

  return nuevo.map(pokemonHtml)
}

//EVENTOS
//------------------------------------------------------------------Evento presionar el boton y desaparece 
btnPresionar.addEventListener( 'click', () => {
  
  cambiarStyle.zIndex = -1;
  divP.removeChild(btnPresionar);
  
}) 

//------------------------------------------------------------------Evento aparece ficha grande 
lista.addEventListener('click', async (event) => {
  
  let pokemonImg = event.target.classList.contains('pokemonHtml');
  
  if( pokemonImg ) {
    const div = [event.target];
      const numero = div[0].alt
      lista.innerHTML = '';
      
      pokemonHtmlGrande( await buscarPokemon( numero ));

    }

    
})

//------------------------------------------------------------------Aparecen fichas chicas 
lista.addEventListener('click', async (event) => {
  
  let pokemonBtn = event.target.classList.contains('click');

  if( pokemonBtn ) {

    // Limpiar HTML
    lista.innerHTML = '';
    await fichasPokemonChica();

  }
  
})
  
const init = async () => {
    
    btnPresionar.disabled = true;
    await fichasPokemonChica()
    btnPresionar.disabled = false;
    btnPresionarStyle.cursor = 'pointer';
}

  init()