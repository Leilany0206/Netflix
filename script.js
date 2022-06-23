let popular = "https://api.themoviedb.org/3/movie/popular";
let romance = "https://api.themoviedb.org/3/discover/movie?api_key=af1b76109560756a2450b61eff16e738&with_genres=10749";
let crime = "https://api.themoviedb.org/3/discover/movie?api_key=af1b76109560756a2450b61eff16e738&with_genres=80";

let searchInput = document.getElementById("searchInput");
let searchPage = document.getElementById("searchPage");
let searchPageInt = document.getElementById("searchPageInt");
let searchPageText = document.getElementById("searchPageText");
let billboardContainer = document.getElementById("billboardContainer");
let billboardTitle = document.getElementById("billboardTitle");
let billboardDesc = document.getElementById("billboardDesc");
let moviePage = document.getElementById("moviePage");
let moviePageTitle = document.getElementById("moviePageTitle");
let moviePageDesc = document.getElementById("moviePageDesc");
let moviePageInt = document.getElementById("moviePageInt");
let moviePageActor = document.getElementById("moviePageActor");
let actorPageMovies = document.getElementById("actorPageMovies");
let popularBox = document.getElementById("popular");
let romanceBox = document.getElementById("romance");
let crimeBox = document.getElementById("crime");

// Search
function search() {
  let inputOriginal = searchInput.value
  let input = "&query=" + inputOriginal
  let searchLink = `https://api.themoviedb.org/3/search/movie?api_key=af1b76109560756a2450b61eff16e738${input}`
  searchPage.style.visibility = "visible";

  const searchMovie = async () => {
    try {
      const response = await axios.get(searchLink, {
        params: {
          language: "es-MX",
        },
      });

      let aux = response.data.results;
      let auxMessage = "";
      console.log("exo", aux)

      if (response.status === 200) {
        if (aux.length === 0) {
          auxMessage += `<h2>Lo sentimos, parece que "${inputOriginal}" no forma parte del catálogo en este momento</h2>`
          searchPageText.innerHTML = auxMessage;
        } else {
          auxMessage += `<h2>"${inputOriginal}" forma parte del catálogo en este momento :)</h2>`
          searchPageText.innerHTML = auxMessage;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  searchMovie();
}

// EVENT CLOSE LOGO
function closeWindow(box) {
  console.log(box);
  box.style.visibility = "hidden";
}

// EVENT ACTOR MOVIES
function actor(id) {
  let actorMovies = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=e2463b079580c4d4aed3af119a1e0c2e`;
  actorPage.style.visibility = "visible";
  moviePage.style.visibility = "hidden";

  const getSetActor = async () => {
    try {
      const response = await axios.get(actorMovies, {
        params: {
          language: "es-MX",
        },
      });

      let aux = response.data.cast;
      let auxMovie = "";
      console.log("itzy", aux.length)

      if (response.status === 200) {
        for (let i = 0; i < 5; i++) {
          auxMovie += `<div class="movieActor" id=${aux[i].id} onclick="showMovie(${aux[i].id})"><img src="https://image.tmdb.org/t/p/w500${aux[i].poster_path}" class="posterActor" alt=""></div>`;
          actorPageMovies.innerHTML = auxMovie;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  getSetActor();
}

//EVENT MOVE ARROW
function moveArrowRight(cNumber) {
  cNumber.scrollLeft += cNumber.offsetWidth;
}

function moveArrowLeft(cNumber) {
  cNumber.scrollLeft -= cNumber.offsetWidth;
}

// EVENT CLICK MOVIE SHOW
function showMovie(id) {
  moviePage.style.visibility = "visible";
  actorPage.style.visibility = "hidden";

  let show = `https://api.themoviedb.org/3/movie/${id}?api_key=e2463b079580c4d4aed3af119a1e0c2e`;

  const getSet = async () => {
    try {
      const response = await axios.get(show, {
        params: {
          language: "es-MX",
        },
      });

      let aux = response.data;
      let auxTitle = "";
      let auxDesc = "";
      let auxImg = "";
      console.log(aux.title);

      if (response.status === 200) {
        auxTitle += `${aux.title}`;
        moviePageTitle.innerHTML = auxTitle;

        auxDesc += `${aux.overview}`;
        moviePageDesc.innerHTML = auxDesc;

        // auxImg += `<div id="moviePageImg">AHHHHHH</div>`;
        // let moviePageImg = document.getElementById("moviePageImg");
        // moviePageImg.style.backgroundImage=`"url(https://image.tmdb.org/t/p/w1280${aux.backdrop_path})"`;
        // moviePageInt.innerHTML = auxImg;

        moviePageInt.style.backgroundImage=`url(https://image.tmdb.org/t/p/w1280${aux.backdrop_path})`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  let cast = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=e2463b079580c4d4aed3af119a1e0c2e&language=en-US`;

  const getSetCast = async () => {
    try {
      const response = await axios.get(cast, {
        params: {
          language: "es-MX",
        },
      });

      let aux = response.data.cast;
      let auxActor = "";
      console.log(aux);

      if (response.status === 200) {
        for (let i = 0; i < 5; i++) {
          auxActor += `<span class="castMember" onclick="actor(${aux[i].id})">${aux[i].name}, </span>`;
        }
        let auxActorFinal = `<span>más...</span>`;

        console.log(auxActor)
        moviePageActor.innerHTML = auxActor + auxActorFinal;
      }

    } catch (error) {
      console.log(error);
    }
  };

  getSet(); 
  getSetCast();
}

// BILLBOARD
const setBillboard = async () => {
  try {
    const response = await axios.get(popular, {
      params: {
        api_key: "e2463b079580c4d4aed3af119a1e0c2e",
        language: "es-MX",
      },
    });

    let aux = response.data.results;
    let auxImg = "";
    let auxTitle = "";
    let auxDesc = "";

    if (response.status === 200) {
      auxImg += `<img src="https://image.tmdb.org/t/p/original${aux[0].backdrop_path}" alt="" id="billImg">`;
      billboardContainer.innerHTML = auxImg;

      auxTitle += `${aux[0].title}`;
      billboardTitle.innerHTML = auxTitle;

      auxDesc += `${aux[0].overview}`;
      billboardDesc.innerHTML = auxDesc;
    }
  } catch (error) {
    console.log(error);
  }
};

setBillboard();

// CAROUSEL MOVIES
const getMovies = async (type, box) => {
  try {
    const response = await axios.get(type, {
      params: {
        api_key: "e2463b079580c4d4aed3af119a1e0c2e",
        language: "es-MX",
      },
    });

    let aux = response.data.results;
    let auxMovie = "";

    if (response.status === 200) {
      for (let i = 0; i < 15; i++) {
        auxMovie += `<div class="movie" id=${aux[i].id} onclick="showMovie(${aux[i].id})"><img src="https://image.tmdb.org/t/p/w500${aux[i].backdrop_path}" class="poster" alt=""></div>`;
        box.innerHTML = auxMovie;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

getMovies(popular, popularBox);
getMovies(romance, romanceBox);
getMovies(crime, crimeBox);

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
