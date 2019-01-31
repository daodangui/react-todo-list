/**
 * 可编辑文本组件
 * @author 李嘉辉
 * @since 2019/1/20.
 */
import React, { Component } from "react";
import { updateTitle } from "../../../utils";
import "./styles.css";

class EditTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      showInput: false
    };
    this.handleRenderInput = this.handleRenderInput.bind(this);
    this.handleEditTitle = this.handleEditTitle.bind(this);
    this.handleShowInput = this.handleShowInput.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  componentDidMount() {
    const { title } = this.props;
    this.setState({ title });
  }

  handleShowInput() {
    this.setState({
      showInput: true
    });
  }

  handleHideInput() {
    this.setState({
      showInput: false
    });
  }

  handleEditTitle(e) {
    const title = e.target.value;
    this.setState({
      title
    });
  }
  // 更新数据
  handleInputBlur() {
    const { id } = this.props;
    const { title } = this.state;
    if (title) {
      this.handleHideInput();
      updateTitle(id, title);
    } else {
      window.alert("title不可为空");
      this.input.focus();
    }
  }

  handleRenderInput() {
    const { title } = this.state;
    return (
      <div className="editTitle-input">
        <input
          ref={el => (this.input = el)}
          autoFocus
          type="text"
          value={title}
          onChange={this.handleEditTitle}
          onBlur={this.handleInputBlur}
          placeholder="what needs to be done?"
        />
      </div>
    );
  }

  handleRenderTitle() {
    const { title } = this.state;
    return <div onClick={this.handleShowInput}>{title}</div>;
  }

  render() {
    const { showInput } = this.state;
    return (
      <div>
        {showInput ? this.handleRenderInput() : this.handleRenderTitle()}
      </div>
    );
  }
}

export default EditTitle;
