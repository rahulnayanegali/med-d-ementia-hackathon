import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, fontSizes } from '../styles/theme';

interface GreetingProps {
  name: string;
}

export const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <Text style={styles.text}>Welcome {name}!</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.greeting,
    color: colors.text,
    fontWeight: 'bold',
  },
});
