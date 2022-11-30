onload = () => {
    cards();
    plataformas();
  
    document.querySelector("#btn-0").onclick = () => cards();
    document.querySelector("#btn-1").onclick = () => plataformas();
  };


  var url0 =
    "https://api.rawg.io/api/games?page=1&page_size=12&key=2ad893c62f74430c8b83292691172d14";
  async function cards() {
    let str = "";
    let data = await fetch(url0).then((res) => res.json());
    let result = data.results;
    for (let i = 0; i < result.length; i++) {
      const card = result[i];
      str += 
      `<div class="col-12 col-sm-12 col-md-4 col-lg-3 cardjogos">
            <div class="card" style="width: 18rem;">
                <img src="${card.background_image}" class="card-img-top imgcard" alt="imagem card">
                <div class="card-body">
                    <h5 class="card-title">${card.name}</h5>
                    <p class="card-text">Classificação: <span class="float-end">${card.rating}</span></p>
                    <p class="card-text">Data de lançamento: <span class="float-end">${card.released}</span></p>
                    <a href="detalhes.html?${card.id}" class="btn btn-primary"> Mais detalhes </a>
                </div>
            </div>
        </div>`;
        
    }
    url0 = data.next;
    document.getElementById("cards").insertAdjacentHTML("beforeend", str);
  }
  
  var url1 = `https://api.rawg.io/api/platforms?page=1&page_size=6&key=2ad893c62f74430c8b83292691172d14`;
  async function plataformas() {
    let data = await fetch(url1).then((res) => res.json());
    let str = "";
    for (let i = 0; i < data.results.length; i++) {
      const plataforma = data.results[i];
      str += 
      `<div class="col-12 col-sm-4 col-md-6 col-lg-4 cardplat">     
            <div class="card" style="width: 18rem;">
                <img src="${plataforma.image_background}" class="card-img-top forming" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${plataforma.name}</h5>
                    <p class="card-text">
                        <b>Principais jogos</b>
                <ul class="lista">`;
                for (let i = 0; i < 3; i++) {
                    str += `<li>${plataforma.games[i].name}</li>`;
                }
        str += `</ul>
                </p>
                <a href="#" class="btn btn-primary"> Mais detalhes </a>
                </div>
            </div>
        </div>`;
    }
    url1 = data.next;
    document.getElementById("plata").insertAdjacentHTML("beforeend", str);
  }

  fetch('https://api.rawg.io/api/games?page=1&key=2ad893c62f74430c8b83292691172d14')
        .then (res =>res.json())
        .then(data =>{
        let id=window.location.search.slice(1);
        let str=''
                for(let i=0; i<data.results.length; i++){
                    let detalhe=data.results[i]
                    if(detalhe.id==id)
                    str += `<div class="nome_jogo">
                    <h1>${detalhe.name}</h1>
                    </div>
                    <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                    <img class="img-fluid" src="${detalhe.background_image}">
                    </div>
                    <div class="info col-lg-6 col-md-6 col-sm-12">
                        <p> <strong>Rating: ${detalhe.rating}</p> </strong>
                        <p> <strong>Data de Lançamento: ${detalhe.released}</p> </strong>
                        <p> <strong>Plataformas: ${plats(detalhe)} </p> </strong>
                        <p> <strong>Gêneros: ${gen(detalhe)}</p> </strong>
                        <p> <strong>Disponível nas lojas: ${loja(detalhe)}</p> </strong>
                    </div>
                </div>`
                
                }
                document.getElementById('detal').innerHTML=str
            })
            
            function plats(detalhe){
                let str=''
                for(let j=0; j<detalhe.platforms.length; j++){
                    let plataforma=detalhe.platforms[j]
                    str+=`${plataforma.platform.name} `
            }
            return str
        }
        function gen(detalhe){
                let str=''
                for(let j=0; j<detalhe.genres.length; j++){
                    let genero=detalhe.genres[j]
                    str+=`${genero.name} `
            }
            return str
        }
        function loja(detalhe){
                let str=''
                for(let j=0; j<detalhe.stores.length; j++){
                    let loja=detalhe.stores[j]
                    str+=`${loja.store.name} `
            }
            return str
        }