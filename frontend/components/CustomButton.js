  // components/CustomButton.js
  import React from 'react';
  import { View, Text, TouchableOpacity } from 'react-native';
  import { COLORS, SIZES, FONTS } from './theme';

  export default function CustomButton({ title, onPress, disabled = false,
  ...props }) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
          backgroundColor: disabled ? `${COLORS.primary}99` : COLORS.primary,
          padding: SIZES.buttonHeight,
          borderRadius: SIZES.radius,
          alignItems: 'center',
          ...props.style,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontWeight: FONTS.bold,
            fontSize: SIZES.font + 2,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
