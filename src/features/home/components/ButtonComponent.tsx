import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  ColorValue,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { Colors } from 'constants/colors.constants';

interface Props {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  disabled?: boolean;
  hasIcon?: JSX.Element;
  textStyle?: StyleProp<TextStyle>;
  children?: JSX.Element;
  leftIcon?: JSX.Element;
  isLoading?: boolean;
  loadingColor?: ColorValue;
}

export const ButtonComponent = (props: Props) => {
  const {
    disabled,
    style,
    textStyle,
    leftIcon,
    title,
    hasIcon,
    children,
    isLoading,
    loadingColor,
    onPress,
  } = props;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: Colors.main },
        style,
        disabled && { backgroundColor: Colors.Grey350 },
      ]}
      disabled={disabled}
      activeOpacity={.8}
      onPress={() => onPress?.()}
    >
      {!!leftIcon && leftIcon}
      {title && (
        <Text style={[styles.textStyle, textStyle]}>
          {title}
        </Text>
      )}
      {hasIcon}
      {children}
      {isLoading && (
        <ActivityIndicator
          style={{ marginLeft: 6 }}
          size={'small'}
          color={loadingColor ?? Colors.white}
        />
      )}
    </TouchableOpacity>
  );
};
export const styles = StyleSheet.create({
  container: {
    minHeight: 35,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  wrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  textStyle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600'
  },
  textCenter: {
    textAlign: 'center',
  },
});
