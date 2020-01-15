import React from 'react';
import Card from './Card';

const Hand = ({ wrapperStyle, handArray }) => {
  const CARD_WIDTH = '100px';
  const CARD_HEIGHT = '150px';

  const extraCardStyle = (index) => ({
    // subsequent cards is on top of previous card
    zIndex: index,
    // and shifted to the right a bit
    willChange: 'transform',
    transformOrigin: '50% 120%', // from bottom
    transform: `translateX(${20 * index}px) rotateZ(${-45 + 10 * index}deg)`,
    // hovering enlarge (and shift it up?)
  });

  const listContainer = {
    display: 'flex',
    listStyle: 'none',
  };

  return (
    <div style={{ margin: 'auto', ...wrapperStyle }}>
      <ul style={listContainer}>
        {handArray.map((card, index) => {
          return (
            <li style={{ position: 'absolute', ...extraCardStyle(index) }}>
              <Card
                card={card}
                style={{
                  height: CARD_HEIGHT,
                  width: CARD_WIDTH,
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
