import React from 'react';
import styled from 'styled-components';

const TextInput = styled.input`
  margin: 10px;
  border: 1px solid transparent;
  border-bottom-color: #636363;
  line-height: 33px;
  padding: 0 10px;
  font-size: 15px;
`;

const InputText = props => {
  const { id, placeholder, value, onChange } = props;
  return (
    <TextInput
      id={id}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputText;
