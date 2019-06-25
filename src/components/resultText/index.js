import React from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste, faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faPaste);
library.add(faCheck);

const Result = styled.div`
  margin: 10px;
  border: 1px solid transparent;
  line-height: 33px;
  padding: 5px;
  font-size: 15px;
  background: ${({ clipped }) => (clipped ? '#89d28a' : '#fff')};
  position: relative;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  cursor: pointer;
`;

const IconContainer = styled.span`
  background: #fff;
  display: block;
  width: 31px;
  text-align: center;
  border: 1px solid #666;
  border-radius: 4px;
  line-height: 31px;
  margin-left: 10px;
  color: ${({ clipped }) => (clipped ? '#89d28a' : '#000')};
`;

const ResulText = props => {
  const { value, onClick, clipped } = props;
  return (
    <Result clipped={clipped} onClick={onClick}>
      {value}
      <IconContainer clipped={clipped}>
        <FontAwesomeIcon size="1x" icon={clipped ? 'check' : 'paste'} />
      </IconContainer>
    </Result>
  );
};

export default ResulText;
