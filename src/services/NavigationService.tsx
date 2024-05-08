import {
  StackActions,
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const NavigationService = {
  goBack: () => navigationRef.current?.goBack(),
  route: navigationRef.current?.getCurrentRoute(),
  dispatch: (name: any) => navigationRef.current?.dispatch(name),
  navigate: (route: any, params?: any) =>
    navigationRef.current?.navigate(route, params),
  replace: (name: string, params?: any) =>
    navigationRef.current?.dispatch(StackActions.replace(name, params)),
  reset: (name: string, params?: any) =>
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name,
            params,
          },
        ],
      }),
    ),
};
