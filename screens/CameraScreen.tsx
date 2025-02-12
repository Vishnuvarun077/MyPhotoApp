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
  const { takePhoto, pickImage } = usePhotoHandler();

  // Launch camera for taking a new photo with editing enabled
  const handleTakePhoto = async () => {
    const photoUri = await takePhoto();
    if (photoUri) {
      navigation.navigate('Preview', { photoUri });
    }
  };

  // Launch image picker from gallery with editing enabled
  const handlePickImage = async () => {
    const photoUri = await pickImage();
    if (photoUri) {
      navigation.navigate('Preview', { photoUri });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Take Photo" onPress={handleTakePhoto} />
        <Button title="Pick Image" onPress={handlePickImage} containerStyle={styles.buttonSpacing} />
        <Button title="Go to Gallery" onPress={() => navigation.navigate('Gallery')} containerStyle={styles.buttonSpacing} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 16 
  },
  buttonContainer: { 
    width: '100%' 
  },
  buttonSpacing: { 
    marginTop: 16 
  },
});

export default CameraScreen;
