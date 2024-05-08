import { Colors } from 'constants/colors.constants';
import React from 'react';
import {
  StyleProp,
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
          {
            borderWidth: 1,
            borderRadius: 8,
            borderColor: error ? Colors.extra : Colors.Grey350,
          },
          containerStyles,
        ]}
      >
        <TextInput
          {...props}
          style={[{
            height: props.multiline ? 88 : 44,
            marginTop: title ? 3 : 0,
            marginHorizontal: 16,
            fontSize: 13,
            color: Colors.grey_800,
            textAlignVertical: 'top',
          }, props.style]}
        />
        {title && (
          <View
            style={{
              backgroundColor: Colors.white,
              position: 'absolute',
              top: -9,
              left: 16,
              paddingHorizontal: 4,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: error ? Colors.extra : Colors.grey_800,
                fontWeight: '600'
              }}
            >
              {title}
            </Text>
          </View>
        )}
      </View>
      {error && (
        <Text
          style={{
            fontSize: 10,
            color: Colors.extra,
            marginTop: 5,
          }}
        >
          {error}
        </Text>
      )}
    </>
  );
};
export default TextInputForm;
