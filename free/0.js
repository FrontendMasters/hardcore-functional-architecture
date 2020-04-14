const {liftF} = require('../lib/free')
const {Id} = require('../lib/types')
const {taggedSum} = require('daggy')

const Http = taggedSum('Http', {Get: ['url'], Post: ['url', 'body']})

const httpGet = (url) => liftF(Http.Get(url))
const httpPost = (url, body) => liftF(Http.Post(url, body))

const app = () =>
  httpGet('/home')
  .chain(contents => httpPost('/analytics', contents))

const interpret = x =>
  x.cata({
    Get: url => Id.of(`contents for ${url}`),
    Post: (url, body) => Id.of(`posted ${body} to ${url}`)
  })

const res = app().foldMap(interpret, Id.of)
console.log(res.extract())