import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import infoCountryMarcupFunction from './template/countryInfoMarkup.hbs';
import listCountryMarcupFunction from './template/countryListMarkup.hbs';
import fetchCountries from './template/fetchCountries.js';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

ref = {
  inputSearch: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

function inputSearchClick(e) {
  e.preventDefault();
  const inputValue = e.target.value.trim();

  ref.countryList.innerHTML = '';
  ref.countryInfo.innerHTML = '';

  if (inputValue === '') {
    return;
  }

  fetchCountries(inputValue)
    .then(response => {
      if (response.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (response.length === 1) {
        cardInfoMarkup(response);
        return;
      }

      if (response.length >= 2) {
        updateMarkup(response);
      }
    })
    .catch(errorIputValue);
}

ref.inputSearch.addEventListener(
  'input',
  debounce(inputSearchClick, DEBOUNCE_DELAY)
);

function updateMarkup(dataArrayMarkup) {
  const markup = dataArrayMarkup
    .map(
      ({ name, flags }) =>
        `<li>
            <img class="country__item--flag" src="${flags.png}" width="35px" alt="Flag of${name.common}">
            <span class="country__item--name">${name.common}</span>
       </li>`
    )
    .join('');

  ref.countryList.insertAdjacentHTML('beforeend', markup);
}

function cardInfoMarkup(dataArrayMarkup) {
  const markup = dataArrayMarkup
    .map(
      ({ name, flags, population, languages, capital }) =>
        `<ul>
        <li>
          <img
            class="country__item--flag"
            src="${flags.png}"
            width="35px"
            alt="Flag of${name.common}"
          />
          <span class="country__item--name">${name.common}</span>
        </li>
        <li> <span class="country__cap">Capital:</span> ${capital}</li>
        <li> <span class="country__pop">Population:</span> ${population}</li>
        <li> <span class="country__lang">Languages:</span> ${Object.values(
          languages
        )}</li>
      </ul>`
    )
    .join('');

  ref.countryInfo.insertAdjacentHTML('beforeend', markup);
}

function errorIputValue() {
  Notify.failure('Oops, there is no country with that name');
}
