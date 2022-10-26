const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch (err) {
    alert(err);
  }
});

// get movies data
function getMovies(key) {
  return fetch("http://www.omdbapi.com/?apikey=f88a7afb&s=" + key)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((res) => {
      if (res.Response === "False") {
        throw new Error(res.Error);
      }
      return res.Search;
    })
    .catch((err) => console.log(err));
}

// update UI
function updateUI(movies) {
  let cards = "";
  movies.map((m) => (cards += showCard(m)));
  const moviesContainer = document.querySelector(".movies-container");
  moviesContainer.innerHTML = cards;
}

// event binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("movies-modal-details")) {
    const imdbid = e.target.dataset.imdbid;
    const moviesDetail = await getMoviesDetails(imdbid);
    updateUIMovieDetail(moviesDetail);
  }
});

// get movies details
function getMoviesDetails(id) {
  return fetch("http://www.omdbapi.com/?apikey=f88a7afb&i=" + id)
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.log(err));
}

// update UI Movies Detail
function updateUIMovieDetail(detail) {
  const movieDetail = showMovieDetails(detail);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

const showCard = (item) => {
  return `
    <div class="col-md-3 col-sm-6 my-3">
        <div class="card">
        <img src="${item.Poster}" class="card-img-top" />
        <div class="card-body">
            <h5 class="card-title">${item.Title}</h5>
            <h6 class="card-subtitle text-muted mb-3">${item.Year}</h6>
            <a href="#" class="btn btn-primary movies-modal-details" data-bs-toggle="modal"
            data-bs-target="#moviesDetailsModal" data-imdbid="${item.imdbID}">Show Detais</a>
        </div>
        </div>
    </div>`;
};

const showMovieDetails = (item) => {
  return `
    <div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
        <img src="${item.Poster}" class="img-fluid" />
        </div>
        <div class="col-md">
        <ul class="list-group">
            <li class="list-group-item"><h4>${item.Title}</h4></li>
            <li class="list-group-item">
            <strong>Director : </strong>${item.Director}
            </li>
            <li class="list-group-item">
            <strong>Actor : </strong>${item.Actors}
            </li>
            <li class="list-group-item">
            <strong>Released : </strong>${item.Released}
            </li>
            <li class="list-group-item">
            <strong>Genre : </strong>${item.Genre}
            </li>
            <li class="list-group-item">
            <strong>Plot : </strong>${item.Plot}
            </li>
        </ul>
        </div>
    </div>
    </div>
    `;
};
