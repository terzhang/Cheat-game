import React from 'react';

const Card = ({ style, card, ...rest }) => {
  return (
    <div
      style={{
        height: '20rem',
        width: '20rem',
        border: '2rem solid',
        display: 'flex',
        ...style,
      }}
      {...rest}
    >
      <span style={{ padding: '25px' }}>{card}</span>
    </div>
  );
};

export default Card;
