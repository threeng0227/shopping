import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppImages } from "constants/images.constants";
import { Colors } from "constants/colors.constants";
import { Swipeable } from "react-native-gesture-handler";
export const ProductItem = memo(({
    item,
    onChange,
    onEdit,
    onDelete,
}: {
    item: any,
    onChange: (value: any) => void,
    onEdit: (value: any) => void,
    onDelete: (value: any) => void,

}) => {
    const rightSwipeActions = () => {
        return (
            <View style={styles.containerAction}>
                <TouchableOpacity
                    activeOpacity={.75}
                    onPress={() => onDelete(item)}
                    style={[styles.action, {
                        backgroundColor: Colors.red,
                    }]}
                >
                    <Text style={styles.actionText}>
                        {'Delete'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} activeOpacity={.75} onPress={() => onEdit(item)}>
                    <Text style={styles.actionText}>
                        {'Edit'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <Swipeable renderRightActions={rightSwipeActions} key={`ProductItem${item.id}`}>
            <View style={styles.item}>
                <TouchableOpacity
                    activeOpacity={.75}
                    style={{
                        paddingLeft: 16
                    }}
                    onPress={() => onChange({
                        ...item,
                        isChoose: !item.isChoose
                    })}>
                    <View style={styles.itemCheck}>
                        {
                            item.isChoose ? <Image source={AppImages.checked} style={styles.imageChecked} />
                                :
                                null
                        }
                    </View>
                </TouchableOpacity>
                <Image source={AppImages.cake} style={styles.image} />
                <View style={{
                    flex: 1
                }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text
                        numberOfLines={2}
                        style={styles.description}>
                        {item.description}
                    </Text>
                    <Text style={styles.price}>{`$${item.price}`}</Text>
                </View>
            </View>
        </Swipeable>
    );
});
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        paddingRight: 16,
        backgroundColor: 'white',
        marginBottom: 10
    },
    image: {
        width: 60,
        height: 60
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.blackText
    },
    description: {
        flex: 1,
        fontSize: 13,
        color: Colors.blackText
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.blackText
    },
    imageChecked: {
        width: 16,
        height: 16,
        tintColor: Colors.green
    },
    action: {
        backgroundColor: Colors.blueLight,
        justifyContent: 'center',
        paddingHorizontal: 5
    },
    actionText: {
        color: Colors.white,
        paddingHorizontal: 5,
        fontWeight: '600',
    },
    containerAction: {
        flexDirection: 'row',
        marginBottom: 10
    },
    itemCheck: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.grayBold,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
