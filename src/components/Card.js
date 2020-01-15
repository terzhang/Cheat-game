import React from 'react';

const Card = ({ style, card, ...rest }) => {
  return (
    <div
      style={{
        height: '20rem',
        width: '20rem',
        border: '2px solid',
        display: 'flex',
        backgroundColor: 'white',
        ...style,
      }}
      {...rest}
    >
      <span style={{ padding: '5px' }}>{card}</span>
    </div>
  );
};

export default Card;
