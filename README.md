
# 💿 AlbumExplorer: React Native Album and Track Browser

## 🚀 Overview

AlbumExplorer is a modern cross-platform mobile application built with React Native and TypeScript. It serves as a browser for music and media, fetching data from the iTunes Search API to display albums, tracks, and other media items by a featured artist (currently "Jack Johnson").

The project focuses on implementing robust mobile navigation using `@react-navigation/native-stack`, managing asynchronous data fetching, and ensuring comprehensive unit testing coverage with Jest and custom native module mocks.

## ✨ Features

* **Asynchronous Data Fetching:** Retrieves search results from the iTunes API.
* **Responsive UI:** Displays content in a clean, multi-column grid layout that adapts to different screen sizes (phones and tablets).
* **Native Stack Navigation:** Utilizes `react-native-screens` for a performant, native look and feel for screen transitions.
* **Track/Album Details:** Allows users to navigate from the list to a dedicated detail view for selected items.
* **Robust Error Handling:** Implements network error and HTTP status handling in the API service.

## 🛠️ Technologies Used

The project is built on the following core technologies and libraries:

* **Platform:** React Native (CLI or Expo-based).
* **Language:** TypeScript
* **Navigation:** `@react-navigation/native-stack`
* **Styling:** `react-native` StyleSheet API, `react-native-safe-area-context`
* **Data Fetching:** Native `fetch` API.
* **Testing:** Jest, React Test Renderer

## 💻 Setup and Installation

Follow these steps to set up and run the project locally.

### Prerequisites

* Node.js (LTS version)
* Yarn or npm
* React Native environment setup (e.g., Xcode for iOS, Android Studio for Android)

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone [Your Repository URL]
    cd AlbumExplorer
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
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

## ☁️ API Service

The application fetches data from the iTunes Search API.

**Endpoint:** `https://itunes.apple.com/search?term=jack+johnson`

### `src/api/iTunesService.ts` Logic

The `fetchAlbums` function handles the following:
1.  Fetches data for the term "jack johnson".
2.  Maps all received media types (`track`, `collection`, `audiobook`, etc.) into the simplified `IAlbumListItem` structure.
3.  Performs image URL manipulation to fetch higher-resolution artwork (`100x100bb` replaced with `600x600bb`).

---

## ✅ Running Tests (Jest)

The project includes unit tests for the API service (`iTunesService.test.ts`) and integration tests for the main application component (`App-test.tsx`). Running these tests requires specific Jest configuration to correctly mock React Native's native modules and assets.

### 1. Jest Configuration (`package.json`)

Ensure your `package.json` includes the necessary mapping for assets:

```json
// package.json (partial)
"jest": {
    "preset": "react-native",
    "setupFiles": [
        "<rootDir>/jest.setup.js"
    ],
    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
}