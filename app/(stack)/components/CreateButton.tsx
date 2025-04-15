// Gradient button with stars icon
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

// Component props definition
interface CreateButtonProps {
  onPress: () => void;
  isPending: boolean;
}

// Memoized button component
const CreateButton = React.memo(({ onPress, isPending }: CreateButtonProps) => (
  <Pressable
    onPress={onPress}
    disabled={isPending}
    style={[styles.createButton, isPending && styles.createButtonDisabled]}
  >
    {/* Gradient background */}
    <LinearGradient
      colors={['#2938DC', '#943DFF']}
      locations={[0, 0.75]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.createButtonGradient}
    />
    {/* Button content */}
    <View style={styles.createButtonContent}>
      <Text style={styles.createButtonText}>Create</Text>
        <Image
          source={require('../../../assets/images/stars.png')}
          style={styles.starsIcon}
          resizeMode="contain"
        />
    </View>
  </Pressable>
));

export default CreateButton;

// Component styles
const styles = StyleSheet.create({
  createButton: {
    width: '100%',
    borderRadius: 50,
    padding: 17,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  createButtonDisabled: {
    opacity: 0.7,
  },
  createButtonGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  createButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  createButtonText: {
    fontFamily: 'Manrope',
    fontSize: 17,
    fontWeight: '900',
    color: 'white',
  },
  starsIcon: {
    height: 20,
    width: 20,
  },
}); 