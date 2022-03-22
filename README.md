# krypto-api-sdk

## Install

`
  $ npm install krypto-api-sdk
  $ yarn add krypto-api-sdk
`

## Usage

'''
const Krypto  = require('krypto-api-sdk')

const apiKey = 'api key'
const client = new Krypto(apiKey)

client.getTags().then(console.log).catch(console.error)
client.getLatest(0, 100).then(console.log).catch(console.error)

'''
