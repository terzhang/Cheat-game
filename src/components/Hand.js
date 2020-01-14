import React from 'react';
import Card from './Card';

const Hand = ({ handArray }) => {
  const CARD_WIDTH = '100px';
  const CARD_HEIGHT = '250px';

  const extraCardStyle = (index) => ({
    // subsequent cards is on top of previous card
    zIndex: index,
    // and shifted to the right a bit
    willChange: 'transform',
    transformOrigin: '50% 100%', // from bottom
    transform: `translateX(${CARD_WIDTH * 0.1})`,
    // hovering enlarge (and shift it up?)
  });

  return (
    <div>
      {handArray.map((card, index) => {
        return (
          <ul>
            <li>
              <Card
                card={card}
                style={{
                  height: CARD_HEIGHT,
                  width: CARD_WIDTH,
                  ...extraCardStyle,
                }}
              />
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Hand;
