import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InputText from './../inputText';

const Form = styled.form`
  min-height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: center;
  align-items: center;
`;

const ResizeCalculation = props => {
  const { width, height } = props;
  const [startWidth, setStartWidth] = React.useState(width);
  const [startHeight, setStartHeight] = React.useState(height);
  const [width2, setWidth2] = React.useState(0);
  const [height2, setHeight2] = React.useState(0);

  const calcHeight2 = (width, height, width2) => {
    const height2 = (width2 * height) / width;
    setHeight2(height2);
  };

  const calcWidth2 = (width, height, height2) => {
    const width2 = (width * height2) / height;
    setWidth2(width2);
  };

  React.useEffect(() => {
    calcHeight2(startWidth, startHeight, width2);
  }, [startWidth, width2]);
  React.useEffect(() => {
    calcWidth2(startWidth, startHeight, height2);
  }, [startHeight, height2]);

  return (
    <Form>
      <Flex>
        <Flex direction="column">
          <InputText
            id="inputwidth"
            placeholder="Width"
            value={startWidth}
            onChange={({ currentTarget: { value } }) => {
              setStartWidth(value);
            }}
          />
          <InputText
            id="inputheight"
            placeholder="Height"
            value={startHeight}
            onChange={({ currentTarget: { value } }) => {
              setStartHeight(value);
            }}
          />
        </Flex>
        <Flex direction="column">
          <InputText
            id="inputwidth2"
            placeholder="Width 2"
            value={width2}
            onChange={({ currentTarget: { value } }) => {
              setWidth2(value);
            }}
          />
          <InputText
            id="inputheight2"
            placeholder="Height 2"
            value={height2}
            onChange={({ currentTarget: { value } }) => {
              setHeight2(value);
            }}
          />
        </Flex>
      </Flex>
    </Form>
  );
};

export default ResizeCalculation;
