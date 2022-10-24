//=============================================================POKEMON OF THE DAY====================================================================
fetch(`https://pokeapi.co/api/v2/pokemon/${Math.round((new Date().getYear() - 100) * new Date().getDate() + ((new Date().getMonth() + 1) * 12))}`)
    .then(resp => resp.json())
    .then(data => {

        document.querySelector("#pokemonOfTheDayName").innerHTML = `<div id=pokemonOfTheDayName style="text-align: center;">
            <h2> ${data.name} </h2>
        </div>`

        document.querySelector("#pokemonOfTheDayPic").innerHTML = `<div id=pokemonOfTheDayPic" style="text-align: center;">
            <img src=${data.sprites.front_default} width = "300">
        </div>`

    })
    .catch(err => { throw new Err })
//===============================================================POKEMON SEARCH======================================================================
const pokemonSearch = (pokemonName) => {
    pokemonName = pokemonName.toLowerCase()
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=905`)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.results.length; i++) {
                if (data.results[i].name === pokemonName || data.results[i].url === `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`) {
                    fetch(data.results[i].url)
                        .then(response => response.json())
                        .then(data => {
                            let resultingAbilities = []
                            let resultingTypes = []
                            let resultingStats = []
                            let resultingStatValues = []
                            let resultingMoves = []
                            for (let x of data.abilities) {
                                resultingAbilities.push('\n' + `${x.ability.name}`)
                            }
                            for (let x of data.types) {
                                resultingTypes.push('\n' + `${x.type.name}`)
                            }
                            for (let x of data.stats) {
                                resultingStats.push(x.stat.name + ':' + x.base_stat + '\n')
                            }
                            for (let x of data.moves) {
                                resultingMoves.push(x.move.name)
                            }

                            document.querySelector('#bottomLeft').innerHTML = `<div id="infoPanel">
                            
                                <h1>${data.id}: ${data.name}</h1>
                                <img src=${data.sprites.front_default}> <img src=${data.sprites.front_shiny}> 
                                <h5><u>types</u>: ${resultingTypes}</h5>
                                <h5><u>abilities</u>: ${resultingAbilities}</h5>
                                <h5 id="stats" style="overflow-wrap: break-word"><u>stats</u>: ${resultingStats}</h5>
                                <h5 id="moves" style="border-style: solid; height: 123px; width: 100%; overflow-wrap: break-word; overflow-y: scroll;"><u>learnable moves</u>: ${resultingMoves}</h5>

                                <div id="search-bar" class="row">
                                    <div id="goodra" class="col-4">
                                        <img src="https://user-images.githubusercontent.com/110724575/196528974-9f016a9d-3734-42ea-a1c9-879ba0ee1f29.png"
                                            width="200" height="100">
                                    </div>
                                    <div id="input field" class="col-8">
                                        <input type="text" class="search-bar" placeholder="SEARCH" style="width: 400px; text-indent: 10px;">
                                    </div>
                                </div>

                            </div>`

                            document.querySelector('.search-bar').addEventListener('change', function (e) {
                                pokemonSearch(e.target.value)
                            })
                        })

                } else {

                    document.querySelector('#bottomLeft').innerHTML = `<div id="errorPage"
                        
                        <div id="errorMessage" style="display: flex; align-items: center; justify-content:center;">
                            <img src="https://user-images.githubusercontent.com/110724575/197580618-a4ba5e25-f5eb-429e-98cb-c2dbbd4e9e1b.png"
                                width="300" height="345">
                            <h1>OH</h1>
                            <img src="https://user-images.githubusercontent.com/110724575/197580618-a4ba5e25-f5eb-429e-98cb-c2dbbd4e9e1b.png"
                                width="300" height="345">
                        </div>

                        <div id="errorMessage2" style="display: flex; justify-content:space-around;"><h1>POKEMON NOT FOUND</h1></div>

                        <div id="search-bar" class="row">
                            <div id="goodra" class="col-4">
                                <img src="https://user-images.githubusercontent.com/110724575/196528974-9f016a9d-3734-42ea-a1c9-879ba0ee1f29.png"
                                    width="200" height="100">
                            </div>
                            <div id="input field" class="col-8">
                                <input type="text" class="search-bar" placeholder="SEARCH" style="width: 400px; text-indent: 10px;">
                            </div>
                        </div>

                    </div>`

                    document.querySelector('.search-bar').addEventListener('change', function (e) {
                        pokemonSearch(e.target.value)
                    })
                }
            }
        })
        .catch((err) => {
            throw new Error("404")
        })
}
document.querySelector('.search-bar').addEventListener('change', function (e) {
    pokemonSearch(e.target.value)
})
//=====================================================================POKEDEX=======================================================================

fetch("https://pokeapi.co/api/v2/pokemon?limit=251")
    .then(resp => resp.json())
    .then(data => {
        Promise.all(data.results.map(pokemon => {
            return (fetch(pokemon.url))
                .then(resp => resp.json())
                .then(data => data)
        }))
            .then(results => {
                results.forEach(data => {
                    document.querySelector('#pokedexSprites').innerHTML += `<div>
                        
                            <h1>${data.id}: <button class=pokeButton value=${data.name}>${data.name}</button><img src=${data.sprites.front_default}></img></h1>
                        
                    </div>`
                })
                let gridButtons = document.querySelectorAll('button.pokeButton');
                let gridButtonItems = [].slice.call(gridButtons);

                gridButtonItems.forEach(function (item) {
                    item.addEventListener('click', function () {
                        pokemonSearch(item.value);
                    });
                });
            });
    })
    .catch(error => console.log(error))

//=====================================================================AUDIO PLAYER=======================================================================

window.addEventListener("load", () => {

    let audio = new Audio ("https://vgmsite.com/soundtracks/pokemon-firered-leafgreen-music-super-complete/uskaensvpu/21%20Pok%C3%A9mon%20Center.mp3"),
        aPlay = document.getElementById("aPlay"),
        aPlayIco = document.getElementById("aPlayIco"),
        aNow = document.getElementById("aNow"),
        aTime = document.getElementById("aTime"),
        aSeek = document.getElementById("aSeek"),
        aVolume = document.getElementById("aVolume"),
        aVolIco = document.getElementById("aVolIco");
  
    aPlay.onclick = () => {
      if (audio.paused) { audio.play(); }
      else { audio.pause(); }
    };
  
    audio.autoplay = true;
    audio.loop = true;
    audio.onplay = () => { aPlayIco.innerHTML = "pause"; };
    audio.onpause = () => { aPlayIco.innerHTML = "play_arrow"; };
  
    let timeString = (secs) => {
      let ss = Math.floor(secs),
          hh = Math.floor(ss / 3600),
          mm = Math.floor((ss - (hh * 3600)) / 60);
      ss = ss - (hh * 3600) - (mm * 60);
  
      if (hh>0) { mm = mm<10 ? "0"+ mm : mm; }
      ss = ss<10 ? "0"+ss : ss;
      return hh>0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}` ;
    };
  
    audio.onloadstart = () => {
      aNow.innerHTML = "Loading";
      aTime.innerHTML = "";
    };
  
    audio.onloadedmetadata = () => {
      aNow.innerHTML = timeString(0);
      aTime.innerHTML = timeString(audio.duration);
  
      aSeek.max = Math.floor(audio.duration);
  
      let aSeeking = false;
      aSeek.oninput = () => { aSeeking = true; };
      aSeek.onchange = () => {
        audio.currentTime = aSeek.value;
        if (!audio.paused) { audio.play(); }
        aSeeking = false;
      };

      audio.ontimeupdate = () => {
        if (!aSeeking) { aSeek.value = Math.floor(audio.currentTime); }
        aNow.innerHTML = timeString(audio.currentTime);
      };
    };

    aVolume.onchange = () => {
      audio.volume = aVolume.value;
      aVolIco.innerHTML = (aVolume.value==0 ? "volume_mute" : "volume_up");
    };
  
    audio.oncanplaythrough = () => {
      aPlay.disabled = false;
      aVolume.disabled = false;
      aSeek.disabled = false;
    };
    audio.onwaiting = () => {
      aPlay.disabled = true;
      aVolume.disabled = true;
      aSeek.disabled = true;
    };
  });