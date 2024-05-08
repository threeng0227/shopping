import { Colors } from 'constants/colors.constants';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RemixIcon from 'react-native-remix-icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { selectCartInfor, selectUserInfor } from 'redux/reducers/userReducer';
import { useAppSelector } from 'redux/store/hooks';
import { NavigationService } from 'services/NavigationService';

export const HeaderApp = () => {
  const user = useAppSelector(selectUserInfor);
  const carts = useAppSelector(selectCartInfor) ?? [];
  const insets = useSafeAreaInsets();
  const badge = carts?.length && carts.map(x => x.quantity).reduce((a, b) => a + b);

  const _goToCart = () => { 
    NavigationService.navigate('CartScreen', {});
  };

  const _goToProfile = () => {
    NavigationService.navigate('ChangeProfileScreen', {});
  };

  return (
    <View style={[styles.row, { paddingTop: insets.top + 10 }]}>
      {
        user?.name ?
          <TouchableOpacity
            onPress={_goToProfile}
            style={styles.buttonAuthen}
          >
            <Text style={styles.txtName}>{`Hello, `}<Text style={{ fontWeight: '900' }}>{user?.name}</Text></Text>
          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={_goToProfile}
            style={styles.buttonAuthen}
          >
            <Text style={styles.title}>{'Register'}</Text>
          </TouchableOpacity>
      }
      <TouchableOpacity onPress={_goToCart} activeOpacity={.75} >
        <RemixIcon
          name="shopping-cart-2-line"
          size={25}
          color={Colors.white}
        />
        <View
          style={styles.noti}
        >
          <Text style={styles.txtBadge}>{badge > 99 ? '99+' : badge }</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: Colors.red,
    marginBottom: 10
  },
  buttonAuthen: {
    paddingVertical: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
  noti: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.orange,
  },
  txtBadge: { 
    color: Colors.white,
    fontSize: 11
  },
  txtName: {
    fontSize: 14,
    color: Colors.white
  }
});
