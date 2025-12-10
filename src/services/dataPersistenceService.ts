import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAlbumListItem } from '../models/Album'; 
const ALBUMS_STORAGE_KEY = '@AlbumExplorer:jackJohnsonAlbums';



 * @param albums The array of IAlbumListItem to save.
 */
export const saveAlbumsToStorage = async (albums: IAlbumListItem[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(albums);
    await AsyncStorage.setItem(ALBUMS_STORAGE_KEY, jsonValue);
    
    console.log('Albums successfully saved to storage.');
  } catch (e) {
    console.error('Error saving albums to storage:', e);
  }
};


export const loadAlbumsFromStorage = async (): Promise<IAlbumListItem[]> => {
  try {

    const jsonValue = await AsyncStorage.getItem(ALBUMS_STORAGE_KEY);

    if (jsonValue !== null) {

      const albums: IAlbumListItem[] = JSON.parse(jsonValue);
      console.log('Albums successfully loaded from storage.');
      return albums;
    }
    
    console.log('No album data found in storage.');
    return []; 
  } catch (e) {
    console.error('Error loading albums from storage:', e);
    return []; 
  }
};