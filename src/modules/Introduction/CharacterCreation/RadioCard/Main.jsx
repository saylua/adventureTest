import React from 'react';
import RadioInput from 'components/Form/RadioInput';

import './RadioCard.css';

const RadioCard = (props) => {
  const {
    style, title, children, imgUrl, name, value, checked, handleClick,
  } = props;
  const id = `radio-card-${name}-${value}`;
  return (
    <label
      className="radio-card"
      htmlFor={id}
      style={style}
      data-selected={checked}
    >
      <img src={imgUrl} alt={title} />
      <h3>{title}</h3>
      { children }
      <RadioInput
        style={{ marginTop: '1em' }}
        id={id}
        name={name}
        value={value}
        checked={checked}
        onClick={handleClick}
      />
    </label>
  );
};

export default RadioCard;