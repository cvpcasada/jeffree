import React from "react";
import { CustomWidgetContext } from "./state-provider";

export function CustomPropsParser({
  children = ({ json }) => <div>{JSON.stringify(json)}</div>,
  renderError = ({ error }) => error
}) {
  return (
    <CustomWidgetContext.Consumer>
      {({ code, error }) => {
        try {
          return !error && children(JSON.parse(code.json));
        } catch(error) {
          return renderError({error: error.toString()});
        }
      }}
    </CustomWidgetContext.Consumer>
  );
}

export default function CustomPropsPreview(props) {
  return <CustomPropsParser />
};
