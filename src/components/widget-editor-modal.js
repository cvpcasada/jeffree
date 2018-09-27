import React from 'react';
import EditorState from './state-provider';
import CodeEditor from './code-editor';
import RealModeChanger from './mode-changer';
import LivePreviewControls from './live-preview-controls';
import LivePreview from './live-preview';
import CustomPropsPreview from './custom-props-preview';

import styled from 'styled-components';

import SplitPane from './split-pane';

const EditorWrap = styled.div`
  display: flex;
  flex-direction: column;
  background: #2d3039;
  font-family: sans-serif;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  > * {
    flex: 1;
  }

  h1 {
    font-size: 18px;
    font-weight: 400;
    color: white;
  }
`;

const ModeChanger = styled(RealModeChanger)`
  display: inline-block;
  text-align: center;

  white-space: nowrap;
`;

const PreviewSection = styled.div`
  background: rgb(31, 35, 44);
  height: 100%;
`;

export default class WidgetEditorModal extends React.Component {
  state = {
    code: {
      html: '<div>hello world</div>',
      js: `
loadScript('https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js').then((Vue) => {
    renderWidget();
});
    
    `,
      css: '',
      json: ''
    },
    events: [],
    mode: 'js',
    customProps: [],

    livePreview: true
  };

  handleCodeChange = code =>
    this.setState(state => ({
      code: { ...state.code, [state.mode]: code }
    }));

  handleModeChange = mode => {
    this.setState({ mode });
  };

  handleLivePreview = () =>
    this.setState(state => ({ livePreview: !state.livePreview }));

  render() {
    const { mode, livePreview } = this.state;
    return (
      <EditorWrap>
        <EditorState
          {...this.state}
          onCodeChange={this.handleCodeChange}
          onModeChange={this.handleModeChange}
        >
          <Header>
            <h1>Custom Widget Editor</h1>
            <ModeChanger />
            <span>&nbsp;</span>
          </Header>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <SplitPane minWidth="150">
              <CodeEditor />
              {livePreview && (
                <PreviewSection>
                  {mode !== 'json' && <LivePreview />}
                  {mode === 'json' && <CustomPropsPreview />}
                </PreviewSection>
              )}
            </SplitPane>
            <LivePreviewControls onVisible={this.handleLivePreview} />
          </div>
        </EditorState>
      </EditorWrap>
    );
  }
}
