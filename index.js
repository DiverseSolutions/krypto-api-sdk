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

    // id: [], slug: string, symbol: string
    getQuotesLatest (query) {
        let customQuery = query.id ? {id: query.id.join(',')} : query

        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/quotes/latest`,
            config: this.config,
            query: customQuery
        })
    }

    // start: int, limit: int
    getGainers (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/listings/gainers`,
            config: this.config,
            query
        })
    }

    // start: int, limit: int
    getRecent (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/listings/recent`,
            config: this.config,
            query
        })
    }

    // start: int, limit: int
    getLatest (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/listings/latest`,
            config: this.config,
            query
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

    // start: int, limit: int
    getNews (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/news/latest`,
            config: this.config,
            query
        })
    }

    getFearGreed () {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/metrics/fear-and-greed`,
            config: this.config,
        })
    }

    // id: [], slug: string, symbol: string
    getInfo (query) {
        let customQuery = query.id ? {id: query.id.join(',')} : query
        
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/info`,
            config: this.config,
            query: customQuery
        })
    }

    // id: int, slug: int
    getExchangeInfo (query) {
        let customQuery = query.id ? {id: query.id.join(',')} : query

        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/exchange/info`,
            config: this.config,
            query: customQuery
        })
    }

    // id: [], slug: string, symbol: string
    getMarketPairs (query) {
        let customQuery = query.id ? {id: query.id.join(',')} : query
        
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/market-pairs/latest`,
            config: this.config,
            query: customQuery
        })
    }

    // id: [], slug: string, symbol: string
    getExchangeMarketPairs (query) {
        let customQuery = query.id ? {id: query.id.join(',')} : query

        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/exchange/market-pairs/latest`,
            config: this.config,
            query: customQuery
        })
    }

    // start: int, limit: int
    getExchangeListings (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/exchange/listings/latest`,
            config: this.config,
            query
        })
    }

    // slug: string, tag: string
    getSingleNews (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/news`,
            config: this.config,
            query
        })
    }
    
    // start: int, limit: int
    getFiatMap (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/fiat/map`,
            config: this.config,
            query
        })
    }

    // start: int, limit: int
    getCryptoMap (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/map`,
            config: this.config,
            query
        })
    }

    // start: int, limit: int
    getTrending (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/listings/trending`,
            config: this.config,
            query
        })
    }

    // symbol: string, convert: []
    getConvertion (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/tools/convertion-rates`,
            config: this.config,
            query: {
                symbol: query.symbol,
                convert: query.convert.join(',')
            }
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