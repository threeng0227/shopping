import { Formik } from "formik";
import React, { useEffect } from "react";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import * as yup from 'yup';
import TextInputForm from "./TextInputForm";
import { ButtonComponent } from "./ButtonComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "constants/colors.constants";

const ModalChangeProduct = (({
    visible,
    setVisible,
    data,
    onAdd,
    onEdit
}: {
    visible: boolean,
    setVisible: (value: boolean) => void,
    data: any,
    onEdit: (value: any) => void,
    onAdd: (value: any) => void,

}) => {
    const initState = {
        title: data?.title ?? '',
        description: data?.description ?? '',
        price: data?.price ?? '',
        tax: data?.tax ?? '',
    };
    const updateValidationSchema = yup.object().shape({
        title: yup.string().required('Name is required'),
        description: yup.string().required('Description is required'),
        price: yup.string().required('Price is required'),
        tax: yup.string().required('Tax is required'),
    });

    const _onSubmit = (values: typeof initState) => {
        setVisible(false);
        const timer = setTimeout(() => {
            data ?
                onEdit({
                    description: values.description,
                    title: values.title,
                    isChoose: false,
                    tax: values.tax,
                    price: values.price,
                    id: data.id,
                })
                :
                onAdd({
                    description: values.description,
                    title: values.title,
                    isChoose: false,
                    tax: values.tax,
                    price: values.price
                })
            clearTimeout(timer);
        }, 300);

    };
    return (
        <Modal
            visible={visible}
            transparent
            animationType={'fade'}
        >
            <View style={styles.containerForm}>
                <Pressable onPress={() => setVisible(false)} style={styles.flex1} />
                <View style={styles.contentForm}>
                    <KeyboardAwareScrollView
                        scrollEnabled={false}
                        enableOnAndroid={true}
                        enableAutomaticScroll={(Platform.OS === 'ios')}
                        contentContainerStyle={{
                            flexGrow: 1
                        }}
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
                            }) => {
                                return (

                                    <View style={styles.form}>
                                        <View style={styles.formInfor}>
                                            <TextInputForm
                                                title={'Name'}
                                                onChangeText={handleChange('title')}
                                                value={values.title}
                                                error={touched.title ? errors.title : ''}
                                            />
                                            <TextInputForm
                                                containerStyles={styles.marginTop20}
                                                multiline
                                                title={'Description'}
                                                onChangeText={handleChange('description')}
                                                value={values.description}
                                                error={touched.description ? errors.description : ''}
                                            />
                                            <TextInputForm
                                                containerStyles={styles.marginTop20}
                                                title={'Price'}
                                                onChangeText={handleChange('price')}
                                                value={values.price?.toString()}
                                                error={touched.price ? errors.price : ''}
                                                keyboardType={'phone-pad'}
                                            />
                                            <TextInputForm
                                                containerStyles={styles.marginTop20}
                                                title={'Tax'}
                                                onChangeText={handleChange('tax')}
                                                value={values.tax?.toString()}
                                                error={touched.tax ? errors.tax : ''}
                                                keyboardType={'phone-pad'}
                                            />

                                        </View>
                                        <ButtonComponent
                                            onPress={handleSubmit}
                                            style={styles.bgRed}
                                            title={data ? 'Update' : 'Add'}
                                        />
                                    </View>
                                );
                            }
                            }
                        </Formik>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </Modal>
    );
});
const styles = StyleSheet.create({
    containerForm: {
        flex: 1,
        backgroundColor: Colors.opacityModal
    },
    contentForm: {
        height: '90%',
        backgroundColor: Colors.white,
        justifyContent: 'flex-end',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        paddingTop: 10,
    },
    form: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        paddingHorizontal: 16,
        paddingBottom: 32,
        width: '100%',
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        shadowOffset: { width: -2, height: 4 },
    },
    marginTop20: {
        marginTop: 20
    },
    bgRed: { 
        backgroundColor: Colors.red
    },
    formInfor: {
        flex: 1,
        marginVertical: 16
    },
    flex1: { 
        flex: 1 
    }
});

export default ModalChangeProduct;