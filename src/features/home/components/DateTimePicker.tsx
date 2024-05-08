
import { Colors } from 'constants/colors.constants';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle, Text, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
interface Props {
  containerStyles?: StyleProp<ViewStyle>;
  title?: string;
  value: Date;
  onChange: (date: string) => void;
}

const DateTimePicker = (props: Props) => {
  const { containerStyles, title, value } = props;
  const [open, setOpen] = useState(false);

  const _setDate = (date: Date) => {
    props?.onChange(date.toISOString());
  };

  return (
    <>
      <View
        style={[
          styles.container,
          containerStyles,
        ]}
      >
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={styles.btnSelect}
        >
          <Text style={styles.txtValue}>
            {moment(value).format('DD-MM-YYYY')}
          </Text>
        </TouchableOpacity>
        {title && (
          <View style={styles.viewTitle}>
            <Text style={styles.txtTitle}>
              {title}
            </Text>
          </View>
        )}
      </View>
      <DatePicker
        modal
        mode={'date'}
        title={'Select Date'}
        open={open}
        date={props.value ? new Date(props.value) : new Date()}
        cancelText={'Cancel'}
        maximumDate={new Date()}
        confirmText={'Confirm'}
        onConfirm={(date) => {
          setOpen(false);
          _setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  txtTitle: {
    fontSize: 15,
    color: Colors.grey_800,
    fontWeight: '600'
  },
  viewTitle: {
    backgroundColor: Colors.white,
    position: 'absolute',
    top: -9,
    left: 16,
    paddingHorizontal: 4,
  },
  txtValue: {
    fontSize: 13,
    color: Colors.grey_800,
    fontWeight: '400',
  },
  btnSelect: {
    height: 44,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  container: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.Grey350,
  },
})
export default DateTimePicker;
