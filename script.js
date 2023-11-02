const CARDS = 3;

// PETICION DE POKEMONE A LA API

for(let i = 1; i <= CARDS; i++){
    let id = getRandonId(150);
    searchPokemonById(id)
}

function getRandonId(max){
    return Math.floor(Math.random()*max) + 1;
}


let draggableElement = document.querySelector('.draggable-element')
let droppableElement = document.querySelector('.droppable-element')

let pokemonSearched = [];
let pokemonName = [];

async function searchPokemonById(id){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();
    pokemonSearched.push(data);

    pokemonName.push(data.name);
    pokemonName = pokemonName.sort(() => Math.random() - 0.5); 


    //Dibujando los pokemones

    draggableElement.innerHTML = ''

    pokemonSearched.forEach(pokemon =>{
        draggableElement.innerHTML += `
        <div class="pokemon">
            <img id="${pokemon.name}" draggable="true" class="image" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="">
        </div>`
    })

    // insertando los pokemones
    droppableElement.innerHTML = ''

    pokemonName.forEach(name =>{
        droppableElement.innerHTML += `
        <div class="names">
            <p>${name}</p>
        </div>
        ` 
    })

    let pokemons = document.querySelectorAll('.image');
    pokemons = [...pokemons]
    pokemons.forEach(pokemon => {
        pokemon.addEventListener('dragstart', event=>{
            event.dataTransfer.setData('text', event.target.id)
        })
    })


    let names = document.querySelectorAll('.names');
    let wrong = document.querySelector('.wrong');
    let point = 0;
    names = [...names]
    names.forEach(name =>{
        name.addEventListener('dragover', event=>{
            event.preventDefault() 
        })
        name.addEventListener('drop' , event=>{
            const draggableElementData = event.dataTransfer.getData('text')
            let pokemonElement = document.querySelector(`#${draggableElementData}`)

            if(event.target.innerHTML == draggableElementData){
                event.target.innerHTML = ''
                wrong.innerHTML = ('ACERTASTE');
                point++
                event.target.appendChild(pokemonElement)

                if(point == CARDS){
                    draggableElement.innerHTML = '<p class="win";>¡Ganaste!</p>'
                    wrong.innerHTML = ' ';

                    restartButton.style.display = 'block';
                }
            }
            else{
                wrong.innerHTML = ('POKEMON INCORRECTO')
            }
        });
        
    });

};

 



