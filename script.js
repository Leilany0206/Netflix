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

    if (response.status === 200) {
        aux.forEach(movie => {
            console.log(movie.title);
        });
    }

    } catch(error){
        console.log(error)
    }
}

function slideMaker(type) {
    let movie = getMovies(type);

    for (let i = 0; i < 15; i++) {
        let newMovie = []
        newMovie.push(movie[i]);

        console.log(newMovie)
    }
}

getMovies(popular);
getMovies(romance);


/* METODO CON THEN
axios.get("https://api.themoviedb.org/3/movie/popular?api_key=e2463b079580c4d4aed3af119a1e0c2e")
.then((response) => {
    console.log(response.data.results)
})
.catch((error) => {
    console.log(error)
});
*/