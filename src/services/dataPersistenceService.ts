import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAlbumListItem } from '../models/Album'; // Import the model we defined

// Key used to store the album data in AsyncStorage
const ALBUMS_STORAGE_KEY = '@AlbumExplorer:jackJohnsonAlbums';


/**
 * Saves the fetched list of albums to AsyncStorage.
 * @param albums The array of IAlbumListItem to save.
 */
export const saveAlbumsToStorage = async (albums: IAlbumListItem[]): Promise<void> => {
  try {
    // 1. Convert the TypeScript array into a JSON string
    const jsonValue = JSON.stringify(albums);
    
    // 2. Store the string in AsyncStorage
    await AsyncStorage.setItem(ALBUMS_STORAGE_KEY, jsonValue);
    
    console.log('Albums successfully saved to storage.');
  } catch (e) {
    console.error('Error saving albums to storage:', e);
    // Handle the error appropriately (e.g., alert the user, log crash)
  }
};


/**
 * Retrieves the stored list of albums from AsyncStorage.
 * @returns A Promise that resolves to an array of IAlbumListItem, or an empty array if nothing is found.
 */
export const loadAlbumsFromStorage = async (): Promise<IAlbumListItem[]> => {
  try {
    // 1. Retrieve the JSON string value
    const jsonValue = await AsyncStorage.getItem(ALBUMS_STORAGE_KEY);
    
    // 2. Check if a value was found
    if (jsonValue !== null) {
      // 3. Convert the JSON string back into a TypeScript array
      const albums: IAlbumListItem[] = JSON.parse(jsonValue);
      console.log('Albums successfully loaded from storage.');
      return albums;
    }
    
    console.log('No album data found in storage.');
    return []; // Return an empty array if nothing is stored
  } catch (e) {
    console.error('Error loading albums from storage:', e);
    return []; // Return an empty array in case of any read/parse error
  }
};