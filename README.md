# 💿 AlbumExplorer: React Native Album and Track Browser

## 🚀 Overview

AlbumExplorer is a modern cross-platform mobile application built with React Native and TypeScript. It serves as a browser for music and media, fetching data from the iTunes Search API to display all results (albums, tracks, movies, etc.) by a featured artist (currently "Jack Johnson").

The project focuses on implementing robust mobile navigation, managing asynchronous data fetching, and maintaining a clean, performant user interface. A significant effort was made to ensure the testing environment is correctly configured to handle native module dependencies.

## ✨ Features

* **Universal Data Fetching:** Retrieves and processes all media types (Tracks, Collections, Movies, etc.) from the iTunes Search API without filtering.
* **Responsive UI:** Displays content in a clean, multi-column grid layout that adapts to screen dimensions.
* **Native Stack Navigation:** Utilizes `@react-navigation/native-stack` for high-performance screen transitions.
* **Image Optimization:** Manipulates raw image URLs to fetch higher-resolution artwork.
* **Robust Testing:** Includes unit tests for the API service and integration tests for the main navigation stack.

## 🛠️ Technologies Used

* **Platform:** React Native / TypeScript
* **Navigation:** `@react-navigation/native-stack`
* **Networking:** Native `fetch` API
* **Testing:** Jest, React Test Renderer

## 💻 Setup and Installation

Follow these steps to set up and run the project locally.

### Prerequisites

* Node.js (LTS version)
* React Native CLI environment setup (Xcode for iOS, Android Studio for Android)

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone [Your Repository URL]
    cd AlbumExplorer
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **iOS Setup (using CocoaPods):**
    ```bash
    cd ios
    pod install
    cd ..
    ```

4.  **Run the Application:**

| Platform | Command |
| :--- | :--- |
| **iOS** | `npm run ios` |
| **Android** | `npm run android` |

---

## 🧪 Testing Environment Setup (CRITICAL)

Due to dependencies on native modules like `@react-native-community/netinfo` and `BackHandler`, the Jest environment requires specific mocks to run successfully. If you encounter errors like **"NativeModule is null"** or **"BackHandler is not a function"**, ensure the following configurations are in place.

### 1. Jest Mocks Directory (`__mocks__`)

Create a `__mocks__` directory in the project root and add the following files to mock binary assets and native modules:

| File Path | Description | Fixes Error |
| :--- | :--- | :--- |
| `__mocks__/fileMock.js` | Mocks all asset files (PNG, JPG, etc.). | `SyntaxError: Invalid or unexpected token` |
| `__mocks__/@react-native-community/netinfo.js` | Mocks NetInfo module functions. | `NativeModule.RNCNetInfo is null` |
| `__mocks__/@react-native-async-storage/async-storage.js` | Uses the official mock for AsyncStorage. | `[@RNC/AsyncStorage]: NativeModule: AsyncStorage is null` |

### 2. Global Setup File (`jest.setup.js`)

This file is loaded before every test suite and contains the necessary global mocks for React Navigation.

```javascript
// jest.setup.js

// 1. Mock BackHandler (Essential for @react-navigation)
// Fixes: TypeError: _reactNative.BackHandler.addEventListener is not a function
jest.mock('react-native/Libraries/Utilities/BackHandler', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  exitApp: jest.fn(),
  canExitApp: jest.fn(() => true),
}));

// 2. Silence console.error output for test cases that are expected to throw (e.g., HTTP 404 test)
global.console = {
  ...global.console,
  error: jest.fn(),
};

// 3. Optional: Mock AsyncStorage using the official utility
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
