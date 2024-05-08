import React, { memo, useCallback } from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppImages } from "constants/images.constants";
import { Colors } from "constants/colors.constants";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import RemixIcon from "react-native-remix-icon";
export const CartItem = memo(({
    item,
    index,
    onChangeQuantity,
    onRemoveProductFromCart,
}: {
    item: any,
    index: number,
    onChangeQuantity: (index: number, value: any, type: any) => void,
    onRemoveProductFromCart: (value: any) => void,

}) => {
    console.log('---CartItem', index)
    return (
        <View style={{ marginHorizontal: 16 }}>
            <View style={styles.itemContainer}>
                <Image source={AppImages.cake} style={styles.productImg} />
                <View style={{ flex: 1 }}>
                    <Text numberOfLines={2} style={styles.productLabel}>
                        {item.title}
                    </Text>
                    <Text numberOfLines={2} style={styles.productPrice}>
                        {`$${item.price}`}
                    </Text>
                </View>
                <View style={styles.changeQuantity}>
                    <TouchableOpacity
                        activeOpacity={.75}
                        onPress={() => onChangeQuantity(item, index, 'minus')}
                    >
                        <RemixIcon
                            name="indeterminate-circle-line"
                            size={20}
                            color={Colors.grey_700}
                        />
                    </TouchableOpacity>
                    <View style={styles.quantity}>
                        <Text style={[styles.txtQuantity, {
                            color: Colors.red
                        }]}
                        >
                            {item.quantity}
                        </Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={.75}
                        onPress={() => {
                            onChangeQuantity(item, index, 'add');
                        }}
                    >
                        <RemixIcon
                            name="add-circle-line"
                            size={20}
                            color={Colors.grey_700}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.btnRemove}
                    activeOpacity={0.5}
                    onPress={() => onRemoveProductFromCart(item)}
                >
                    <RemixIcon
                        name="delete-bin-5-line"
                        color={Colors.extra}
                        size={20}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.seperate} />
        </View>
    );
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontWeight: '700',
        fontSize: 28,
        marginLeft: 16,
        marginVertical: 16,
    },
    itemContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        // backgroundColor: 'white',
    },
    productImg: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        marginRight: 8,
    },
    productLabel: {
        fontSize: 16,
        fontWeight: '700',
    },
    seperate: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.LightGray,
        alignSelf: 'center',
        opacity: 0.3,
        marginVertical: 5,
    },
    productPrice: {
        marginVertical: 3,
        lineHeight: 20,
        fontWeight: '600',
        fontSize: 13,
    },
    productDiscountPrice: {
        fontWeight: '600',
        letterSpacing: 1.2,
        fontSize: 11,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnRemove: {
        backgroundColor: Colors.grey_200,
        width: 30,
        height: 30,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8
    },
    changeQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        width: 60,
        alignItems: 'center',
    },
    empty: {
        fontWeight: '600',
        fontSize: 12,
        marginTop: 16,
    },
    bottomCart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.GreySection,
    },
    txtTotal: {
        fontWeight: '600',
        fontSize: 16,
    },
    flex1: {
        flex: 1,
    },
    txtNotFound: {
        flex: 1,
        alignItems: 'center'
    },
    txtQuantity: {
        fontWeight: '600',
        fontSize: 14,
    },
    rowBetween: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    txtPromotion: {
        color: Colors.white,
        fontWeight: '500',
    },
    viewVoucher: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
        marginRight: 16,
        gap: 16
    },
    voucherItem: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.white,
        padding: 5,
    },
    btnDelete: {
        backgroundColor: Colors.white,
        alignSelf: 'flex-start',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        position: 'absolute',
        right: -10,
        top: -10
    },
    header: {
        paddingBottom: 9,
        paddingHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 26
    },
});