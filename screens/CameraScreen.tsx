// MyPhotoApp/screens/CameraScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import usePhotoHandler from '../hooks/usePhotoHandler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type CameraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;

type Props = {
  navigation: CameraScreenNavigationProp;
};

const CameraScreen: React.FC<Props> = ({ navigation }) => {
  const { photo, takePhoto, pickImage } = usePhotoHandler();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Take Photo" onPress={takePhoto} />
        <Button title="Pick an Image" onPress={pickImage} containerStyle={styles.buttonSpacing} />
        {photo && (
          <Button
            title="Preview Photo"
            onPress={() => navigation.navigate('Preview', { photoUri: photo.uri })}
            containerStyle={styles.buttonSpacing}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 16 },
  buttonContainer: { width: '100%' },
  buttonSpacing: { marginTop: 16 },
});

export default CameraScreen;
