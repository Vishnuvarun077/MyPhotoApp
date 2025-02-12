import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import CameraScreen from './screens/CameraScreen';
import PreviewScreen from './screens/PreviewScreen';
import GalleryScreen from './screens/GalleryScreen';
import ImageViewerScreen from './screens/ImageViewerScreen';

export type RootStackParamList = {
  Camera: undefined;
  Preview: { photoUri: string };
  Gallery: undefined;
  ImageViewer: { initialIndex: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Camera" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Preview" component={PreviewScreen} />
          <Stack.Screen name="Gallery" component={GalleryScreen} />
          <Stack.Screen name="ImageViewer" component={ImageViewerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

