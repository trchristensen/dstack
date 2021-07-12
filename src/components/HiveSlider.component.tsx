import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import HiveIcon from "../public/hive-blockchain-hive-logo.svg";



const HiveSlider = ({ isValue }) => {

  const [value, setValue] = useState(0)


    return (
      <React.Fragment>
        <Styles />
        {value}
        <Slider
          mb={4}
          focusThumbOnChange={false}
          aria-label="slider-ex-4"
          defaultValue={0}
          step={1}
          onChangeEnd={(val) => setValue(val)}
        >
          <Box className="slider-meter">
            <Box className="ticker ticker-0">
              <Text as="span">0</Text>
            </Box>
            <Box className="ticker ticker-10">
              <Text as="span">10</Text>
            </Box>
            <Box className="ticker ticker-20">
              <Text as="span">20</Text>
            </Box>
            <Box className="ticker ticker-30">
              <Text as="span">30</Text>
            </Box>
            <Box className="ticker ticker-40">
              <Text as="span">40</Text>
            </Box>
            <Box className="ticker ticker-50">
              <Text as="span">50</Text>
            </Box>
            <Box className="ticker ticker-60">
              <Text as="span">60</Text>
            </Box>
            <Box className="ticker ticker-70">
              <Text as="span">70</Text>
            </Box>
            <Box className="ticker ticker-80">
              <Text as="span">80</Text>
            </Box>
            <Box className="ticker ticker-90">
              <Text as="span">90</Text>
            </Box>
            <Box className="ticker ticker-100">
              <Text as="span">100</Text>
            </Box>
          </Box>
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <HiveIcon color="tomato" width="20" height="20" />
          </SliderThumb>
        </Slider>
      </React.Fragment>
    );

}

const Styles = () => (
  <style jsx>{`
    .slider-meter {
      position: absolute;
      height: 3px;
      width: 100%;
      z-index: 2;
      top: 10px;
    }
    .ticker {
      background: white;
      position: absolute;
      height: 3px;
      width: 2px;
    }
    .ticker span {
      display: inline-block;
      position: absolute;
      left: -8px;
      top: 10px;
      font-size: 14px;
    }
    .ticker-0 span {
      left: -2px;
    }
    .ticker-10 span {
      left: -12px;
    }
    .ticker-0 {
      left: 0%;
    }
    .ticker-10 {
      left: 10%;
    }
    .ticker-20 {
      left: 20%;
    }
    .ticker-30 {
      left: 30%;
    }
    .ticker-40 {
      left: 40%;
    }
    .ticker-50 {
      left: 50%;
    }
    .ticker-60 {
      left: 60%;
    }
    .ticker-70 {
      left: 70%;
    }
    .ticker-80 {
      left: 80%;
    }
    .ticker-90 {
      left: 90%;
    }
    .ticker-100 {
      left: 100%;
    }
  `}</style>
);

export default HiveSlider