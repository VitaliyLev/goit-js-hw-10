
// fetchCountries(name)
// https://restcountries.com/v3.1/name/{name}
// https://restcountries.com/v3.1/name/peru
// https://restcountries.com/v3.1/name/united


// function fetchImages(page) {
//   return fetch(
//     `https://pixabay.com/api/?key=4823621-792051e21e56534e6ae2e472f&q=sun&page=${page}&per_page=20`
//   )
//     .then(res => res.json())
//     .then(data => ({ images: data.hits, total: data.totalHits }));
// }

function fetchCountries(name) {
    return fetch(
        `https://restcountries.com/v3.1/name/{name}`
    )
        .then(response => response.json())
        .then (data => console.log(data));
}