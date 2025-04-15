import { View, Text, Pressable, StyleSheet, type ViewProps, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

interface HeaderProps extends ViewProps {
  backgroundColor?: string;
  position?: 'absolute' | 'relative';
  leftIcon?: {
    name: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
    color?: string;
  };
  rightIcon?: {
    name: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
    color?: string;
  };
  title?: string;
  titleColor?: string;
  layout?: 'center' | 'left' | 'right';
  titleFontSize?: number;
  onBackPress?: () => void;
}

export function Header({
  backgroundColor = '#fff',
  position = 'relative',
  leftIcon,
  rightIcon,
  title,
  titleColor = '#000',
  layout = 'center',
  titleFontSize,
  style,
  onBackPress,
  ...props
}: HeaderProps) {
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <View
        style={[
          styles.container,
          { backgroundColor, position },
          style,
        ]}
        {...props}
      >
        
        {leftIcon && (
          <Pressable onPress={leftIcon.onPress} style={styles.iconContainer}>
            <MaterialIcons
              name={leftIcon.name}
              size={24}
              color={leftIcon.color || '#000'}
            />
          </Pressable>
        )}
        
        {title && (
          <Text 
            style={[
              styles.title, 
              { color: titleColor,fontSize:titleFontSize },
              layout === 'left' && styles.titleLeft,
              layout === 'right' && styles.titleRight
            ]}
          >
            {title}
          </Text>
        )}
        
        {rightIcon && (
          <Pressable 
            onPress={rightIcon.onPress} 
            style={[styles.iconContainer, styles.rightIconContainer]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons
              name={rightIcon.name}
              size={24}
              color={rightIcon.color || '#000'}
            />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    backgroundColor:'transparent'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    height: 60,
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
  },
  iconContainer: {
    padding: 8,
  },
  rightIconContainer: {
    zIndex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Manrope',
    letterSpacing:-0.1
  },
  titleLeft: {
    textAlign: 'left',
    marginLeft: 8,
  },
  titleRight: {
    textAlign: 'right',
    marginRight: 8,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    padding: 8,
  },
  backText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
