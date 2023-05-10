

class fetchCountrie {
    constructor() {
        this.BASE_URL = "https://restcountries.com/v3.1/name/"
    }


     fetchCountries(query) {
        const url = `${this.BASE_URL}${query}`
        return fetch(url)
        .then(r => r.json())
        .then(countrie => {return countrie})

        
    }



}

export default fetchCountrie