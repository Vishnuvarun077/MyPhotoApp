// MyPhotoApp/hooks/usePhotoHandler.ts
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export type Photo = {
  uri: string;
};

const usePhotoHandler = () => {
  const [photo, setPhoto] = useState<Photo | null>(null);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  };

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  };

  const takePhoto = async () => {
    if (!(await requestCameraPermission())) {
      alert('Camera permission denied');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      // result.assets is an array; grab the first photo
      setPhoto({ uri: result.assets[0].uri });
    }
  };

  const pickImage = async () => {
    if (!(await requestMediaLibraryPermission())) {
      alert('Media library permission denied');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto({ uri: result.assets[0].uri });
    }
  };

  const clearPhoto = () => setPhoto(null);

  return { photo, takePhoto, pickImage, clearPhoto, setPhoto };
};

export default usePhotoHandler;
