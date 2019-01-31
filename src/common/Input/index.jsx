/**
 * Input
 * @author 李嘉辉
 * @since 2019/1/20.
 */
import React, { Component } from "react";
import "./styles.css";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="input-box">
        <input className="additem-input" type="text" {...this.props} />
      </div>
    );
  }
}

export default Input;
