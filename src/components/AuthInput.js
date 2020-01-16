import React from 'react';
import useInput from '../hooks/useInput';
import {
  Flex,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
} from '@chakra-ui/core';

// a single field uncontroller input component that relays its state to parent on submit
const AuthInput = ({ label, onSubmit, ...rest }) => {
  const { value: name, setValue: setName, reset: resetName, bind } = useInput(
    'Test Dummy'
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name);
  };

  return (
    <Flex
      as='form'
      direction='column'
      justify='center'
      align='center'
      onSubmit={handleSubmit}
      m={2}
      {...rest}
    >
      <FormControl isRequired m={2}>
        <FormLabel htmlFor='name-input' id='name-label'>
          {label}
        </FormLabel>
        <Input
          type='text'
          id='name-input'
          aria-labelledby='name-label'
          {...bind}
        />
      </FormControl>
      <Button
        color='green.500'
        style={{ alignSelf: 'center' }}
        onClick={handleSubmit}
      >
        Yep, that's my name!
      </Button>
    </Flex>
  );
};

export default AuthInput;
