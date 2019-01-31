/**
 * 功能页面
 * @author 李嘉辉
 * @since 2019/1/20.
 */
import React, { Component } from "react";
import { CurrentDate, AddItem, Description, DragDrop } from "../../components";
import eventBus from "../../utils/event";
import {
  getTodoList,
  getPendingNum,
  getCompletedNum,
  getPendingList,
  getCompletedList
} from "../../utils";
import "./styles.css";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    };
    this.handleChangeTodoList = this.handleChangeTodoList.bind(this);
  }

  componentDidMount() {
    // 注册监听事件，监听todolist变化
    eventBus.on("changeTodoList", this.handleChangeTodoList);
    this.handleInitTodoList();
  }
  // 初始化todolist
  handleInitTodoList() {
    const todoList = getTodoList();
    if (todoList) {
      this.setState({
        todoList
      });
    }
  }
  // 更新todolist变化
  handleChangeTodoList() {
    this.handleInitTodoList();
  }

  handleRenderPendingList() {
    const { todoList } = this.state;
    const pendingList = getPendingList(todoList);
    return (
      <div>
        <Description
          title="List of pending items"
          number={getPendingNum(todoList)}
        />
        <DragDrop
          type="pending"
          dataList={pendingList}
          droppableId="droppable"
        />
      </div>
    );
  }

  handleRenderCompletedList() {
    const { todoList } = this.state;
    const completedList = getCompletedList(todoList);
    return (
      <div>
        <Description
          title="Completed task list"
          number={getCompletedNum(todoList)}
        />
        <DragDrop
          type="completed"
          dataList={completedList}
          droppableId="droppableCompleted"
        />
      </div>
    );
  }

  handleRenderNoData() {
    return (
      <div className="nodata">
        <div>You have no todos.</div>
      </div>
    );
  }

  render() {
    const { todoList } = this.state;
    return (
      <div className="content">
        <CurrentDate />
        <AddItem />
        {getPendingNum(todoList)
          ? this.handleRenderPendingList()
          : this.handleRenderNoData()}
        {!!getCompletedNum(todoList) && this.handleRenderCompletedList()}
      </div>
    );
  }
}

export default Content;
