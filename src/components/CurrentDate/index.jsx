/**
 * 显示当前日期时间
 * @author 李嘉辉
 * @since 2019/1/20.
 */
import React from "react";
import moment from "moment";
import "./styles.css";

function CurrentDate() {
  return (
    <div className="currentDate-content">
      <div>{moment().format("dddd")}</div>
      <div>{moment().format("YYYY-MM-DD")}</div>
    </div>
  );
}

export default CurrentDate;
