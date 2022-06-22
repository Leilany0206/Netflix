let popular = "https://api.themoviedb.org/3/movie/popular"
let romance = "https://api.themoviedb.org/3/discover/movie?api_key=af1b76109560756a2450b61eff16e738&with_genres=10749"

let billboardContainer = document.getElementById("billboardContainer");
let billboardTitle = document.getElementById("billboardTitle");
let billboardDesc = document.getElementById("billboardDesc");
let moviePage = document.getElementById("moviePage");
let popularBox = document.getElementById("popular");
let romanceBox = document.getElementById("romance");

// CLOSE LOGO 
function close(box) {
    box.style.visibility = "hidden";
}

const setBillboard = async() => {
    try {
        const response = await axios.get(popular, {
            params: {
                api_key: "e2463b079580c4d4aed3af119a1e0c2e",
                language: "es-MX"
            }
        })

        let aux = response.data.results;
        let auxImg = "";
        let auxTitle = "";
        let auxDesc = "";

        if (response.status === 200) {
            auxImg += `<img src="https://image.tmdb.org/t/p/original${aux[0].backdrop_path}" alt="" id="billImg">`
            billboardContainer.innerHTML = auxImg;
            
            auxTitle += `${aux[0].title}`
            billboardTitle.innerHTML = auxTitle;

            auxDesc += `${aux[0].overview}`
            billboardDesc.innerHTML = auxDesc;
        }

    } catch(error){
        console.log(error)
    }
}

setBillboard();

const getMovies = async(type, box) => {
    try {
    const response = await axios.get(type, {
        params: {
            api_key: "e2463b079580c4d4aed3af119a1e0c2e",
            language: "es-MX"
        }
    })

    let aux = response.data.results;
    let auxMovie = "";

    if (response.status === 200) { 
        for (let i = 0; i < 15; i++) {
            auxMovie += `<div class="movie" id=${aux[i].id}><img src="https://image.tmdb.org/t/p/w500${aux[i].backdrop_path}" class="poster" alt="" onclick="open"></div>`
            box.innerHTML = auxMovie;
        }
    }

    } catch(error){
        console.log(error)
    }
}

getMovies(popular, popularBox);
getMovies(romance, romanceBox);

/* METODO CON THEN
axios.get("https://api.themoviedb.org/3/movie/popular?api_key=e2463b079580c4d4aed3af119a1e0c2e")
.then((response) => {
    console.log(response.data.results)
})
.catch((error) => {
    console.log(error)
});
*/

/*
for (let i = 0; i < 15; i++) {
    let newMovie = []
    newMovie.push(movie[i]);

    console.log(newMovie)
}

let aux = response.data.results;
    if (getStatus(type) === 200) {
        for (let i = 0; i < 15; i++) {
            let newMovie = []
            newMovie.push(aux[i]);
        
            console.log(newMovie)
    }

const getStatus = async(type) => {
    try {
    const response = await axios.get(type, {
        params: {
            api_key: "e2463b079580c4d4aed3af119a1e0c2e",
            language: "es-MX"
        }
    })

    let aux = response.status
    return aux;

    } catch(error){
        console.log(error)
    }
}


        for(let [title, poster] of movieMap) {
        auxMovie += `<div class="movie"><img src="https://image.tmdb.org/t/p/w500${poster}" class="poster" alt=""></div>`
        return title
    }

    let auxMovie = "";
        for(let [id, title] of getMovies(`${type}`)) {
            auxMovie += `<div class="movie"><img src="https://image.tmdb.org/t/p/w500${poster}" class="poster" alt=""></div>`
        }
        let auxDoc = document.getElementById(`${type}`);
        auxDoc.innerHTML = auxMovie
    }
*/