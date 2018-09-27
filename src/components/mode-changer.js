import React from "react";
import { CustomWidgetContext } from "./state-provider";

import { Tab, Modes } from './modes/tab';

export default function ModeChanger({className, style}) {
  return (
    <CustomWidgetContext.Consumer>
      {({ mode, onModeChange }) => (
        <div className={className} style={style}>
          {Object.entries(Modes).map(([key, val]) => (
            <Tab key={key} isSelected={mode === key} onClick={() => onModeChange(key)}>
              {val.icon}
              <span>{val.text}</span>
            </Tab>
          ))}
        </div>
      )}
    </CustomWidgetContext.Consumer>
  );
}
