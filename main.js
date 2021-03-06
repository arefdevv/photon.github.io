const auth = "563492ad6f91700001000001c84723fce83d46c993eddb350985e0bc";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-bar");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more-btn");
let page = 1;
let fetchLink;
let currentSearch;

// "https://api.pexels.com/v1/curated?per_page=15&page=1",

// event listener:

more.addEventListener("click", loadMore);

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
    clearSearch();
});

//functions

const clear = () => {
    gallery.innerHTML = "";
    searchInput.value = "";
};

function updateInput(e) {
    searchValue = e.target.value;
}

const generatePics = (data) => {
    data.photos.forEach((photo) => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <div class = "gallery-info">
            <p>${photo.photographer}</p>
            <a href = ${photo.src.original} target = "_blank">Download</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(galleryImg);
    });
};

//aysnc functions

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth,
        },
    });
    const data = await dataFetch.json();
    return data;
}

async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatePics(data);
}

async function searchPhotos(query) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    generatePics(data);
}

async function loadMore() {
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePics(data);
}

curatedPhotos();
