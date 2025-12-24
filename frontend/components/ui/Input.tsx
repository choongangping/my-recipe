import * as React from 'react';
import { TextInput, StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, style, label, error, containerStyle, ...props }, ref) => {
    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          ref={ref}
          style={[
            styles.input,
            error ? styles.inputError : null,
            style
          ]}
          placeholderTextColor="#a1a1aa" // muted-foreground
          {...props}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);
Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    gap: 8,
    width: '100%',
  },
  label: {
     fontSize: 14,
     fontWeight: '500',
     color: '#09090b',
  },
  input: {
    height: 36, // h-9
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e4e4e7', // border-input
    backgroundColor: 'transparent',
    paddingHorizontal: 12, // px-3
    paddingVertical: 4, // py-1
    fontSize: 14, // text-sm
    color: '#09090b', // text-foreground
  },
  inputError: {
      borderColor: '#ef4444',
  },
  errorText: {
      fontSize: 12,
      color: '#ef4444',
  }
});

export { Input };
