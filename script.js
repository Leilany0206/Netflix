let slidePopular = document.getElementById("popular");

let popular = "https://api.themoviedb.org/3/movie/popular"
let romance = "https://api.themoviedb.org/3/discover/movie?api_key=af1b76109560756a2450b61eff16e738&with_genres=10749"

const getMovies = async(type) => {
    try {
    const response = await axios.get(type, {
        params: {
            api_key: "e2463b079580c4d4aed3af119a1e0c2e",
            language: "es-MX"
        }
    })

    let aux = response.data.results;
    const movie = new Map();

    if (response.status === 200) { 
        for (let i = 0; i < 15; i++) {
            movie.set(aux[i].title, aux[i].poster_path)
        }
    }

    return(movie);

    } catch(error){
        console.log(error)
    }
}

const setMovies = (type) => {
    let auxMovie = "";
    for(let [title, poster] of getMovies(`${type}`)) {
        auxMovie += `<div class="movie"><img src="https://image.tmdb.org/t/p/w500${poster}" class="poster" alt=""></div>`
        console.log(title)
        console.log("FUNCIONA EN TEORÍA")
    }
    let auxDoc = document.getElementById(`${type}`);
    auxDoc.innerHTML = auxMovie
}

// getMovies(popular);
// setMovies(popular);

function prueba(type) {
    console.log(getMovies(type))
}

prueba(popular)


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
*/
