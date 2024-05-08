import React, { useCallback, useMemo, useRef, useState } from "react";
import { Alert, View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CartItem } from "../components/CartItem";
import { store } from "redux/store";

const CartScreen = ({ }: StackScreenProps<HomeParamsList, 'CartScreen'>) => {
    const insets = useSafeAreaInsets();

    const dispatch = useDispatch();

    const carts = useAppSelector(selectCartInfor) ?? [];
    const user = useAppSelector(selectUserInfor);

    const refInputValue = useRef(0);

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

    const _onRemoveProductFromCart = useCallback((item: any) => {
        Alert.alert('Message', 'Are you sure you want to DELETE?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            {
                text: 'YES', onPress: () => {
                    const currentCart = [...store.getState().user.carts ?? []];
                    const exist = currentCart.findIndex((x) => x.id === item.id);
                    if (exist != -1) {
                        dispatch(setCartInfor(currentCart?.filter(x => x.id !== item.id)));
                    }
                }
            },
        ]);
    }, []);

    const _goToCheckOut = () => {
        if (user?.name) {
            dispatch(setOrdersInfor({
                data: carts,
                discount: refInputValue.current
            }));
            NavigationService.replace('OrderDetailScreen', {});
            dispatch(setCartInfor([]));
        } else {
            Alert.alert('Please Register!')
        }

    };

    const _onChange = (e: any) => {
        refInputValue.current = e;
    };

    const _onBlur = () => {
        setDiscount(refInputValue.current);
    };

    const _onChangeQuantity = useCallback((
        index: number,
        type: 'minus' | 'add',
    ) => {
        const currentCart = [...store.getState().user.carts ?? []];
        if (type === 'minus' && currentCart[index]?.quantity > 0) {
            if (currentCart[index].quantity === 1) {
                _onRemoveProductFromCart(currentCart[index]);
                return;
            }
            currentCart[index] = { ...currentCart[index], quantity: currentCart[index].quantity - 1 };
        } else {
            currentCart[index] = { ...currentCart[index], quantity: currentCart[index].quantity + 1 };
        }
        dispatch(setCartInfor(currentCart));
    }, []);

    const _header = useCallback(() => {
        return (
            <View style={[
                styles.header,
                {
                    paddingTop: insets.top + 15,
                },
            ]}>
                <TouchableOpacity onPress={() => NavigationService.goBack()} >
                    <RemixIcon name={'arrow-left-line'} color={'white'} size={27} />
                </TouchableOpacity>
                <Text style={styles.txtTitle}>{'Cart'}</Text>
            </View>
        );
    }, []);

    return (
        <View style={styles.container}>
            {_header()}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={carts}
                renderItem={({ item, index }) => <CartItem
                    item={item}
                    index={index}
                    onChangeQuantity={_onChangeQuantity}
                    onRemoveProductFromCart={_onRemoveProductFromCart}
                />}
                keyExtractor={(item: any, index: any) => `CartScreen${index}`}
                contentContainerStyle={styles.padding}
                ListEmptyComponent={
                    <View style={styles.txtNotFound}>
                        <Text style={styles.empty}>{'Data not found!'}</Text>
                    </View>
                }
                extraData={carts}
                style={styles.flex1}
            />
            {
                carts?.length ?
                    <View style={[styles.rowBetween, styles.viewDiscount]}>
                        <Text style={styles.txtDiscount}>{'Discount (%)'}</Text>
                        <TextInput
                            keyboardType={'numeric'}
                            onBlur={_onBlur}
                            onChangeText={_onChange}
                            style={styles.valueDiscount}
                        />
                    </View>
                    :
                    null
            }
            <View style={styles.bottomCart}>
                <View>
                    <Text style={styles.fontWeight600}>
                        {'Total'}
                    </Text>
                    <Text style={[styles.txtTotal, styles.colorRed, {
                        textDecorationLine: discount > 0 ? 'line-through' : 'none'
                    }]}>
                        {`$${total}`}
                    </Text>
                    {discount > 0 ? <Text style={[styles.txtTotal, styles.colorRed]}>
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
    colorRed: {
        color: Colors.red
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
        fontSize: 14,
        marginTop: 16,
    },
    bottomCart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.GreySection,
        marginBottom: 16,
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
        gap: 26,
        backgroundColor: Colors.red
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
    },
    padding: { 
        paddingBottom: 100
    },
    fontWeight600: { 
        fontWeight: '600',
    }
});

export default CartScreen;