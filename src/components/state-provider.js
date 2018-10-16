import React from "react";

import { transpile as _transpile } from "../utils/transpile";
import { loadScript, loadScripts } from "../utils/load-script";
import CustomElement from "./custom-element";
import fn from "../utils/fn";

export const initProps = {
  code: { html: "", js: "", css: "" },
  events: [],
  customProps: []
};

const actions = {
  onCodeChange: () => {},
  onModeChange: () => {}
};

export const CustomWidgetContext = React.createContext({
  ...initProps,
  ...actions
});

export default class CustomWidgetStateProvider extends React.Component {
  static defaultProps = { ...initProps, ...actions };
  state = {
    element: undefined,
    error: undefined
  };

  scopeFunctions = {
    loadScript,
    loadScripts,
    setInitializeCallback: cb => this.setState({ initialize: cb }),
    setUpdateCallback: cb => this.setState({ update: cb }),
    render: Element => {
      this.setState({
        element: (
          <CustomWidgetContext.Consumer>
            {({ events }) =>
              typeof Element === "function" ? (
                <Element events={events} />
              ) : (
                React.cloneElement(Element, {
                  ...Element.props,
                  events
                })
              )
            }
          </CustomWidgetContext.Consumer>
        )
      });
    },
    renderWidget: (onInitialize = fn, onUpdate = fn) => {
      this.setState({
        element: (
          <CustomWidgetContext.Consumer>
            {({ events, code: { html, css, json } }) => (
              <CustomElement
                html={html}
                css={css}
                json={json}
                events={events}
                onInitialize={onInitialize}
                onUpdate={onUpdate}
              />
            )}
          </CustomWidgetContext.Consumer>
        )
      });
    }
  };

  getCustomProps = () => {
    try {
      return JSON.parse(this.props.code.json);
    } catch (e) {
      return {};
    }
  };

  handleComponentError = error => this.setState({ error });

  handleCodeChange = codeText => {
    const { mode } = this.props;

    // always update the code state regardless of errors so users can
    // correct it later
    this.props.onCodeChange(codeText);

    if (mode === "js") {
      // transpile code so we can generate the element
      this.transpile(codeText);
    }
  };

  transpile = jsCode => {
    try {
      this.setState({ element: undefined, error: undefined });

      // run js
      _transpile(jsCode, {
        ...this.scopeFunctions,
        customProps: this.getCustomProps()
      });

      this.setState({ error: undefined });
    } catch (error) {
      this.setState({ error: error.toString() });
    }
  };

  componentDidMount() {
    const { code } = this.props;
    this.transpile(code.js);
  }

  // componentDidUpdate(prevProps) {
  //   if (
  //     prevProps.mode !== this.props.mode ||
  //     prevProps.code.html !== this.props.code.html ||
  //     prevProps.code.css !== this.props.code.css
  //   ) {
  //     this.transpile(this.props.code.js);
  //   }
  // }

  render() {
    const {
      children,
      code,
      mode,
      events,
      customProps,
      onModeChange
    } = this.props;

    const { element, error } = this.state;

    return (
      <CustomWidgetContext.Provider
        value={{
          code,
          mode,
          events,
          customProps,
          onModeChange,
          onCodeChange: this.handleCodeChange,
          onComponentError: this.handleComponentError,
          element,
          error
        }}
      >
        {children}
      </CustomWidgetContext.Provider>
    );
  }
}
