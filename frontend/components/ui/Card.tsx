import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

const Card = React.forwardRef<View, React.ComponentProps<typeof View>>(
  ({ style, ...props }, ref) => (
    <View
      ref={ref}
      style={[styles.card, style]}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<View, React.ComponentProps<typeof View>>(
  ({ style, ...props }, ref) => (
    <View
      ref={ref}
      style={[styles.header, style]}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<Text, React.ComponentProps<typeof Text>>(
  ({ style, ...props }, ref) => (
    <Text
      ref={ref}
      style={[styles.title, style]}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<Text, React.ComponentProps<typeof Text>>(
  ({ style, ...props }, ref) => (
    <Text
      ref={ref}
      style={[styles.description, style]}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<View, React.ComponentProps<typeof View>>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.content, style]} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<View, React.ComponentProps<typeof View>>(
  ({ style, ...props }, ref) => (
    <View
      ref={ref}
      style={[styles.footer, style]}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

const styles = StyleSheet.create({
  card: {
    borderRadius: 12, // rounded-xl
    borderWidth: 1,
    borderColor: '#e4e4e7', // border
    backgroundColor: '#ffffff', // bg-card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 4,
  },
  header: {
    padding: 24, // p-6
    gap: 6, // gap-1.5 (approx)
  },
  title: {
    fontSize: 24, // leading-none (approx)
    fontWeight: '600',
    color: '#09090b',
  },
  description: {
    fontSize: 14,
    color: '#71717a', // text-muted-foreground
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  footer: {
     flexDirection: 'row',
     alignItems: 'center',
     padding: 24,
     paddingTop: 0,
  }
});

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
