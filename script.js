const getMovies = async() => {
    try {
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=e2463b079580c4d4aed3af119a1e0c2e")

    console.log(response);

    } catch(error){
        console.log(error)
    }
}

getMovies();


/* METODO CON THEN
axios.get("https://api.themoviedb.org/3/movie/popular?api_key=e2463b079580c4d4aed3af119a1e0c2e")
.then((response) => {
    console.log(response.data.results)
})
.catch((error) => {
    console.log(error)
});
*/