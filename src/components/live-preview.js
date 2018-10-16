import React from "react";
import ErrorCatcher from "./error-catcher";
import { CustomWidgetContext } from "./state-provider";

export default function LivePreview() {
  return (
    <CustomWidgetContext.Consumer>
      {({ error, onComponentError, element = null }) =>
        !error && (
          <ErrorCatcher onError={onComponentError}>{element}</ErrorCatcher>
        )
      }
    </CustomWidgetContext.Consumer>
  );
}
