// Component for displaying a horizontal list of logo style options
import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useCallback } from 'react';
import { logoStyles } from '../../../src/constants/logoStyles';
import LogoStyleItem from './LogoStyleItem';

// Props interface for LogoStylesList component
interface LogoStylesListProps {
  selectedStyle: number;
  onStyleSelect: (styleId: number) => void;
}

// Memoized component to prevent unnecessary re-renders
const LogoStylesList = React.memo(({ selectedStyle, onStyleSelect }: LogoStylesListProps) => {
  // Render function for individual logo style items
  const renderLogoStyleItem = useCallback(({ item }: { item: typeof logoStyles[0] }) => (
    <LogoStyleItem
      item={item}
      isSelected={selectedStyle === item.id}
      onSelect={() => onStyleSelect(item.id)}
    />
  ), [selectedStyle, onStyleSelect]);

  // Key extractor for FlatList optimization
  const keyExtractor = useCallback((item: typeof logoStyles[0]) => item.id.toString(), []);

  return (
    <View style={styles.stylesSection}>
      <Text style={styles.sectionTitle}>Logo Styles</Text>
      <FlatList
        data={logoStyles}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.stylesList}
        contentContainerStyle={styles.stylesListContent}
        renderItem={renderLogoStyleItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
});

export default LogoStylesList;

// Component styles
const styles = StyleSheet.create({
  stylesSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Manrope',
    paddingHorizontal: 24,
    fontSize: 20,
    fontWeight: '800',
    color: 'white'
  },
  stylesList: {
    marginTop: 16,
  },
  stylesListContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
}); 