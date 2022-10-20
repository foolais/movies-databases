const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
  const inputKeyword = document.querySelector(".input-keyword");
  fetch("http://www.omdbapi.com/?apikey=f88a7afb&s=" + inputKeyword.value)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let cards = "";
      movies.forEach((m) => (cards += showCard(m)));
      const moviesContainer = document.querySelector(".movies-container");
      moviesContainer.innerHTML = cards;

      //   clik modal details movies
      const moviesModalDetails = document.querySelectorAll(
        ".movies-modal-details"
      );
      moviesModalDetails.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbid = this.dataset.imdbid;
          console.log(imdbid);
          fetch("http://www.omdbapi.com/?apikey=f88a7afb&i=" + imdbid)
            .then((response) => response.json())
            .then((res) => {
              const movieDetail = showMovieDetails(res);
              const modalBody = document.querySelector(".modal-body");
              modalBody.innerHTML = movieDetail;
            })
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

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
