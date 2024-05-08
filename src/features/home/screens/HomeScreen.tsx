
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeParamsList } from "domain/types/Navigation";
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppImages } from "constants/images.constants";
import { Colors } from "constants/colors.constants";
import { ProductItem } from "../components/ProductItem";
import { DATA, RandomData } from "mock";
import ModalChangeProduct from "../components/ModalChangeProduct";
import { HeaderApp } from "../components/HeaderApp";
import { useAppSelector } from "redux/store/hooks";
import { selectCartInfor, setCartInfor } from "redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import { store } from "redux/store";
import { ModalLoading } from "../components/ModalLoading";

const LIMIT = 40;

const HomeScreen = ({ }: StackScreenProps<HomeParamsList, 'HomeScreen'>) => {

    const dispatch = useDispatch();
    const carts = useAppSelector(selectCartInfor) ?? [];

    const [isLoading, setLoading] = useState(false);
    const [items, setItems] = useState<RandomData[]>([]);
    const [visible, setVisible] = useState(false);

    const refCurrentIndex = useRef<number>(1);
    const refModalLoading = useRef() as any;
    const refItem = useRef() as any;
    const refTimer = useRef<any>(null);

    useEffect(() => {
        _getData();
        return clearTimeout(refTimer.current)
    }, []);

    const _getData = () => {
        setLoading(true);
        setItems(() => [...items, ...DATA.slice(0, LIMIT)]);
        refCurrentIndex.current += 1;
        refTimer.current = setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const _onAdd = useCallback((value: any) => {
        refModalLoading.current?.showModal?.();
        refTimer.current = setTimeout(() => {
            const newItem = {
                description: value.description,
                title: value.title,
                isChoose: false,
                tax: value.tax,
                price: value.price,
                id: Math.random() + 1,
            };
            setItems(prevItems => [newItem, ...prevItems]);
            refModalLoading.current?.hideModal?.();
        }, 300);
    }, []);

    const _onEdit = useCallback((item: any) => {
        refItem.current = item;
        setVisible(true);
    }, []);

    const _onDeleted = useCallback((value: any) => {
        Alert.alert('Message', 'Are you sure you want to DELETE?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            {
                text: 'YES', onPress: () => {
                    refModalLoading.current?.showModal?.();
                    refTimer.current = setTimeout(() => {
                        const currentCart = [...store.getState().user.carts ?? []];
                        const exist = currentCart.findIndex((x) => x.id === value.id);
                        setItems(prevItems => prevItems.filter(x => x.id !== value.id));
                        if (exist != -1) {
                            dispatch(setCartInfor(currentCart?.filter(x => x.id !== value.id)));
                        }
                        refModalLoading.current?.hideModal?.();
                    }, 300);
                }
            },
        ]);
    }, []);

    const _onAddToCart = () => {
        const currentCart = [...carts];
        items.forEach((e) => {
            if(e.isChoose === true) {
                const exist = currentCart.findIndex((x) => x.id === e.id);
                if (exist != -1) {
                    currentCart[exist] = {
                        ...currentCart[exist],
                        quantity: currentCart[exist].quantity + 1
                    }
                } else {
                    currentCart.push({
                        ...e,
                        quantity: 1
                    });
                }
            }
        });
        dispatch(setCartInfor([...currentCart]));
        setItems(prevItems => prevItems.map((item, index) => {
            return item.isChoose === false ? item : {
                ...item,
                isChoose: false
            }
        }));
    };

    const _onAddProduct = () => {
            refItem.current = null;
            setVisible(true);
    };

    const _onChange = useCallback((value: { description: any; title: any; isChoose: any; price: any; tax: number, id: number }) => {
        setItems(prevItems => prevItems.map((item, index) => {
            return item.id !== value.id ? item : {
                description: value.description,
                title: value.title,
                isChoose: value.isChoose,
                tax: value.tax,
                price: value.price,
                id: value.id,
            }
        }));
    }, []);

    const _onLoadMore = () => {
        if (!isLoading && (DATA.length > LIMIT * (refCurrentIndex.current - 1))) {
            setLoading(true);
            setItems(() => [...items, ...DATA.slice(LIMIT * (refCurrentIndex.current - 1), LIMIT * refCurrentIndex.current)]);
            refCurrentIndex.current += 1;
            setLoading(false);
        }
    }

    const isAddCart = items.find(x => x.isChoose === true);

    return (
        <View style={styles.container}>
            <HeaderApp />
            <FlatList
                data={items}
                onEndReachedThreshold={.5}
                onEndReached={_onLoadMore}
                showsVerticalScrollIndicator={false}
                disableVirtualization
                windowSize={items.length > 50 ? items.length / 4 : 39}
                keyExtractor={(item: any, index: any) => `HomeScreen${item.id}${index}`}
                ListEmptyComponent={() => {
                    return (
                        <Text style={styles.txtNotFound}>{'Data Not Found!'}</Text>
                    );
                }}
                renderItem={({ item, index }) => <ProductItem
                    item={item}
                    onChange={_onChange}
                    onEdit={_onEdit}
                    onDelete={_onDeleted}
                />}
                ItemSeparatorComponent={() => <View style={styles.hr} />}
                ListFooterComponent={() => isLoading ? <ActivityIndicator color={Colors.red} size={'small'} style={{ marginVertical: 16 }} /> : null}
            />

            <TouchableOpacity
                onPress={_onAddProduct}
                style={styles.btnAdd}>
                <Image source={AppImages.add} style={styles.iconPlus} />
            </TouchableOpacity>

            {isAddCart ? <TouchableOpacity
                activeOpacity={.75}
                onPress={_onAddToCart}
                style={styles.btnAddToCart}>
                <Text style={styles.txtAddToCart}>{'Add to cart'}</Text>
            </TouchableOpacity>
                :
                null
            }
            <ModalChangeProduct
                visible={visible}
                setVisible={setVisible}
                data={refItem.current}
                onAdd={_onAdd}
                onEdit={_onChange}
            />
            <ModalLoading ref={refModalLoading} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    btnAdd: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        bottom: 10,
        right: 16
    },
    btnAddToCart: {
        position: 'absolute',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        alignSelf: 'center',
        bottom: 10,
    },
    iconPlus: {
        width: 40,
        height: 40
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.grayBorder,
        marginBottom: 10
    },
    txtAddToCart: {
        color: Colors.white,
        fontWeight: '600',
        fontSize: 14
    },
    txtNotFound: { 
        textAlign: 'center', 
        marginVertical: 16,
    }
});
export default HomeScreen;