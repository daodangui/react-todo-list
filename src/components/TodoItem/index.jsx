/**
 * 列表单元组件
 * @author 李嘉辉
 * @since 2019/1/20.
 */
import React, { Component } from "react";
import { Checkbox } from "../../common";
import { delTodoItem, markChangeStatus } from "../../utils";
import StatusRecord from "./StatusRecord/index.jsx";
import EditTitle from "./EditTitle/index.jsx";
import "./styles.css";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStatusRecord: false
    };
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleChangeShowRecord = this.handleChangeShowRecord.bind(this);
    this.handleDel = this.handleDel.bind(this);
  }
  // 改变复选框状态
  handleChangeCheckbox(e) {
    const value = e.target.checked;
    const { id } = this.props;
    markChangeStatus(id, value);
  }
  // 展示状态变更记录
  handleChangeShowRecord() {
    const { showStatusRecord } = this.state;
    this.setState({
      showStatusRecord: !showStatusRecord
    });
  }
  // 删除todo item
  handleDel() {
    const { id } = this.props;
    delTodoItem(id);
  }

  render() {
    const { showStatusRecord } = this.state;
    const { title, done, record, id } = this.props;
    return (
      <div className="todoitem-container">
        <div className="todoitem-content">
          <div className="todoitem-checkbox">
            <Checkbox checked={done} onChange={this.handleChangeCheckbox} />
          </div>
          <div className={`todoitem-title ${done ? "todoitem-done" : ""}`}>
            {done ? title : <EditTitle title={title} id={id} />}
          </div>
          <div className="todoitem-action">
            <div onClick={this.handleChangeShowRecord}>
              <i className="iconfont icon-liebiaozhanshi" />
            </div>
            <div onClick={this.handleDel}>
              <i className="iconfont icon-shanchu" />
            </div>
          </div>
        </div>
        <div
          className={`todoitem-des ${
            showStatusRecord ? "showStatusRecord" : ""
          }`}
        >
          {record.map((value, index) => {
            const { type, time } = value;
            return <StatusRecord key={time} value={type} time={time} />;
          })}
        </div>
      </div>
    );
  }
}

export default TodoItem;
