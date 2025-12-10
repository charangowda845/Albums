import { useState, useEffect, useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { fetchAlbums } from '../api/iTunesService';
import { saveAlbumsToStorage, loadAlbumsFromStorage } from '../services/dataPersistenceService';
import { IAlbumListItem } from '../models/Album';

interface IAlbumDataHook {
  albums: IAlbumListItem[];
  isLoading: boolean;
  error: string | null;
}


export const useAlbumData = (): IAlbumDataHook => {
  const [albums, setAlbums] = useState<IAlbumListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const loadData = useCallback(async (isNetworkConnected: boolean) => {
    setIsLoading(true);
    setError(null);

    const localAlbums = await loadAlbumsFromStorage();
    if (localAlbums.length > 0) {
      setAlbums(localAlbums);
      setIsLoading(false); 
      console.log('Displayed local data.');
    } else {
      
      setIsLoading(isNetworkConnected); 
    }

    // 2. **Fetch New Data if Connected**
    if (isNetworkConnected) {
      console.log('Network connected. Attempting to fetch fresh data...');
      try {
        const freshAlbums = await fetchAlbums();
        
        
        if (freshAlbums.length > 0) {
          setAlbums(freshAlbums);
          await saveAlbumsToStorage(freshAlbums); 
        }
      } catch (e) {
    
        if (localAlbums.length === 0) {
    
          setError('Could not load data. Please check your connection and try again.');
          setAlbums([]);
        }
        console.error('Fetch error:', e);
      }
    } else if (localAlbums.length === 0) {
     
      setError('You are offline and no data has been saved locally yet.');
    }


    setIsLoading(false);
  }, []);



  useEffect(() => {
    
    if (isConnected !== null) { 
      loadData(isConnected);


      console.log(isConnected)
    }
  }, [isConnected, loadData]); 

  return { albums, isLoading, error };
};