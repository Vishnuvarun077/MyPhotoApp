import React from 'react';
import { View, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type PreviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Preview'>;

type Props = {
  route: { params: { photoUri: string } };
  navigation: PreviewScreenNavigationProp;
};

const PreviewScreen: React.FC<Props> = ({ route, navigation }) => {
  const { photoUri } = route.params;

  // Save the photo only if it is not already saved.
  const savePhoto = async () => {
    try {
      const storedPhotos = await AsyncStorage.getItem('photos');
      let photos = storedPhotos ? JSON.parse(storedPhotos) : [];
      // Check if the photo is already in the gallery.
      if (photos.some((p: { uri: string }) => p.uri === photoUri)) {
        Alert.alert('This photo is already saved.');
      } else {
        photos.push({ uri: photoUri });
        await AsyncStorage.setItem('photos', JSON.stringify(photos));
      }
      navigation.navigate('Gallery');
    } catch (error) {
      console.error('Error saving photo:', error);
    }
  };

  // Discard returns to the Camera screen.
  const discardPhoto = () => {
    navigation.navigate('Camera');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.image} resizeMode="contain" />
      <Button title="Save Photo" onPress={savePhoto} containerStyle={styles.buttonSpacing} />
      <Button title="Discard Photo" onPress={discardPhoto} containerStyle={styles.buttonSpacing} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  image: { 
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height / 2 
  },
  buttonSpacing: { 
    marginTop: 16 
  },
});

export default PreviewScreen;
