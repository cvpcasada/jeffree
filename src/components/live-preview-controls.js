import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faEye, faBook, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import fn from '../utils/fn';

const ControlWrap = styled.div`
    margin: 0.5rem;
    position: absolute;
    right: 0;
    z-index: 2;
`;

const ControlBtn = styled.button.attrs({type: 'button'})`
    cursor: pointer;
    font-size: 12pt;
    color: #555;
    background: none;
    border: 0; 
    transition: color 0.2s ease;
    
    :hover {
        color: #fff;
    }
`

function LivePreviewControls({onRefresh = fn, onVisible = fn, onLaunchDocs = fn}) {
  return <ControlWrap>
    <ControlBtn onClick={onRefresh}>
        <Icon icon={faSyncAlt} />
    </ControlBtn>
    <ControlBtn onClick={onVisible}>
        <Icon icon={faEye} />
    </ControlBtn>
    <ControlBtn onClick={onLaunchDocs}>
        <Icon icon={faBook} />
    </ControlBtn>

  </ControlWrap>;
}

export default LivePreviewControls;
