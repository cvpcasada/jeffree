import React from "react";
import { UnControlled as Editor } from "react-codemirror2";
import styled from "styled-components";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

import "codemirror/mode/htmlembedded/htmlembedded";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";

import { CustomWidgetContext } from "./state-provider";

const ModeMap = {
  js: "javascript",
  css: "css",
  html: "htmlmixed"
};


const StyledEditor = styled(Editor)`
  height: 100%;

  .CodeMirror {
    height: 100%;
  }

  .cm-s-material .CodeMirror-gutters,
  .cm-s-material.CodeMirror {
    background: rgb(31, 35, 44);
  }

`

export default function CodeEditor() {
  return (
    
      <CustomWidgetContext.Consumer>
        {({ code, mode, onCodeChange }) => {
          return (
            <StyledEditor
              key={mode}
              detach
              value={code[mode]}
              options={{
                mode: ModeMap[mode],
                lineNumbers: true,
                theme: "material"
              }}
              onChange={(editor, data, value) => {
                onCodeChange(value);
              }}
            />
          );
        }}
      </CustomWidgetContext.Consumer>
  );
}
