import React from 'react';
import styled from 'styled-components';
import Vibrant from 'node-vibrant';
import { calculateRatio, openFile } from '../../utils';

const ImageContainer = styled.div`
  position: relative;
  padding-bottom: ${({ ratio }) => ratio}%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: 100%;
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
`;

const ImageRatio = props => {
  const {
    findBackgroundColor,
    backgroundColor,
    calcRatio,
    ratio,
    src,
    alt
  } = props;
  const [dominantColor, setDominantColor] = React.useState(backgroundColor);
  const [colorSelected, setColorSelected] = React.useState(false);
  const [ratioCalc, setRatioCalc] = React.useState('');
  const [ratioCalcolated, setRatioCalcolated] = React.useState(false);

  if (backgroundColor && !findBackgroundColor && !colorSelected) {
    setDominantColor(backgroundColor);
    setColorSelected(true);
  }

  if (findBackgroundColor && !colorSelected) {
    Vibrant.from(src)
      .getPalette()
      .then(function(palette) {
        const vibrantColor = palette.Vibrant.hex;
        setDominantColor(vibrantColor);
      });
    setColorSelected(true);
  }

  if (calcRatio && !ratioCalcolated) {
    openFile(src, e => {
      console.log(e);
      setRatioCalc(calculateRatio(e.width, e.height));
      setRatioCalcolated(true);
    });
  } else if (ratio && !ratioCalcolated) {
    setRatioCalc(ratio);
    setRatioCalcolated(true);
  }

  return (
    <ImageContainer
      findBackgroundColor={findBackgroundColor}
      backgroundColor={dominantColor}
      ratio={ratioCalc}
    >
      <Image alt={alt} src={src} />
    </ImageContainer>
  );
};

export default ImageRatio;
