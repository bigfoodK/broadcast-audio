import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';

type ConfigurationInputProps = {
  onChange: (value: string) => void;
  placeholder?: string;
  inputType?: string;
  label?: string;
  value: string;
  fullWidth?: boolean;
};

export default function ConfigurationInput(props: ConfigurationInputProps) {
  const {
    onChange,
    placeholder,
    inputType,
    label,
    value,
    fullWidth,
  } = props;
  const [inputValue, setInputValue] = useState('');

  useEffect(() => setInputValue(value), [value]);

  return (
    <TextField
      onChange={(event) => setInputValue(event.target.value)}
      value={inputValue}
      placeholder={placeholder}
      type={inputType}
      label={label}
      fullWidth={fullWidth}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => onChange(inputValue)}
            >Change</IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}
