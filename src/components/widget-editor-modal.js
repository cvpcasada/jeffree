import React from "react";
import EditorState from "./state-provider";
import CodeEditor from "./code-editor";
import RealModeChanger from "./mode-changer";
import LivePreviewControls from "./live-preview-controls";
import LivePreview from "./live-preview";
import CustomPropsPreview from "./custom-props-preview";

import styled from "styled-components";

import SplitPane from "./split-pane";

import EventSelector from "./event-selector";
import _pickRandom from "pick-random";
import randomInt from "random-int";

const pickRandom = val => _pickRandom(val)[0];

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
    margin-left: 1rem;
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

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }

`;

const ComponentArea = styled.div`
  flex-grow: 1;
  margin: 1rem;
  margin-left: 0;
`;

function generateEvent(type) {
  switch (type) {
    case "sponsor":
    case "follower":
      return { username: `a ${type}`, timestamp: Date.now() };
    case "subscriber":
      return {
        username: `a ${type}`,
        timestamp: Date.now(),
        method: {
          plan: pickRandom([1000, 2000, 3000]),
          prime: pickRandom([true, false])
        }
      };
    case "resubscriber":
      return {
        username: `a ${type}`,
        months: randomInt(12)
      };
    case "cheer":
      return {
        username: `a ${type}er`,
        amount: pickRandom([100, 200, 500, 1000, 1500, 2500]),
        message: `This is where a ${type}er message usually goes`
      };
    case "raid":
    case "host":
      return {
        username: `a ${type}er`,
        viewers: randomInt(100) + 1
      };

    case "superchat":
    case "tip":
      return {
        username: `a ${type}er`,
        amount: randomInt(1000) + 1,
        currency: "$",
        message: `This is where a ${type}er message usually goes`,
        ...(type === "superchat" ? { tier: `super-chat tier` } : {})
      };
    default:
      return {
        username: `a ${type}er`
      };
  }
}

export default class WidgetEditorModal extends React.Component {
  state = {
    code: {
      html: "<div>{widgetText}</div>",
      js: `
loadScript('https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js').then((Vue) => {
    renderWidget();
});
    `,
      css: `
        background-color: {background};
        color: {foreground};
      `,
      json: `
      {
        "foreground": "red",
        "background": {
          "type": "dropdown",
          "options": ["green", "blue", "violet"],
            "value": "green"
        },
        "widgetText": {
          "type": "text",
          "value": "hello world"
        }
      }
      `
    },
    events: [],
    mode: "js",
    customProps: [],
    refreshCounter: 0,
    livePreview: true
  };

  handleTriggerEvent = type => 
    this.setState(state => ({
      events: state.events.concat({ type, ...generateEvent(type) })
    }));

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
    const { mode, livePreview, refreshCounter } = this.state;
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
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <SplitPane minWidth="150">
              <CodeEditor />
              {livePreview && (
                <PreviewSection>
                  <h1>Preview</h1>
                  <ComponentArea>
                    {mode !== "json" && <LivePreview key={refreshCounter} />}
                    {mode === "json" && <CustomPropsPreview />}
                  </ComponentArea>

                  <EventSelector onChange={this.handleTriggerEvent} />
                </PreviewSection>
              )}
            </SplitPane>
            <LivePreviewControls
              onVisible={this.handleLivePreview}
              onRefresh={() =>
                this.setState(state => ({
                  refreshCounter: ++state.refreshCounter
                }))
              }
            />
          </div>
        </EditorState>
      </EditorWrap>
    );
  }
}
