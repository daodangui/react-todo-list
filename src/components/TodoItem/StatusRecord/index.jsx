/**
 * 状态变更记录组件
 * @author 李嘉辉
 * @since 2019/1/20.
 */
import React from "react";
import "./styles.css";

function StatusRecord(props) {
  const { value, time } = props;
  return (
    <div className="statusreacord">
      <div>{value}</div>
      <div>{time}</div>
    </div>
  );
}

export default StatusRecord;
