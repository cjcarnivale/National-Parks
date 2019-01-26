'use strict';
/*global $*/

const api_key = 'IIwKvgVyokkngr9dQP4DXTYHTiIWMx2yJ5PHF2L';
const BASE_URL = 'https://api.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  console.log(queryItems); 
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson); 
  $('.results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('.results-list').append(
      `<div class="results-wrapper">
      <h3 for="park name and link"><a href='${responseJson.data[i].url}'>${responseJson.data[i].name}</a></h3>
      <p for="park description">${responseJson.data[i].description}</p>
      </div>`
    );}
}

function getParks(query, limit=10) {
  const params = {
    api_key: api_key,
    stateCode: query,
    limit,
  };
  
  const queryString = formatQueryParams(params);
  const url = BASE_URL + '?' + queryString;
  console.log(url); 

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('.js-error-msg').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('.js-parks-search-form').on( 'submit', function(event) {
    event.preventDefault();
    const searchTerm = $('.js-state-select').val(); 
    const limit = ($('.js-number-input').val() - 1);
    getParks( searchTerm, limit );
  });
}

$(watchForm);