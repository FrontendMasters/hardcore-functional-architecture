const {List} = require('immutable-ext')
// Monoid = Semigroup + Identity

const Product = x =>
({
  x,
  concat: other =>
    Product(x * other.x)
})
Product.empty = () => Product(1)

const Sum = x =>
({
  x,
  concat: other =>
    Sum(x + other.x)
})
Sum.empty = () => Sum(0)

const Any = x =>
({
  x,
  concat: other =>
    Any(x || other.x)
})

Any.empty = () => Any(false)

const All = x =>
({
  x,
  concat: other =>
    All(x && other.x)
})

All.empty = () => All(true)

const Intersection = x =>
({
  x,
  concat: other =>
    Intersection(_.intersection(x, other.x))
})

Intersection([1,2,3,4]).concat(Intersection([12,3,4,5]))



const res = List([true, true, false]).foldMap(All, All.empty())

console.log(res)