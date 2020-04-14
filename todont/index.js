import {renderApp} from './ui'
import {Fn, FnT} from '../lib/types'
import {over, lensProp, remove, append} from 'ramda'
const App = FnT(Fn)

const L = { habits: lensProp('habits') }

const Merge = x =>
({
  x,
  concat: other =>
    Merge(Object.assign({}, x, other.x))
})

const create = App(habit =>
  Fn.ask.map(over(L.habits, append(habit)))
).map(Merge)

const destroy = App(({idx}) =>
  Fn.ask.map(over(L.habits, remove(idx, 1)))
).map(Merge)

const setShowPage = App.of({page: 'show'}).map(Merge)

const setIndex = App(({idx}) => Fn.of({index: idx})).map(Merge)

const view = setIndex.concat(setShowPage)

const route = {create, destroy, view}

const appLoop = (state) =>
  renderApp(state, (action, payload) =>
    appLoop(
      Merge(state)
      .concat(route[action].run(payload).run(state))
      .x
    )
  )

appLoop({page: 'list', habits: []})