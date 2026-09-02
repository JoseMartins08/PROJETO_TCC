  // components/CustomInput.js
  import React from 'react';
  import { View, TextInput } from 'react-native';
  import { COLORS, SIZES, FONTS } from './theme';

  export default function CustomInput({ placeholder, value, onChangeText,
  secureTextEntry, ...props }) {
    return (
      <TextInput
        style={{
          backgroundColor: COLORS.white,
          borderWidth: 1,
          borderColor: COLORS.border,
          borderRadius: SIZES.radius,
          padding: SIZES.padding,
          ...props.style,
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        {...props}
      />
    );
  }
