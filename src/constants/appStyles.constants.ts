import { StyleSheet } from "react-native";
import { Colors } from "./colors.constants";

export const AppStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    flex1: {
        flex: 1
    },
    top16: {
        marginTop: 16
    },
    paddingHorizontalApp: {
        paddingHorizontal: 16
    },
    rowBetweenCenter: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textRegular: {
        fontSize: 13,
        color: Colors.blackText,
    },

    textMedium: {
        fontSize: 13,
        color: Colors.blackText,
    },
    textBold: {
        fontSize: 13,
        color: Colors.blackText,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row'
    }
});