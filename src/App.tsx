import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./redux/reducer";
import { TodoList } from "./redux/component";
import { TodoList as TodoListMobx } from "./mobx/component";

const store = createStore(reducer);
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div>Redux</div>
        <TodoList />
      </div>
      <div className="App">
        <div>Mobx</div>
        <TodoListMobx />
      </div>
    </Provider>
  );
}

export default App;
