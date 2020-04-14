const {toUpper, view, over, lensProp, compose} = require('ramda')

const L = {
  _0: lensProp(0),
  name: lensProp('name'),
  street: lensProp('street'),
  address: lensProp('address')
}

const users = [{address: {street: {name: 'Maple'}}}]
const addrStreetName = compose(L._0, L.address, L.street, L.name)
const res = over(addrStreetName, toUpper, users)
console.log(res[0])

