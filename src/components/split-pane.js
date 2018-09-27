import React from "react";

import styled from "styled-components";

const Panels = styled.div`
  display: flex;
  flex-grow: 1;
`;

const DraggableSplitter = styled.div`
  background: red;
  cursor: col-resize;
  width: 0.2rem;
`;

export default class SplitPane extends React.Component {
  pane1Ref = React.createRef();

  state = {
    resizing: false,
    pane1Width: undefined
  };

  handleMouseUp = () => {
    this.setState({ resizing: false });
  };

  handleMouseMove = e => {
    if (this.state.resizing) {
      const paneRect = this.pane1Ref.current.getBoundingClientRect();
      const newWidth = e.clientX - paneRect.left;

      if (this.props.minWidth && this.props.minWidth > newWidth) return;

      this.setState({ pane1Width: newWidth });
    }
  };

  handleMouseDown = e => {
    e.preventDefault();
    this.setState({ resizing: true });
    return false;
  };

  render() {
    const children = React.Children.toArray(this.props.children);

    return (
      <Panels
        className={this.props.className}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      >
        <div
          style={
            this.state.pane1Width
              ? { width: `${this.state.pane1Width}px` }
              : { width: "50%" }
          }
          ref={this.pane1Ref}
          onMouseDown={e => e.preventDefault}
        >
          {children[0]}
        </div>
        <DraggableSplitter
          className={this.props.splitterClassName}
          onMouseDown={this.handleMouseDown}
        />
        <div style={{ flexGrow: 1 }}>{children[1]}</div>
      </Panels>
    );
  }
}
