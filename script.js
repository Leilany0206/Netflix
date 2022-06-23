let popular = "https://api.themoviedb.org/3/movie/popular";
let romance =
  "https://api.themoviedb.org/3/discover/movie?api_key=af1b76109560756a2450b61eff16e738&with_genres=10749";

let billboardContainer = document.getElementById("billboardContainer");
let billboardTitle = document.getElementById("billboardTitle");
let billboardDesc = document.getElementById("billboardDesc");
let carouselContainer = document.querySelector(".carouselContainer");
let moviePage = document.getElementById("moviePage");
let moviePageTitle = document.getElementById("moviePageTitle");
let moviePageDesc = document.getElementById("moviePageDesc");
let moviePageInt = document.getElementById("moviePageInt");
let moviePageActor = document.getElementById("moviePageActor");
let actorPageMovies = document.getElementById("actorPageMovies");
let popularBox = document.getElementById("popular");
let romanceBox = document.getElementById("romance");

// EVENT CLOSE LOGO
function closeWindow(box) {
  console.log(box);
  box.style.visibility = "hidden";
}

// EVENT ACTOR MOVIES
function actor(id) {
  let actorMovies = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=e2463b079580c4d4aed3af119a1e0c2e`;

  const getSetActor = async () => {
    try {
      const response = await axios.get(actorMovies, {
        params: {
          language: "es-MX",
        },
      });

      let aux = response.data.cast;
      let auxMovie = "";

      if (response.status === 200) {
        for (let i = 0; i < 5; i++) {
          auxMovie += `<div class="movieActor" id=${aux[i].id} onclick="showMovie(${aux[i].id})"><img src="https://image.tmdb.org/t/p/w500${aux[i].poster_path}" class="posterActor" alt="" onclick="open"></div>`;
          actorPageMovies.innerHTML = auxMovie;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  getSetActor();
}

actor(4958);

//EVENT MOVE ARROW
function moveArrowRight() {
    carouselContainer.scrollLeft += carouselContainer.offsetWidth;
}

function moveArrowLeft() {
    carouselContainer.scrollLeft -= carouselContainer.offsetWidth;
}

// EVENT CLICK MOVIE SHOW
function showMovie(id) {
  moviePage.style.visibility = "visible";

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

        auxImg += `<div id="moviePageImg"><img src="https://image.tmdb.org/t/p/w1280${aux.backdrop_path}"></div>`;
        moviePageInt.innerHTML += auxImg;
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
        console.log(auxActor)
        moviePageActor.innerHTML = auxActor;
      }

      // let auxActorFinal = `<span>más...</span>`;
      // moviePageActor.innerHTML = auxActorFinal;
    } catch (error) {
      console.log(error);
    }
  };

  getSet(); 
  getSetCast();
}

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
        auxMovie += `<div class="movie" id=${aux[i].id} onclick="showMovie(${aux[i].id})"><img src="https://image.tmdb.org/t/p/w500${aux[i].backdrop_path}" class="poster" alt="" onclick="open"></div>`;
        box.innerHTML = auxMovie;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

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
