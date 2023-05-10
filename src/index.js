import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from './fetchCountries'

const fetchCountrie = new API

const refs = {
    input: document.querySelector("#search-box"),
    countryList: document.querySelector(".country-list"),
    countryInfo: document.querySelector(".country-info")
}

const DEBOUNCE_DELAY = 300;


refs.input.addEventListener("input", debounce(searchCountries, DEBOUNCE_DELAY))

function searchCountries(e) {
    e.preventDefault()
   const query = e.target.value
    if (query.length < 1) {
        refs.countryList.textContent = ""
    }
   
 if (query.length > 1) {
     fetchCountrie.fetchCountries(query)
     .then(r => {
        if (r.length > 1) {
            createMarkup(r)
        }else {
            markupOne(r)
        }
     } )
     .catch(error => Notiflix.Notify.failure(`Такой страны не cуществует`), refs.countryList.textContent = "")
     
 } else {Notiflix.Notify.info("Введите еще символы")}

}



 
function markup(countries) {
    return (
       countries.map(countrie => `
        <li>  
            <img src=${countrie.flags.svg} width=20px heigth=30px> 
            ${countrie.name.common}</li>`)
            .join("") 
    )
} 

function createMarkup(countries) {
    refs.countryList.innerHTML = markup(countries)
}




function createMarkupOne(countries) {
    return (
        countries.map(countrie => `
         <li>  
             <img src=${countrie.flags.svg} width=20px heigth=30px> 
             ${countrie.name.common}</li>
            <li> <span class = "spans"> Capital:</span> ${countrie.capital}</li>
            <li> <span class = "spans"> Population:</span> ${countrie.population}</li>
            <li> <span class = "spans"> Languages:</span> ${Object.values(countrie.languages)}</li>
             `)
             .join("") 
     )
}


function markupOne(countries) {
    refs.countryList.innerHTML = createMarkupOne(countries)
}