/**
 * Checkbox
 * @author 李嘉辉
 * @since 2019/1/20.
 */
import React, { Component } from "react";
import "./styles.css";

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { checked = false, onChange } = this.props;
    return (
      <div className="checkbox-container">
        <label
          className={`iconfont checkbox-default ${
            checked ? "checkbox-checked" : ""
          }`}
        >
          <input type="checkbox" checked={checked} onChange={onChange} />
        </label>
      </div>
    );
  }
}

export default Checkbox;
