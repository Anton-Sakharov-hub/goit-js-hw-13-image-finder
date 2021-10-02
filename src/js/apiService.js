
export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.KEY = "23625456-d4d8c01a3246ecf4be3c91fb4";
    }

    async fetchImg() {
        return fetch(`https://pixabay.com/api/?https://pixabay.com/api/?&q=${this.searchQuery.trim()}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12&key=${this.KEY}`)
            .then(async response => {
            this.incrementPage();
                const serverResponse = (await response.json());
                console.log(serverResponse);

            if (serverResponse.total === 0) throw new Error("Ошибка!");
            return serverResponse;
        });
        
    }

    incrementPage() {
        this.page += 1;
    }

    resetPages() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}




