/**
 * Button
 * @author 李嘉辉
 * @since 2019/1/20.
 */
import React from "react";
import "./styles.css";

function Button(props) {
  const { onClick, children } = props;
  return (
    <div>
      <button className="additem-add" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default Button;
