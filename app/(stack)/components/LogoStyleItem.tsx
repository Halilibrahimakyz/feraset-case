// Component for displaying a logo style option with selection functionality
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import { logoStyles } from '@/constants/logoStyles';

// Props interface for LogoStyleItem component
interface LogoStyleItemProps {
  item: typeof logoStyles[0];
  isSelected: boolean;
  onSelect: () => void;
}

// Memoized component to prevent unnecessary re-renders
const LogoStyleItem = React.memo(({ item, isSelected, onSelect }: LogoStyleItemProps) => (
  <View style={{ alignItems: 'center' }}>
    <Pressable
      onPress={onSelect}
      style={[
        styles.logoStyleContainer,
        isSelected && styles.selectedLogoStyle
      ]}
    >
      <Image
        source={item.image}
        style={styles.logoStyleImage}
        resizeMode="contain"
      />
    </Pressable>
    <Text style={[styles.logoLabel, isSelected && { color: '#FAFAFA', fontWeight: '700' }]}>
      {item.label}
    </Text>
  </View>
));

export default LogoStyleItem;

// Component styles
const styles = StyleSheet.create({
  logoStyleContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#27272A',
    borderWidth: 1,
    borderColor: '#3F3F46',
    overflow: 'hidden',
  },
  selectedLogoStyle: {
    borderColor: '#FAFAFA',
    borderWidth: 2,
  },
  logoStyleImage: {
    width: '100%',
    height: '100%',
  },
  logoLabel: {
    color: '#A1A1AA',
    fontFamily: 'Manrope',
    fontSize: 13,
    fontWeight: '400',
    marginTop: 8,
  },
}); 