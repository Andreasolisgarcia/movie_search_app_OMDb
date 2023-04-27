import { apiKey, films } from "./apikey.js";

// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("movies.json");
const movies = await reponse.json();

// Ajout du listener pour l'input dela bar de recherche
const btnSearch = document.getElementById("button-addon4");
btnSearch.addEventListener("click", function () {
  // Get the user's query
  const userInput = document.getElementById("movie-search-box").value;
  loadMovies(userInput);
});

// load movies from API
async function loadMovies(search) {
  //const inputURL = search.split(" ").join("+");
  const URL = `https://omdbapi.com/?s=${search}&page=1&apikey=${apiKey}`;
  console.log(URL);
  const response = await fetch(`${URL}`);
  const data = await response.json();
  console.log(data.Search);
  if (data.Response == "True") displayMovieList(data.Search);
}
// const titleTreatment = (title) => {
//     let titleLength = title.titleLength
//     let newTitle =
// }

const displayMovieList = (arrayFilms) => {
  const sectionFilms = document.querySelector(".films");

  // Clear any existing content in the section
  sectionFilms.innerHTML = "";

  // Loop through each movie object in the array
  arrayFilms.forEach((movie) => {
    // Create a new card element
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", movie["Poster"]);
    imageElement.setAttribute("alt", movie["Title"]);

    cardElement.appendChild(imageElement);

    const cardBodyElement = document.createElement("div");
    cardBodyElement.classList.add("card-body");

    const titleElement = document.createElement("h5");
    titleElement.classList.add("card-title");
    titleElement.innerHTML = movie["Title"].substring(0, 20);

    cardBodyElement.appendChild(titleElement);

    const pElement = document.createElement("p");
    pElement.classList.add("card-text");
    pElement.innerText = "Year: " + movie["Year"];

    // Create card footer element
    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "d-flex", "justify-content-end");

    // Create button element and append it to the card footer
    const btnElement = document.createElement("button");
    btnElement.classList.add("btn", "btn-primary");
    btnElement.textContent = "More";
    cardFooter.appendChild(btnElement);

    cardBodyElement.appendChild(pElement);

    cardElement.appendChild(cardBodyElement);

    cardElement.appendChild(cardFooter);

    sectionFilms.appendChild(cardElement);

     // Add click event listener to the button
     btnElement.addEventListener("click", () => {
        // Create a modal element
        const modalElement = document.createElement("div");
        modalElement.classList.add("modal", "fade");
  
        // Create modal dialog element and append it to the modal
        const modalDialogElement = document.createElement("div");
        modalDialogElement.classList.add("modal-dialog", "modal-sm");
        modalElement.appendChild(modalDialogElement);
  
        // Create modal content element and append it to the modal dialog
        const modalContentElement = document.createElement("div");
        modalContentElement.classList.add("modal-content");
        modalDialogElement.appendChild(modalContentElement);
  
        // Create modal header element and append it to the modal content
        const modalHeaderElement = document.createElement("div");
        modalHeaderElement.classList.add("modal-header");
        modalHeaderElement.innerHTML = `
          <h6 class="modal-title">${movie["Title"]}</h6>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        `;
        modalContentElement.appendChild(modalHeaderElement);
  
        // Create modal body element and append it to the modal content
        const modalBodyElement = document.createElement("div");
        modalBodyElement.classList.add("modal-body");
        modalBodyElement.innerHTML = `
          <img src="${movie["Poster"]}" alt="${movie["Title"]}" class="img-fluid">
          <p>${movie["Plot"]}</p>
          <p><strong>Director:</strong> ${movie["Director"]}</p>
          <p><strong>Actors:</strong> ${movie["Actors"]}</p>
          <p><strong>Genre:</strong> ${movie["Genre"]}</p>
        `;
        modalContentElement.appendChild(modalBodyElement);
  
    
        // Create modal footer element and append it to the modal content
        const modalFooterElement = document.createElement("div");
        modalFooterElement.classList.add("modal-footer");
        modalFooterElement.innerHTML = `
            <a href="https://www.imdb.com/title/${movie["imdbID"]}" target="_blank" class="btn btn-primary">View on IMDB</a>
        `;
        modalContentElement.appendChild(modalFooterElement);

        // Append the modal to the document body
        document.body.appendChild(modalElement);

        // Show the modal
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        const closeButton = document.querySelector('.btn-close');
        closeButton.addEventListener('click', () => {
        modal.hide();
        });
     });
  });
};

displayMovieList(movies);



