/**
 * 工具函数
 * @author 李嘉辉
 * @since 2019/1/20.
 */
import moment from "moment";
import eventBus from "./event";

// 存储todo-list
export function setTodoList(value) {
  const todoList = getTodoList();
  if (todoList) {
    todoList.push(value);
    localStorage.setItem("todo_list", JSON.stringify(todoList));
  } else {
    localStorage.setItem("todo_list", JSON.stringify([value]));
  }
}

// 读取todo-list
export function getTodoList() {
  const res = localStorage.getItem("todo_list");
  const todoList = res ? JSON.parse(res) : null;
  return todoList;
}

// 更新todoList
export function refreshTodoList(todoList) {
  if (todoList && Array.isArray(todoList)) {
    localStorage.setItem("todo_list", JSON.stringify(todoList));
  }
}

// 删除todoItem
export function delTodoItem(key) {
  const todoList = getTodoList();
  if (todoList && Array.isArray(todoList)) {
    for (let i = 0; i < todoList.length; i++) {
      const { id } = todoList[i];
      if (id === key) {
        todoList.splice(i, 1);
        // 更新todoList
        refreshTodoList(todoList);
        break;
      }
    }
  }
  // 删除元素后更新状态
  eventBus.emit("changeTodoList");
}

// 获取代办事项数量
export function getPendingNum(list) {
  const todoList = list || getTodoList();
  let num = 0;
  if (todoList && Array.isArray(todoList)) {
    todoList.forEach(value => {
      const { done } = value;
      if (!done) num++;
    });
  }
  return num;
}

// 获取代办事项列表
export function getPendingList(list) {
  const todoList = list || getTodoList();
  if (todoList && Array.isArray(todoList)) {
    return todoList.filter(value => {
      return !value.done;
    });
  }
  return [];
}

// 获取已完成事项数量
export function getCompletedNum(list) {
  const todoList = list || getTodoList();
  return todoList.length - getPendingNum(todoList);
}

// 获取已完成事项列表
export function getCompletedList(list) {
  const todoList = list || getTodoList();
  if (todoList && Array.isArray(todoList)) {
    return todoList.filter(value => {
      return value.done;
    });
  }
  return [];
}

// 改变状态
export function markChangeStatus(key, value) {
  const todoList = getTodoList();
  if (todoList && Array.isArray(todoList)) {
    for (let i = 0; i < todoList.length; i++) {
      const { id } = todoList[i];
      if (id === key) {
        todoList[i].done = value;
        // 记录用户操作
        const recordItem = {
          type: value
            ? "change status to completed"
            : "change status to pending",
          time: moment().format("YYYY/MM/DD hh:mm:ss")
        };
        todoList[i].record.push(recordItem);
        // 更新todoList
        refreshTodoList(todoList);
        break;
      }
    }
    // 删除元素后更新状态
    eventBus.emit("changeTodoList");
  }
}

// 更新Title
export function updateTitle(key, value) {
  const todoList = getTodoList();
  if (todoList && Array.isArray(todoList)) {
    for (let i = 0; i < todoList.length; i++) {
      const { id } = todoList[i];
      if (id === key) {
        todoList[i].title = value;
        // 记录用户操作
        const recordItem = {
          type: "change title",
          time: moment().format("YYYY/MM/DD hh:mm:ss")
        };
        todoList[i].record.push(recordItem);
        // 更新todoList
        refreshTodoList(todoList);
        break;
      }
    }
    // 删除元素后更新状态
    eventBus.emit("changeTodoList");
  }
}

// 排序
export function sortList(type, sourceIndex, destinationIndex) {
  const todoList = getTodoList();
  const pendingList = getPendingList(todoList);
  const completedList = getCompletedList(todoList);
  const sourceKey =
    type === "pending"
      ? pendingList[sourceIndex].id
      : completedList[sourceIndex].id;
  const destinationKey =
    type === "pending"
      ? pendingList[destinationIndex].id
      : completedList[destinationIndex].id;
  let source = 0;
  let destination = 0;
  todoList.forEach((value, index) => {
    const { id } = value;
    if (id === sourceKey) {
      source = index;
    } else if (id === destinationKey) {
      destination = index;
    }
  });
  const [removed] = todoList.splice(source, 1);
  todoList.splice(destination, 0, removed);
  refreshTodoList(todoList);
  eventBus.emit("changeTodoList");
}
