import React, { useMemo } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { HomeParamsList } from "domain/types/Navigation";
import { Colors } from "constants/colors.constants";
import { useAppSelector } from "redux/store/hooks";
import { selectDiscountOrder, selectOrdersInfor, selectUserInfor } from "redux/reducers/userReducer";
import { AppImages } from "constants/images.constants";
import RemixIcon from "react-native-remix-icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationService } from "services/NavigationService";

const OrderDetailScreen = ({ navigation, route }: StackScreenProps<HomeParamsList, 'OrderDetailScreen'>) => {
    const insets = useSafeAreaInsets();
    const data = useAppSelector(selectOrdersInfor) ?? [];
    const user = useAppSelector(selectUserInfor);
    const discount = useAppSelector(selectDiscountOrder);
    const total = useMemo(() => {
        if (data?.length) {
            return data
                .map(
                    (item) =>
                        item.price * item.quantity,
                )
                .reduce((a, b) => a + b);
        }
        return 0;
    }, [data]);

    const _header = () => {
        return (
            <View style={[
                styles.header,
                {
                    paddingTop: insets.top + 15,
                    backgroundColor: Colors.red,
                },
            ]}
            >
                <TouchableOpacity onPress={() => NavigationService.goBack()} >
                    <RemixIcon name={'arrow-left-line'} color={'white'} size={27} />
                </TouchableOpacity>
                <Text style={styles.txtTitle}>{'Order Detail'}</Text>
            </View>
        );
    };
    const _customerInfor = () => {
        return (
            <View style={{
                paddingHorizontal: 20,
                paddingVertical: 16,
            }}>
                <Text style={[styles.txtBlock, { color: Colors.red, marginBottom: 10 }]}>
                    {'Customer infor'}
                </Text>
                <View style={styles.rowBetween}>
                    <Text>{`Name`}</Text>
                    <Text style={styles.fontweight600}>{`${user?.name}`}</Text>
                </View>
                <View style={styles.hr} />
                <View style={styles.rowBetween}>
                    <Text>{`Phone`}</Text>
                    <Text style={styles.fontweight600}>{`${user?.phone}`}</Text>
                </View>
                <View style={styles.hr} />
                <View style={styles.rowBetween}>
                    <Text>{`Email`}</Text>
                    <Text style={styles.fontweight600}>{`${user?.email}`}</Text>
                </View>
                <View style={styles.hr} />
                <View style={styles.rowBetween}>
                    <Text>{`Address`}</Text>
                    <Text style={styles.fontweight600}>{`${user?.address}`}</Text>
                </View>
                <View style={styles.hr} />
            </View>
        );
    };
    const _cartInfor = () => {
        return (
            <View style={{
                paddingHorizontal: 16,
                marginBottom: 16
            }}>
                <Text
                    style={[
                        styles.txtBlock,
                        {
                            color: Colors.red,
                            marginBottom: 16
                        },
                    ]}
                >
                    {'Order detail'}
                </Text>
                {data.length ? data.map((item, index) => {
                    return (
                        <View key={`ItemListDetail${index}`}>
                            <View style={styles.rowCenter}>
                                <Image source={AppImages.cake} style={styles.imageProduct} />
                                <View
                                    style={{
                                        flex: 1,
                                        marginLeft: 8,
                                    }}
                                >
                                    <Text style={{ fontWeight: '700' }}>
                                        {item.title}
                                    </Text>
                                    <View
                                        style={[
                                            styles.rowBetween,
                                            {
                                                paddingVertical: 2,
                                            },
                                        ]}
                                    >
                                        <Text>{`Quantity:  ${item.quantity}`}</Text>
                                        <Text style={styles.txtBlock}>{`Price: $${item.price}`}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.hr} />
                        </View>
                    );
                }) :
                    null
                }
                <View style={styles.rowBetween}>
                    <Text style={styles.txtBlock}>{'Discount (%)'}</Text>
                    <Text style={styles.txtBlock}>{discount}</Text>
                </View>
                <View style={[styles.rowBetween, { marginTop: 10 }]}>
                    <Text style={styles.txtBlock}>
                        {'Total'}
                    </Text>
                    <View>
                        <Text style={[styles.txtTotal, {
                            color: Colors.red,
                            textDecorationLine: discount > 0 ? 'line-through' : 'none'
                        }]}>
                            {`$${total}`}
                        </Text>
                        {discount > 0 ? <Text style={[styles.txtTotal, {
                            color: Colors.red
                        }]}>
                            {`$${(total - (total * (discount / 100))) > 0 ? (total - (total * (discount / 100))).toFixed(2) : 0}`}
                        </Text> : null}
                    </View>

                </View>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            {_header()}
            <ScrollView>
                {_customerInfor()}
                {_cartInfor()}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        paddingBottom: 9,
        paddingHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 26
    },
    txtTitle: {
        fontWeight: '600',
        color: 'white',
        fontSize: 20
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    txtBlock: {
        fontSize: 16,
        fontWeight: '700'
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    line: {
        height: 7,
        width: 2,
        backgroundColor: Colors.grey_600,
        marginLeft: 15,
        marginVertical: 5,
        borderRadius: 2,
    },
    step: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fontweight600: {
        fontWeight: '600',
    },
    hr: {
        height: 1,
        backgroundColor: Colors.GreySection,
        marginVertical: 16,
    },
    btnCall: {
        borderWidth: 1,
        borderRadius: 20,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16 / 1.5,
        marginVertical: 16 * 2,
    },
    imageProduct: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    txtTotal: {
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'right'
    },
});

export default OrderDetailScreen;