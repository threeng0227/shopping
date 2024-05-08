
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Colors } from 'constants/colors.constants';
import TextInputForm from '../components/TextInputForm';
import DateTimePicker from '../components/DateTimePicker';
import RemixIcon from 'react-native-remix-icon';
import  {NavigationService}  from 'services/NavigationService';
import { selectUserInfor, setUserInfor } from 'redux/reducers/userReducer';
import { useAppSelector } from 'redux/store/hooks';
import { useDispatch } from 'react-redux';
const PHONE_REG =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const ChangeProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const user = useAppSelector(selectUserInfor);
  const initState = {
    name: user?.name ?? '',
    birthday: user?.birthday ? new Date(user?.birthday) : new Date(),
    address:user?.address ?? '',
    phone: user?.phone ??'',
    email: user?.email ??'',
  };
  const updateValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is required'),
    phone: yup.string()
      .required('Phone is required')
      .matches(PHONE_REG, 'Phone number is not valid'),
    name: yup.string().required('Name is required'),
    address: yup.string().required('Address is required'),
  });

  const _onSubmit = async (values: typeof initState) => {
    dispatch(setUserInfor({
      name: values.name,
      birthday: values.birthday.toString(),
      phone: values.phone,
      email: values.email,
      address: values.address,
    }));
    NavigationService.goBack();
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            paddingTop: top + 15,
            backgroundColor: Colors.red,
          },
        ]}
      >
        <TouchableOpacity onPress={() => NavigationService.goBack()} >
          <RemixIcon name={'arrow-left-line'} color={'white'} size={27} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewContent}
      >
        <Formik
          validationSchema={updateValidationSchema}
          initialValues={
            initState

          }
          onSubmit={(values) => _onSubmit(values)}
        >
          {({
            handleChange,
            setFieldValue,
            handleSubmit,
            touched,
            values,
            errors,
          }) => (
            <View style={styles.content}>
              <TextInputForm
                title={'Name'}
                error={touched.name ? errors.name : ''}
                onChangeText={handleChange('name')}
                value={values.name}
                containerStyles={styles.marginTop20}
              />
              <DateTimePicker
                containerStyles={styles.marginTop20}
                onChange={handleChange('birthday')}
                value={values.birthday}
                title={'Birthday'}
              />
              <TextInputForm
                title={'Email Address'}
                error={touched.email ? errors.email : ''}
                onChangeText={handleChange('email')}
                value={values.email}
                containerStyles={styles.marginTop20}
              />
              <TextInputForm
                title={'Phone Number'}
                error={touched.phone ? errors.phone : ''}
                onChangeText={handleChange('phone')}
                value={values.phone}
                containerStyles={styles.marginTop20}
              />
              <TextInputForm
                title={'Address'}
                error={touched.address ? errors.address : ''}
                onChangeText={handleChange('address')}
                value={values.address}
                containerStyles={styles.marginTop20}
              />
              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={[
                  styles.btnUpdate,
                  {
                    backgroundColor: Colors.red,
                  },
                ]}
              >
                <Text style={styles.txtUpdate}>{user?.name ? 'Update' :'Register' }</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingBottom: 9,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtTitle: {
    fontWeight: '600',
    color: Colors.white,
    fontSize: 13,
  },
  marginTop20: {
    marginTop: 20,
  },
  scrollViewContent: {
    paddingTop: 16,
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32
  },
  btnUpdate: {
    paddingVertical: 16,
    marginVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  txtUpdate: {
    textTransform: 'uppercase',
    fontSize: 13,
    color: Colors.white,
    fontWeight: '600'
  },
});

export default ChangeProfileScreen;