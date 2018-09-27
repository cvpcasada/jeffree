import React from 'react';

export default class ErrorCatcher extends React.Component {
  static defaultProps = {
    onError: () => {}
  };
  state = {
    error: undefined
  };
  z;
  componentDidCatch(error, info) {
    this.setState({ error });

    this.props.onError(
      this.props.errorMessage || "Error occured while trying to render preview, please see console for details"
    );
  }

  render() {
    return !this.state.error && this.props.children;
  }
}