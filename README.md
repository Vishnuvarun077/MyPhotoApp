# My Photo App

A React Native (Expo) mobile application that allows users to capture photos, pick images from their gallery, preview them, and save unique photos to a gallery. The gallery displays saved images using a grid view, and individual images can be viewed in full screen with swipe navigation.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Screens and Flow](#screens-and-flow)
- [Dependencies](#dependencies)
- [Git Workflow](#git-workflow)
- [License](#license)

## Overview

This project demonstrates the following functionality:
- **Camera and Image Picker Integration:** Users can either take a new photo or pick an image from their device. Both actions allow for editing/cropping before proceeding.
- **Preview Screen:** After capturing or picking an image, a preview screen is shown where the user can choose to save or discard the photo.
- **Gallery:** Saved images are displayed in a grid view. When a thumbnail is tapped, the app navigates to an image viewer that supports horizontal swipe navigation between individual images.
- **Navigation:** Clear separation between screens with the ability to return to the main camera page.

## Features

- **Take Photo:** Opens the device camera with editing enabled.
- **Pick Image:** Opens the device gallery with editing enabled.
- **Preview:** Shows the selected image with two options:
  - Save Photo (only if the photo is unique)
  - Discard Photo
- **Gallery View:**
  - Displays all saved photos in a three-column grid.
  - “Back to Main Page” button returns to the camera screen.
- **Image Viewer:**
  - Full-screen swipe-enabled view for individual photos.
  - “Back to Gallery” button returns to the gallery grid.

## Project Structure

```
MyPhotoApp/
├── assets/                  # Static assets (if required)
├── components/
│   └── Button.tsx           # Reusable button component
├── hooks/
│   └── usePhotoHandler.ts   # Custom hook for camera and image picker functions
├── screens/
│   ├── CameraScreen.tsx     # Main screen with Take Photo, Pick Image, and Go to Gallery buttons
│   ├── PreviewScreen.tsx    # Preview screen to save or discard the selected image
│   ├── GalleryScreen.tsx    # Gallery grid view of saved photos
│   └── ImageViewerScreen.tsx# Full-screen image viewer with swipe support
├── App.tsx                  # Main app file and navigation configuration
└── README.md                # Project documentation (this file)
```

## Installation and Setup

1. **Clone the Repository:**

   ```
   git clone <repository-url>
   cd MyPhotoApp
   ```

2. **Install Dependencies:**

   Ensure you have Node.js and Expo CLI installed. Then run:

   ```
   npm install
   # or if using yarn:
   yarn install
   ```

3. **Start the App:**

   ```
   npx expo start
   ```

   This command will launch the Expo developer tools in your browser. You can then run the app on an emulator or on your physical device.

## Usage

- On the **Camera Screen**, use the three primary buttons:
  - **Take Photo:** Opens the camera to capture a new photo.
  - **Pick Image:** Opens the gallery to choose an image.
  - **Go to Gallery:** Navigates to the gallery grid view.
- After taking or picking a photo, you will be shown a **Preview** of the image:
  - **Save Photo:** Saves the image (if not a duplicate) and navigates to the Gallery.
  - **Discard Photo:** Discards the image and returns to the Camera Screen.
- In the **Gallery Screen**, swipe through the grid of saved images. Tapping on an image will open the **Image Viewer**:
  - **Image Viewer:** Allows horizontal swiping between full-screen images. Pressing "Back to Gallery" returns to the grid.
- In the grid view, a **Back to Main Page** button navigates back to the Camera Screen.

## Screens and Flow

1. **CameraScreen:**  
   Contains buttons for taking a photo, picking an image, and navigating to the gallery.
   
2. **PreviewScreen:**  
   Displays the selected image with options to save or discard. On saving, checks duplicates before adding the photo to the gallery using AsyncStorage.
   
3. **GalleryScreen:**  
   Fetches all saved images from AsyncStorage and displays them in a three-column grid. Provides a button to return to the Camera Screen.
   
4. **ImageViewerScreen:**  
   Opens the selected image in full-screen mode with swipe gestures enabled for browsing through images. Includes a “Back to Gallery” button.

## Dependencies

- [Expo](https://expo.dev/) — For building, developing, and deploying the React Native app.
- [React Navigation](https://reactnavigation.org/) — For navigation between screens.
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage) — To store and fetch saved images locally.
- [Expo ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) — For camera and image selection functionality.
- [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context) — To manage safe areas in the UI.
- [React Native Gesture Handler](https://github.com/software-mansion/react-native-gesture-handler) — (If needed) to enhance gesture handling.

## Git Workflow

A sample Git workflow:
1. **Initialize repository and commit base structure:**

   ```
   git init
   git add .
   git commit -m "Initialize project with base folder structure and navigation configuration"
   ```

2. **Commit incremental feature implementations:**

   ```
   git add App.tsx components/Button.tsx hooks/usePhotoHandler.ts screens/CameraScreen.tsx
   git commit -m "Add CameraScreen with photo capture and image picker functionality"
   
   git add screens/PreviewScreen.tsx
   git commit -m "Implement PreviewScreen with save/discard functionality"
   
   git add screens/GalleryScreen.tsx screens/ImageViewerScreen.tsx
   git commit -m "Implement swipable Gallery and Image Viewer screens"
   ```
3. **Push to Remote Repository (if configured):**

   ```
   git remote add origin <repository-url>
   git push -u origin master
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

