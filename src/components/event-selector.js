import React from "react";
import styled from "styled-components";
import fn from "../utils/fn";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { Value } from "react-powerplug";

const EventOptions = ["follower", "subscriber", "resubscriber", "tip", "cheer", "host", "raid"];

const EventsDropdown = styled(Dropdown)`
    margin: 1rem;
    margin-left: 0;

  .ed-menu {
    background: #2d303a;
    border: 1px solid #333641;
    top: initial;
    bottom: 100%;

    .Dropdown-option {
        color: #fff;

        &:hover, &.is-selected {
            background: #6959C7;
        }
    }
  }

  .ed-control {
    background: #2d303a;
    border: 1px solid #333641;
  }
  .ed-placeholder {
    color: #fff;
  }
`;

export default ({ onChange = fn }) => (
  <Value>
    {({ value, set }) => (
      <EventsDropdown
        value={value}
        onChange={selection => {
          set(selection);
          onChange(selection.value);
        }}
        options={EventOptions}
        controlClassName="ed-control"
        placeholderClassName="ed-placeholder"
        menuClassName="ed-menu"
        placeholder={"Select an Event to Trigger"}
      />
    )}
  </Value>
);
