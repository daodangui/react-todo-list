/**
 * My Todo List Manager
 * @author 李嘉辉
 * @since 2019/1/20.
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Content from "./pages/Content";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div className="appName">My Todo List Manager</div>
        <Content />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
