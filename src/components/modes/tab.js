import React from "react";
import styled from 'styled-components';

import CssIcon from "./css-icon";
import HtmlIcon from "./html-icon";
import JsIcon from "./js-icon";
import JsonIcon from "./json-icon";

export const Modes = {
  html: {
    icon: <HtmlIcon />,
    text: "HTML"
  },
  js: {
    icon: <JsIcon />,
    text: "JAVASCRIPT"
  },
  css: {
    icon: <CssIcon />,
    text: "CSS"
  },
  json: {
    icon: <JsonIcon />,
    text: "WIDGET PROPS"
  }
};

export const Tab = styled.button.attrs({
  type: "button",
  style: props =>
    props.isSelected ? { borderBottom: "0.2em solid #6e6bc1" } : {}
})`
  font-family: "Open Sans", sans-serif;
  line-height: 1.15;
  margin: 0;
  overflow: visible;
  text-transform: none;
  -webkit-appearance: button;
  border: 0;
  background: none;
  color: #fff;

  cursor: pointer;
  padding: 14px;
  font-size: 17px;

  &:focus {
    outline: none;
    color: #6e6bc1;
  }

  span {
    display: block;
  }

  > :first-child {
    font-weight: 700;
  }

  > :last-child {
    font-size: 0.8em;
    line-height: 0.8em;
  }
`;
