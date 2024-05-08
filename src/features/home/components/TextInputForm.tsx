import { Colors } from 'constants/colors.constants';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

interface Props extends TextInputProps {
  containerStyles?: StyleProp<ViewStyle>;
  title?: string;
  error?: string | any;
}

const TextInputForm = (props: Props) => {
  const { containerStyles, title, error } = props;
  return (
    <>
      <View
        style={[
          styles.container,
          {
            borderColor: error ? Colors.extra : Colors.Grey350,
          },
          containerStyles,
        ]}
      >
        <TextInput
          {...props}
          style={[styles.input, {
            height: props.multiline ? 88 : 44,
            marginTop: title ? 3 : 0,
          }, props.style]}
        />
        {title && (
          <View style={styles.viewTitle}>
            <Text style={[styles.txtTitle, { color: error ? Colors.extra : Colors.grey_800, }]}>
              {title}
            </Text>
          </View>
        )}
      </View>
      {error && (
        <Text style={styles.txtError}>
          {error}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    marginHorizontal: 16,
    fontSize: 13,
    color: Colors.grey_800,
    textAlignVertical: 'top',
  },
  viewTitle: {
    backgroundColor: Colors.white,
    position: 'absolute',
    top: -9,
    left: 16,
    paddingHorizontal: 4,
  },
  txtTitle: {
    fontSize: 15,
    fontWeight: '600'
  },
  txtError: {
    fontSize: 10,
    color: Colors.extra,
    marginTop: 5,
  },
})
export default TextInputForm;
