import React from 'react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  Flex,
} from '@chakra-ui/core';

export default function SliderInput({ currentCardNum }) {
  const [value, setValue] = React.useState(1);
  const handleChange = (value) => setValue(value);

  // change to Ace, Jack, Queen, King with their corresponding number
  const AJQKDisplay = (value) => {
    if (value === 1) {
      value = 'Ace';
    } else if (value === 11) {
      value = 'Jack';
    } else if (value === 12) {
      value = 'Queen';
    } else if (value === 13) {
      value = 'King';
    }
    return value;
  };

  return (
    <Flex w='50%' m={'auto'}>
      <NumberInput
        maxW='100px'
        mr='2rem'
        value={AJQKDisplay(value)}
        onChange={handleChange}
        min={1}
        max={13}
      />
      <Slider flex='1' value={value} onChange={handleChange} min={1} max={13}>
        <SliderTrack />
        <SliderFilledTrack />
        <SliderThumb
          fontSize='sm'
          width='32px'
          height='20px'
          children={value}
        />
      </Slider>
    </Flex>
  );
}
