import React from "react";
import ReactDOM from "react-dom";
import Counter from "./containers/counter";
import { Provider } from "react-redux";
import configureStore from './store/configureStore';

import "./styles.css";

const store = configureStore();

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  rootElement
);
