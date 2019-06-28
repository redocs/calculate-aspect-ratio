import React from 'react';
import styled from 'styled-components';
import { calculateRatio, copyToClipboard } from './utils';
import InputText from './components/inputText';
import ResultText from './components/resultText';
import Uploader from './components/uploader';
import ResultImage from './components/resultImage';

const headerHeight = '50px';

const Header = styled.header`
  background: #333;
  min-height: ${headerHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: bolder;
  color: #fff;
  margin: 0;
  padding: 0;
`;

const MainContainer = styled.section`
  background: #f4f4f4;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${headerHeight});
`;

const Form = styled.form`
  min-height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CenteredSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ direction }) => direction || 'row'};
`;

const Button = styled.button`
  border: 1px solid #636363;
  border-color: ${({ bordercolor }) => bordercolor || '#636363'};
  line-height: 33px;
  padding: 0 30px;
  font-size: 12px;
  background: ${({ background }) => background || '#636363'};
  color: ${({ color }) => color || '#fff'};
  font-weight: bolder;
  text-transform: uppercase;
  margin: 10px;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  cursor: pointer;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: center;
  align-items: center;
`;

const FlexRow = styled.div`
  flex: ${({ cssFlex }) => cssFlex};
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: ${({ ratioCalc }) => (ratioCalc ? '20px' : '99vh')};
  transition: max-height 0.2s ease-in-out;
  form {
    transition: visibility 0.2s ease-in-out;
    visibility: ${({ ratioCalc }) => (ratioCalc ? 'hidden' : 'visible')};
  }
`;

const FlexRowSecondary = styled.div`
  flex: ${({ cssFlex }) => cssFlex};
  padding: 10px;
  background: #d2d2d2;
  border-left: 2px solid #fff;
`;

const App = () => {
  const [width, setWidth] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [ratio, setRatio] = React.useState(null);
  const [clipped, setClipped] = React.useState();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const result = calculateRatio(width, height);
    console.log('result', result);
    setImageLoaded(false);
    setClipped(false);
    setRatio(result);
  };

  const handleRestart = e => {
    e.preventDefault();
    setRatio('');
  };

  const setDimensions = e => {
    if (!imageLoaded) {
      setClipped(false);
      setRatio('');
      setImageLoaded(true);
      setWidth(e.width);
      setHeight(e.height);
      setImagePreview(e.src);
    }
  };

  return (
    <div className="App">
      <Header>
        <Title>Calculate Aspect Ratio</Title>
      </Header>
      <MainContainer>
        <FlexRow cssFlex={1} ratioCalc={!!ratio}>
          {!ratio && (
            <Form onSubmit={handleSubmit}>
              <Flex>
                <Flex direction="column">
                  <InputText
                    id="inputwidth"
                    placeholder="Width"
                    value={width}
                    onChange={({ currentTarget: { value } }) => {
                      setWidth(value);
                    }}
                  />
                  <InputText
                    id="inputheight"
                    placeholder="Height"
                    value={height}
                    onChange={({ currentTarget: { value } }) => {
                      setHeight(value);
                    }}
                  />
                </Flex>
                <Flex>
                  <CenteredSection>
                    <Uploader
                      callback={e => {
                        setDimensions(e);
                      }}
                    />
                  </CenteredSection>
                </Flex>
              </Flex>
              <Button visible={!!width && !!height} onClick={handleSubmit}>
                Calculate
              </Button>
            </Form>
          )}
          {ratio && (
            <div>
              <Button
                color="#636363"
                background="transparent"
                visible={ratio}
                onClick={handleRestart}
              >
                Restart
              </Button>
            </div>
          )}
        </FlexRow>
        <FlexRowSecondary cssFlex={ratio ? 1 : 0}>
          {ratio && (
            <CenteredSection direction="column">
              <ResultText
                clipped={clipped}
                value={'padding-bottom: ' + ratio + '%'}
                onClick={({ currentTarget: { value } }) => {
                  setClipped(true);
                  copyToClipboard(ratio);
                }}
              />
              {imagePreview && <ResultImage ratio={ratio} src={imagePreview} />}
            </CenteredSection>
          )}
        </FlexRowSecondary>
      </MainContainer>
    </div>
  );
};

export default App;
