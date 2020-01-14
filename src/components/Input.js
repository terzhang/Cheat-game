import React from 'react';
import useInput from '../hooks/useInput';

// a single field uncontroller input component that relays its state to parent on submit
const Input = ({ label, onSubmit, ...rest }) => {
  const { value: name, setValue: setName, reset: resetName, bind } = useInput(
    'Test Dummy'
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>{label}</label>
      <input type='text' {...bind} {...rest} />
      <input type='submit' value='Submit' />
    </form>
  );
};

export default Input;
