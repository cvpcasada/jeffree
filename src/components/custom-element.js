import React from "react";
import styled from "styled-components";
import fn from "../utils/fn";

const parseBars = (obj, str) =>
  str.replace(/{\s*([\w\.]+)\s*}/g, (tag, match) => obj[match] || tag);

function attemptParse(json, str) {
  try {
    return parseBars(JSON.parse(json), str);
  } catch (e) {
    return str;
  }
}

class CustomElement extends React.Component {
  static defaultProps = {
    events: [],
    onInitialize: fn,
    onUpdate: fn
  };

  containerRef = { current: null };

  componentDidMount() {
    console.log('mounting element');
    this.props.onInitialize(this.containerRef.current, this.props.events);
  }

  componentDidUpdate(prevProps) {
    if (this.props.events !== prevProps.events)
      this.props.onUpdate(this.containerRef.current, this.props.events);
  }

  render() {
    let { className, html, json } = this.props;

    return (
      (
        <div
          ref={ref => (this.containerRef.current = ref)}
          className={className}
          dangerouslySetInnerHTML={{ __html: attemptParse(json, html) }}
        />
      )
    );
  }
}

export default styled(CustomElement)`
  ${props => attemptParse(props.json, props.css)};
`;
