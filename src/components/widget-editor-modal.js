import React from "react";
import EditorState from "./state-provider";
import CodeEditor from "./code-editor";
import RealModeChanger from "./mode-changer";
import LivePreview from "./live-preview";
import CustomPropsPreview from "./custom-props-preview";

import styled from "styled-components";

import SplitPane from "./split-pane";

const EditorWrap = styled.div`
  display: flex;
  flex-direction: column;
  background: #2d3039;
  font-family: sans-serif;
  height: 100vh;
`;


const Header = styled.div`
  display: flex;
  > * {
    flex-grow: 1
  }
`

const ModeChanger = styled(RealModeChanger)`
  display: inline-block;
  text-align: center;
`

export default class WidgetEditorModal extends React.Component {
  state = {
    code: {
      html: "<div>hello world</div>",
      js: `
loadScript('https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js').then((Vue) => {
    renderWidget();
});
    
    `,
      css: "",
      json: ""
    },
    events: [],
    mode: "js",
    customProps: []
  };

  handleCodeChange = code =>
    this.setState(state => ({
      code: { ...state.code, [state.mode]: code }
    }));

  handleModeChange = mode => {
    this.setState({ mode });
  };

  render() {
    return (
      <EditorWrap>
        <EditorState
          {...this.state}
          onCodeChange={this.handleCodeChange}
          onModeChange={this.handleModeChange}
        >
          <Header>
            <span>Custom Widget Editor</span>
            <ModeChanger />
            <span>&nbsp;</span>
          </Header>
          <SplitPane>
            <CodeEditor />
            {this.state.mode !== "json" ? (
              <LivePreview />
            ) : (
              <CustomPropsPreview />
            )}
          </SplitPane>
        </EditorState>
      </EditorWrap>
    );
  }
}
