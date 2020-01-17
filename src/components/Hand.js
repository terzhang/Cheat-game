import React from 'react';
import Card from './Card';
import { Flex, List, ListItem } from '@chakra-ui/core';

const Hand = ({
  wrapperStyle,
  handArray = [],
  mode = 'spread',
  flipped = false,
}) => {
  const CARD_WIDTH = 100;
  const CARD_HEIGHT = 150;
  const SPAN_START_DEG = -45;
  const SPAN_END_DEG = 60;
  const SPAN_DEG = SPAN_END_DEG - SPAN_START_DEG;

  if (mode !== 'spread' || 'straight') mode = 'spread';

  const animatedCardStyle = (index) => ({
    // subsequent cards is on top of previous card
    zIndex: index,
    // and shifted to the right a bit
    willChange: 'transform',
    transformOrigin: '50% 120%', // from bottom
    transform: `translateX(${CARD_WIDTH * 0.2}px) rotateZ(${SPAN_START_DEG +
      (SPAN_DEG / handArray.length) * index}deg)`,
    // hovering enlarges card (chakra use _[pseudoSelecterName] instead of :[pesudoSelectorName])
    _hover: {
      zIndex: 99,
      transform: `scale(1.2) translateX(${CARD_WIDTH *
        0.2}px) rotateZ(${SPAN_START_DEG +
        (SPAN_DEG / handArray.length) * index}deg)`,
      willChange: 'transform',
    },
  });

  const listContainer = {
    display: 'flex',
    listStyle: 'none',
  };

  return (
    <Flex m='auto' justify='flex-end' {...wrapperStyle}>
      <List {...listContainer}>
        {handArray.map((cardName, index) => {
          return (
            <ListItem
              position='absolute'
              key={cardName}
              {...animatedCardStyle(index)}
            >
              <Card
                cardName={cardName}
                style={{
                  height: CARD_HEIGHT + 'px',
                  width: CARD_WIDTH + 'px',
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Flex>
  );
};

export default Hand;
