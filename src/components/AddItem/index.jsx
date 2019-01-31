/**
 * 添加todo
 * @author 李嘉辉
 * @since 2019/1/20.
 */
import React, { Component } from "react";
import moment from "moment";
import { Input, Button } from "../../common";
import { setTodoList } from "../../utils";
import eventBus from "../../utils/event";
import "./styles.css";

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChangeValue(e) {
    const value = e.target.value;
    this.setState({
      value
    });
  }

  handleAdd() {
    const { value } = this.state;
    if (value) {
      const todoItem = {
        id: Date.now(),
        title: value,
        done: false,
        record: [
          {
            type: "create time",
            time: moment().format("YYYY/MM/DD hh:mm:ss")
          }
        ]
      };
      setTodoList(todoItem);
      eventBus.emit("changeTodoList");
      this.setState({
        value: ""
      });
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div className="additem-content">
        <div>
          <Input value={value} onChange={this.handleChangeValue} />
        </div>
        <div>
          <Button onClick={this.handleAdd}>Add</Button>
        </div>
      </div>
    );
  }
}

export default AddItem;
