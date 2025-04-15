// Custom input component with gradient background and error handling
import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useState, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

// Props interface for the CustomInput component
interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error: string | null;
  placeholder: string;
  maxLength: number;
  textInputRef: React.RefObject<TextInput>;
}

const CustomInput = ({ 
  value, 
  onChangeText, 
  error, 
  placeholder,
  maxLength,
  textInputRef
}: CustomInputProps) => {
  // State to track input focus
  const [focused, setFocused] = useState(false);

  // Memoized focus handler
  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  // Memoized blur handler
  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);
  return (
    <View style={styles.inputWrapper}>
      {/* Input container with gradient background */}
      <View style={[
        styles.inputContainer,
        focused && styles.focusedInput,
        error && styles.errorInput
      ]}>
        <LinearGradient
          colors={['#2938DC', '#943DFF']}
          locations={[0, 0.75]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.inputGradient}
        />
        {/* Main text input */}
        <TextInput
          ref={textInputRef}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={!focused ? "#A1A1AA" : "transparent"}
          multiline
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          value={value}
          maxLength={maxLength}
        />
        {/* Character counter */}
        <Text style={styles.charCount}>{value.length}/{maxLength}</Text>
      </View>
      {/* Error message display */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomInput;

// Component styles
const styles = StyleSheet.create({
  inputWrapper: {
    marginTop: 12,
    marginHorizontal: 24,
  },
  inputContainer: {
    borderRadius: 16,
    height: 175,
    backgroundColor: '#27272A',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  focusedInput: {
    borderColor: '#FAFAFA',
    borderWidth: 1,
  },
  errorInput: {
    borderColor: '#EF4444',
  },
  inputGradient: {
    borderRadius: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    opacity: 0.05,
    zIndex: 20,
    pointerEvents: 'box-none',
  },
  input: {
    padding: 12,
    color: 'white',
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '400',
    backgroundColor: 'transparent',
    flex: 1,
  },
  charCount: {
    marginLeft: 12,
    marginBottom: 15.5,
    marginTop: 3.5,
    color: '#71717A',
  },
  errorText: {
    color: '#EF4444',
    fontFamily: 'Manrope',
    fontSize: 13,
    marginTop: 8,
    marginLeft: 4,
  },
}); 