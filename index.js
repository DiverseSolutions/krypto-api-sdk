'use strict'

const fetch = require('node-fetch')
const qs = require('qs')

// const BASE_URL = 'https://api.krypto.mn'

class Krypto {

     constructor (BASE_URL, { fetcher = fetch, config = {} } = {}) {
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

    // id: [], slug, symbol
    getCryptoQuotesLatest (query) {
        let customQuery = query.id ? {id: query.id.join(',')} : query

        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/quotes/latest`,
            config: this.config,
            query: customQuery
        })
    }

    // id: [], slug, symbol
    getCryptoMarketPairsLatest (query) {
        let customQuery = query.id ? {id: query.id.join(',')} : query
        
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/market-pairs/latest`,
            config: this.config,
            query: customQuery
        })
    }

    // start, limit
    getCryptoMap (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/map`,
            config: this.config,
            query
        })
    }

    // start, limit
    getFiatMap (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/fiat/map`,
            config: this.config,
            query
        })
    }

    // start, limit
    getCryptoListingsLatest (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/listings/latest`,
            config: this.config,
            query
        })
    }

    // start, limit
    getCryptoListingsTrending (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/listings/trending`,
            config: this.config,
            query
        })
    }

    // start, limit
    getCryptoListingsGainers (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/listings/gainers`,
            config: this.config,
            query
        })
    }

    // start, limit
    getCryptoListingsRecent (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/listings/recent`,
            config: this.config,
            query
        })
    }

    getCryptoTag (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/tag/map`,
            config: this.config,
            query: query
        })
    }

    // id: [], slug, symbol
    getCryptoInfo (query) {
        let customQuery = query.id ? {id: query.id.join(',')} : query
        
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/cryptocurrency/info`,
            config: this.config,
            query: customQuery
        })
    }

    getMetricsQuotesLatest (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/metrics/quotes/latest`,
            config: this.config,
            query: query
        })
    }

    getMetricsFearAndGreed (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/metrics/fear-and-greed`,
            config: this.config,
            query: query
        })
    }

    // symbol, convert
    getToolsConversionRates (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/tools/conversion-rates`,
            config: this.config,
            query: query
        })
    }

    // id, slug
    getExchangeInfo (query) {
        let customQuery = query.id ? {id: query.id.join(',')} : query

        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/exchange/info`,
            config: this.config,
            query: customQuery
        })
    }

    // start, limit
    getExchangeListingsLatest (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/exchange/listings/latest`,
            config: this.config,
            query
        })
    }

    // id, slug, start, limit
    getExchangeMarketPairs (query) {
        let customQuery = query.id ? {id: query.id.join(',')} : query

        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/exchange/market-pairs/latest`,
            config: this.config,
            query: customQuery
        })
    }

    // start, limit
    getNews (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/news/latest`,
            config: this.config,
            query
        })
    }

    // slug, tag, start, limit
    getSingleNews (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/news`,
            config: this.config,
            query
        })
    }

    // slug, tag, start, limit
    getNewsSearch (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/news/search`,
            config: this.config,
            query: query
        })
    }

    // start, limit
    getNewsTag (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/news/tag/map`,
            config: this.config,
            query: query
        })
    }

    // slug, id
    getNewsTagInfo (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/news/tag/info`,
            config: this.config,
            query: query
        })
    }

    // start, limit
    getAdCategoryMap (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/ad/category/map`,
            config: this.config,
            query: query
        })
    }

    // slug, id, symbol, category, limit
    getAdAssetLatest (query) {
        return createRequest({
            fetcher: this.fetcher,
            url: `${this.url}/ad/asset/latest`,
            config: this.config,
            query: query
        })
    }
}

const createRequest = (args = {}) => {
    const { url, config, query, fetcher } = args

    return fetcher(`${url}${query ? `?${qs.stringify(query)}` : ''}`, config).then(res =>
        res.json()  
    )
}

module.exports = Krypto