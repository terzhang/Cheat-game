/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import Card from './Card';

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

  const extraCardStyle = (index) => ({
    // subsequent cards is on top of previous card
    zIndex: index,
    // and shifted to the right a bit
    willChange: 'transform',
    transformOrigin: '50% 120%', // from bottom
    transform: `translateX(${CARD_WIDTH * 0.2}px) rotateZ(${SPAN_START_DEG +
      (SPAN_DEG / handArray.length) * index}deg)`,
    // hovering enlarge (and shift it up?)
    ':hover': {
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
    <div style={{ margin: 'auto', justifySelf: 'end', ...wrapperStyle }}>
      <ul style={listContainer}>
        {handArray.map((card, index) => {
          return (
            <li css={{ position: 'absolute', ...extraCardStyle(index) }}>
              <Card
                card={card}
                style={{
                  height: CARD_HEIGHT + 'px',
                  width: CARD_WIDTH + 'px',
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Hand;
