import { Colors } from 'constants/colors.constants';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';

export const ModalLoading = forwardRef(({}, ref) => {
  const [loading, setLoadingModal] = useState(false);
  useImperativeHandle(ref,() => {
    return {
      showModal,
      hideModal,
    }
  });
  
  const showModal = () => setLoadingModal(true);
  const hideModal = () => setLoadingModal(false);

  return (
    <Modal visible={loading} transparent>
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={Colors.red} />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.opacity,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
