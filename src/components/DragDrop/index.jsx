/**
 * 拖拽组件
 * @author 李嘉辉
 * @since 2019/1/20.
 */
import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TodoItem } from "../index";
import { sortList } from "../../utils";
import "./styles.css";

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  background: isDragging ? "lightgreen" : "grey",
  borderRadius: 4,
  marginBottom: 20,
  ...draggableStyle
});

class DragDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { type } = this.props;
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    sortList(type, sourceIndex, destinationIndex);
  }

  render() {
    const { dataList, droppableId } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId={droppableId}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {dataList.map((value, index) => {
                const { id } = value;
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <TodoItem key={id} {...value} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default DragDrop;
