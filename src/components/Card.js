import React from 'react';
import { Flex, Text } from '@chakra-ui/core';

const Card = ({ style, cardName, ...rest }) => {
  return (
    <Flex
      w='20rem'
      height='20rem'
      border='2px solid'
      borderRadius='md'
      backgroundColor={'white'}
      {...style}
      {...rest}
    >
      <Text as='span' p='5px' fontSize='sm'>
        {cardName}
      </Text>
    </Flex>
  );
};

export default Card;
