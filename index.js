'use strict'

const fetch = require('node-fetch')
const qs = require('qs')

const BASE_URL = 'https://api.krypto.mn'

class Krypto {

     constructor (apiKey, { fetcher = fetch, config = {} } = {}) {
        this.apiKey = apiKey
        this.config = Object.assign({}, {
          method: 'GET',
          headers: {
            'X-CMC_PRO_API_KEY': this.apiKey,
            Accept: 'application/json',
            'Accept-Charset': 'utf-8',
            'Accept-Encoding': 'deflate, gzip'
          }
        }, config)
    
        this.fetcher = fetcher
        this.url = `${BASE_URL}`
    }

    getGainers (start, limit) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/listings/gainers`,
            config: this.config,
            query: { start, limit }
        })
    }

    getRecent (start, limit) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/listings/recent`,
            config: this.config,
            query: { start, limit }
        })
    }

    getLatest (start, limit) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/listings/latest`,
            config: this.config,
            query: { start, limit }
        })
    }

    getTags () {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/tag`,
            config: this.config,
        })
    }

    getMetricsQuotes () {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/metrics/quotes/latest`,
            config: this.config,
        })
    }

    getNews (start, limit) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/news/latest`,
            config: this.config,
            query: { start, limit }
        })
    }

    getFearGreed () {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/metrics/fear-and-greed`,
            config: this.config,
        })
    }

    getInfo (slug) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/info`,
            config: this.config,
            query: { slug }
        })
    }

    getMarketPairs (slug) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/market-pairs/latest`,
            config: this.config,
            query: { slug }
        })
    }

    getExchangeListings (start, limit) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/exchange/listings/latest`,
            config: this.config,
            query: { start, limit }
        })
    }

    getSingleNews (slug) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/news`,
            config: this.config,
            query: { slug }
        })
    }
    
    getFiatMap (start, limit) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/fiat/map`,
            config: this.config,
            query: { start, limit }
        })
    }

    getCryptoMap (start, limit) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/map`,
            config: this.config,
            query: { start, limit }
        })
    }

    getTrending (start, limit) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/listings/trending`,
            config: this.config,
            query: { start, limit }
        })
    }

    getConvertion (symbol, allSymbols) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/tools/convertion-rates?symbol=${symbol}&convert=${allSymbols}`,
            config: this.config,
        })
    }
}

const createRequest = (args = {}) => {
    const { url, config, query, fetcher } = args

    console.log("url")
    console.log(`${url}${query ? `?${qs.stringify(query)}` : ''}`)

    return fetcher(`${url}${query ? `?${qs.stringify(query)}` : ''}`, config).then(res =>
        res.json()  
    )
}

module.exports = Krypto