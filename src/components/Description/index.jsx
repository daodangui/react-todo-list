/**
 * 标题描述组件
 * @author 李嘉辉
 * @since 2019/1/20.
 */
import React, { Component } from "react";
import "./styles.css";

function Description(props) {
  const { title, number } = props;
  return (
    <div className="description">
      <div>{title}</div>
      <div>total {number} items</div>
    </div>
  );
}

export default Description;
