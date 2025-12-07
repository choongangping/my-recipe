import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = React.forwardRef<React.ElementRef<typeof TouchableOpacity>, ButtonProps>(
  ({ className, variant = 'default', size = 'default', isLoading, style, children, ...props }, ref) => {
    
    const getVariantStyle = (): ViewStyle => {
      switch (variant) {
        case 'destructive':
          return styles.destructive;
        case 'outline':
          return styles.outline;
        case 'secondary':
          return styles.secondary;
        case 'ghost':
          return styles.ghost;
        case 'link':
          return styles.link;
        default:
          return styles.default;
      }
    };

    const getSizeStyle = (): ViewStyle => {
      switch (size) {
        case 'sm':
          return styles.sizeSm;
        case 'lg':
          return styles.sizeLg;
        case 'icon':
          return styles.sizeIcon;
        default:
          return styles.sizeDefault;
      }
    };

    const getTextStyle = (): TextStyle => {
       switch (variant) {
        case 'destructive':
          return styles.textDestructive;
        case 'outline':
          return styles.textOutline;
        case 'secondary':
          return styles.textSecondary;
        case 'ghost':
          return styles.textGhost;
        case 'link':
          return styles.textLink;
        default:
          return styles.textDefault;
      }
    }

    return (
      <TouchableOpacity
        ref={ref}
        style={[
            styles.base, 
            getVariantStyle(), 
            getSizeStyle(), 
            props.disabled && styles.disabled,
            style
        ]}
        activeOpacity={0.7}
        {...props}
      >
        {isLoading ? (
             <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? 'black' : 'white'} />
        ) : (
             typeof children === 'string' ? <Text style={[styles.textBase, getTextStyle()]}>{children}</Text> : children
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  disabled: {
    opacity: 0.5,
  },
  
  // Variants
  default: {
    backgroundColor: '#18181b', // primary
  },
  destructive: {
    backgroundColor: '#ef4444', // destructive
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e4e4e7', // input border
  },
  secondary: {
    backgroundColor: '#f4f4f5', // secondary
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
  },

  // Sizes
  sizeDefault: {
    height: 36, // h-9
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sizeSm: {
    height: 32, // h-8
    paddingHorizontal: 12,
  },
  sizeLg: {
    height: 40, // h-10
    paddingHorizontal: 32,
  },
  sizeIcon: {
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Text Styles
  textBase: {
    fontWeight: '500',
    fontSize: 14,
  },
  textDefault: {
    color: '#fafafa', // primary-foreground
  },
  textDestructive: {
    color: '#fafafa',
  },
  textOutline: {
    color: '#18181b',
  },
  textSecondary: {
    color: '#18181b', // secondary-foreground
  },
  textGhost: {
    color: '#18181b',
  },
  textLink: {
     color: '#18181b',
     textDecorationLine: 'underline',
  },

});

export { Button };
