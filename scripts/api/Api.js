export default class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url
    }

    async get() {
        return fetch(this._url)
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.error('an error occurs', err))
    }
}

class itemsApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url)
    }

    async getìtems() {
        return await this.get()
    }
}
