
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Alert, View, Text, FlatList, StyleSheet, Image, TextInput } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { HomeParamsList } from "domain/types/Navigation";
import { useAppSelector } from "redux/store/hooks";
import { selectCartInfor, selectUserInfor, setCartInfor, setOrdersInfor } from "redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import RemixIcon from "react-native-remix-icon";
import { NavigationService } from "services/NavigationService";
import { Colors } from "constants/colors.constants";
import { ButtonComponent } from "../components/ButtonComponent";
import { AppImages } from "constants/images.constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CartItem } from "../components/CartItem";
import { current } from "@reduxjs/toolkit";
import { store } from "redux/store";

const CartScreen = ({ }: StackScreenProps<HomeParamsList, 'CartScreen'>) => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const refInputValue = useRef(0);
    const carts = useAppSelector(selectCartInfor) ?? [];
    const user = useAppSelector(selectUserInfor);
    const [discount, setDiscount] = useState(0);
    const total = useMemo(() => {
        if (carts?.length) {
            return carts
                .map(
                    (item) =>
                        item.price * item.quantity,
                )
                .reduce((a, b) => a + b);
        }
        return 0;
    }, [carts]);

    const onRemoveProductFromCart = useCallback((item: any) => {
        Alert.alert('Message', 'Are you sure you want to DELETE?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            {
                text: 'YES', onPress: () => {
                    const currentCart = [...carts];
                    const exist = currentCart.findIndex((x) => x.id === item.id);
                    if (exist != -1) {
                        dispatch(setCartInfor(currentCart?.filter(x => x.id !== item.id)));
                    }
                }
            },
        ]);
    }, []);

    const _goToCheckOut = () => {
        if(user?.name){
            dispatch(setOrdersInfor({
                data: carts,
                discount: discount
            }));
            NavigationService.replace('OrderDetailScreen', {});
            dispatch(setCartInfor([]));
        } else {
            Alert.alert('Please Register!')
        }
      
    }

    const _onChange = (e: any) => {
        refInputValue.current = e;
    }

    const _onBlur = () => {
        setDiscount(refInputValue.current);
    }

    const onChangeQuantity = useCallback((
        item: any,
        index: number,
        type: 'minus' | 'add',
    ) => {
        const currentCart = [...store.getState().user.carts ?? []];
        if (type === 'minus' && currentCart[index]?.quantity > 0) {
            if (currentCart[index].quantity === 1) {
                onRemoveProductFromCart(currentCart[index]);
                return;
            }
            currentCart[index] = { ...currentCart[index], quantity: currentCart[index].quantity - 1 };
        } else {
            currentCart[index] = { ...currentCart[index], quantity: currentCart[index].quantity + 1 };
        }
        dispatch(setCartInfor(currentCart));
    }, []);

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
                <Text style={styles.txtTitle}>{'Cart'}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {_header()}
            <FlatList
                data={carts}
                renderItem={({ item, index }) => <CartItem
                    item={item}
                    index={index}
                    onChangeQuantity={onChangeQuantity}
                    onRemoveProductFromCart={onRemoveProductFromCart}
                />}
                keyExtractor={(item: any, index: any) => `CartScreen${index}`}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListEmptyComponent={
                    <View style={styles.txtNotFound}>
                        <Text style={styles.empty}>{'Data not found!'}</Text>
                    </View>
                }
                extraData={carts}
                style={styles.flex1}
            />
            <View style={[styles.rowBetween, styles.viewDiscount]}>
                <Text style={styles.txtDiscount}>{'Discount (%)'}</Text>
                <TextInput
                    keyboardType={'numeric'}
                    onBlur={_onBlur}
                    onChangeText={_onChange}
                    style={styles.valueDiscount}
                />
            </View>
            <View style={[styles.bottomCart, {
                marginBottom: 16
            }]}>
                <View>
                    <Text style={{ fontWeight: '600' }}>
                        {'Total'}
                    </Text>
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
                <ButtonComponent
                    disabled={carts.length ? false : true}
                    style={styles.btnOrder}
                    title={'Order Now'}
                    onPress={_goToCheckOut}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    txtDiscount: {
        fontSize: 16,
        fontWeight: '700',
    },
    row: {
        flexDirection: 'row',
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
    rowBetween: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
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
    valueDiscount: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.border,
        width: 100,
        height: 46,
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 15
    },
    viewDiscount: {
        paddingHorizontal: 16,
        alignItems: 'center',
        marginBottom: 10
    },
    btnOrder: {
        width: '50%',
        backgroundColor: Colors.red
    }
});

export default CartScreen;