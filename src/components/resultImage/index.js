import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { zenburn } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Vibrant from 'node-vibrant';
import styled from 'styled-components';
import ImageRatio from '../imageRatio';
import PropTypes from 'prop-types';

const Width100 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionContainer = styled.div`
  width: 30%;
`;

const ResultImage = props => {
  const { src, ratio } = props;
  const [dominantColor, setDominantColor] = React.useState('');

  Vibrant.from(src)
    .getPalette()
    .then(function(palette) {
      const vibrantColor = palette.Vibrant.hex;
      console.log(palette);
      setDominantColor(vibrantColor);
    });

  const returnImageString =
    '<div style="padding-bottom:' +
    ratio +
    '%;background-color:' +
    dominantColor +
    ';position:relative;width:100%;">\n\t<img style="position:absolute;width:100%;" src="' +
    src +
    '" />\n</div>';

  return (
    <Width100>
      <SectionContainer>
        <ImageRatio
          backgroundColor={dominantColor}
          findBackgroundColor={false}
          calcRatio={false}
          ratio={ratio}
          src={src}
        />
      </SectionContainer>
      <SyntaxHighlighter language="javascript" style={zenburn}>
        {returnImageString}
      </SyntaxHighlighter>
    </Width100>
  );
};

ResultImage.defaultProps = {
  src: '',
  ratio: ''
};

ResultImage.propTypes = {
  src: PropTypes.string,
  ratio: PropTypes.string
};

export default ResultImage;
