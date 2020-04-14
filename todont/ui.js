import React, {useEffect} from "react";
import ReactDOM from "react-dom";

const Item = ({name, onView, onDestroy}) =>
  <li>
    <div className="view">
      <label onClick={onView}>
        {name}
      </label>
      <button className="destroy" onClick={onDestroy} />
    </div>
  </li>

const Show = ({habit, dispatch}) =>
  <div>Showing {habit.name}</div>

const List = ({habits, dispatch}) =>
  <div>
    <input
      className="toggle-all"
      type="checkbox"
      />
      <ul className="todo-list">
        {habits.map((habit, idx) =>
            <Item key={idx} name={habit.name} onDestroy={() => dispatch('destroy', {idx})} onView={() => dispatch('view', {idx})} />
        )}
      </ul>
  </div>

const App = ({state, dispatch}) =>
    <div>
    <header className="header">
    <h1>Todont</h1>
    <input
        className="new-todo"
        placeholder="What needs to stop?"
        onKeyDown={e => e.key === 'Enter' ? dispatch('create', {name: e.currentTarget.value}) : undefined}
        autoFocus={true}
    />
    </header>
    <section className="main">
      {state.page === 'list' ? <List habits={state.habits} dispatch={dispatch} /> : <Show habit={state.habits[state.index]} />}
    </section>
    </div>

const renderApp = (state, dispatch) => {
  const app = <App state={state} dispatch={dispatch} />
  ReactDOM.render(app, document.getElementById('app'))
}

export {renderApp}