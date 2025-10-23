/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

global.IS_REACT_ACT_ENVIRONMENT = true;
// Suppress the `react-test-renderer` warnings until New Architecture and legacy
// mode are no longer supported by React Native.
global.IS_REACT_NATIVE_TEST_ENVIRONMENT = true;

import '@react-native/js-polyfills/error-guard';

import mock from './node_modules/react-native/jest/mock';

// $FlowIgnore[cannot-write]
Object.defineProperties(global, {
  __DEV__: {
    configurable: true,
    enumerable: true,
    value: true,
    writable: true,
  },
  cancelAnimationFrame: {
    configurable: true,
    enumerable: true,
    value: function(id) {
      return clearTimeout(id);
    },
    writable: true,
  },
  nativeFabricUIManager: {
    configurable: true,
    enumerable: true,
    value: {},
    writable: true,
  },
  performance: {
    configurable: true,
    enumerable: true,
    value: {
      // $FlowIgnore[method-unbinding]
      now: jest.fn(Date.now),
    },
    writable: true,
  },
  regeneratorRuntime: {
    configurable: true,
    enumerable: true,
    value: jest.requireActual('regenerator-runtime/runtime'),
    writable: true,
  },
  requestAnimationFrame: {
    configurable: true,
    enumerable: true,
    value: function(callback) {
      return setTimeout(() => callback(jest.now()), 0);
    },
    writable: true,
  },
  // Comment out window definition to avoid redefinition error
  // window: {
  //   configurable: true,
  //   enumerable: true,
  //   value: global,
  //   writable: true,
  // },
});

// $FlowFixMe[incompatible-call] - `./mocks/AppState` is incomplete.
mock('m#../Libraries/AppState/AppState', 'm#./node_modules/react-native/jest/mocks/AppState');
mock('m#../Libraries/BatchedBridge/NativeModules', 'm#./node_modules/react-native/jest/mocks/NativeModules');
mock(
  'm#../Libraries/Components/AccessibilityInfo/AccessibilityInfo',
  'm#./node_modules/react-native/jest/mocks/AccessibilityInfo',
);
mock(
  'm#../Libraries/Components/ActivityIndicator/ActivityIndicator',
  'm#./node_modules/react-native/jest/mocks/ActivityIndicator',
);
mock('m#../Libraries/Components/Clipboard/Clipboard', 'm#./node_modules/react-native/jest/mocks/Clipboard');
mock(
  'm#../Libraries/Components/RefreshControl/RefreshControl',
  // $FlowFixMe[incompatible-call] - `../Libraries/Components/RefreshControl/RefreshControl` should export a component type.
  'm#./node_modules/react-native/jest/mocks/RefreshControl',
);
// $FlowFixMe[incompatible-exact] - `../Libraries/Components/ScrollView/ScrollView` is... I don't even.
// $FlowFixMe[prop-missing]
mock('m#../Libraries/Components/ScrollView/ScrollView', 'm#./node_modules/react-native/jest/mocks/ScrollView');
mock('m#../Libraries/Components/TextInput/TextInput', 'm#./node_modules/react-native/jest/mocks/TextInput');
mock('m#../Libraries/Components/View/View', 'm#./node_modules/react-native/jest/mocks/View');
mock(
  'm#../Libraries/Components/View/ViewNativeComponent',
  // $FlowFixMe[incompatible-call] - `./mocks/ViewNativeComponent` is incomplete.
  // $FlowFixMe[prop-missing]
  'm#./node_modules/react-native/jest/mocks/ViewNativeComponent',
);
mock('m#../Libraries/Core/InitializeCore', 'm#./node_modules/react-native/jest/mocks/InitializeCore');
mock('m#../Libraries/Core/NativeExceptionsManager');
mock('m#../Libraries/Image/Image', 'm#./node_modules/react-native/jest/mocks/Image');
// $FlowFixMe[incompatible-call] - `./mocks/Linking` is incomplete.
mock('m#../Libraries/Linking/Linking', 'm#./node_modules/react-native/jest/mocks/Linking');
// $FlowFixMe[incompatible-call] - `../Libraries/Modal/Modal` should export a component type.
mock('m#../Libraries/Modal/Modal', 'm#./node_modules/react-native/jest/mocks/Modal');
mock(
  'm#../Libraries/NativeComponent/NativeComponentRegistry',
  // $FlowFixMe[prop-missing] - `./mocks/NativeComponentRegistry` should export named functions.
  'm#./node_modules/react-native/jest/mocks/NativeComponentRegistry',
);
// $FlowFixMe[prop-missing] - `./mocks/RendererProxy` is incomplete.
mock('m#../Libraries/ReactNative/RendererProxy', 'm#./node_modules/react-native/jest/mocks/RendererProxy');
mock(
  'm#../Libraries/ReactNative/requireNativeComponent',
  'm#./node_modules/react-native/jest/mocks/requireNativeComponent',
);
// $FlowFixMe[prop-missing] - `./mocks/UIManager` is incomplete.
mock('m#../Libraries/ReactNative/UIManager', 'm#./node_modules/react-native/jest/mocks/UIManager');
mock('m#../Libraries/Text/Text', 'm#./node_modules/react-native/jest/mocks/Text');
mock('m#../Libraries/Utilities/useColorScheme', 'm#./node_modules/react-native/jest/mocks/useColorScheme');
// $FlowFixMe[incompatible-call]
mock('m#../Libraries/Vibration/Vibration', 'm#./node_modules/react-native/jest/mocks/Vibration');

// Set window to global to avoid redefinition
if (typeof window === 'undefined') {
  global.window = global;
}

// Prevent window redefinition by making it non-configurable
Object.defineProperty(global, 'window', {
  value: global,
  writable: false,
  configurable: false,
});
