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

/**
 * Custom hook to manage fetching and persistence of album data.
 * It prioritizes loading local data and then attempts to fetch fresh data.
 */
export const useAlbumData = (): IAlbumDataHook => {
  const [albums, setAlbums] = useState<IAlbumListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use a state to track network status
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  // Subscribe to network state changes
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  const loadData = useCallback(async (isNetworkConnected: boolean) => {
    setIsLoading(true);
    setError(null);

    // 1. **Always** attempt to load data from local storage first.
    const localAlbums = await loadAlbumsFromStorage();
    if (localAlbums.length > 0) {
      setAlbums(localAlbums);
      // Data loaded locally, stop loading indicator quickly
      setIsLoading(false); 
      console.log('Displayed local data.');
    } else {
      // If nothing is local, the user must be on the network for the first run
      setIsLoading(isNetworkConnected); // Keep loading if connected, or stop if no local data AND no network
    }

    // 2. **Fetch New Data if Connected**
    if (isNetworkConnected) {
      console.log('Network connected. Attempting to fetch fresh data...');
      try {
        const freshAlbums = await fetchAlbums();
        
        // Only update if the fetched data is different (e.g., handles API failure cases)
        if (freshAlbums.length > 0) {
          setAlbums(freshAlbums);
          await saveAlbumsToStorage(freshAlbums); // Save the fresh data
        }
      } catch (e) {
        // If local data exists, this error is for the network fetch only (less critical)
        if (localAlbums.length === 0) {
          // Critical error: First run and network fetch failed
          setError('Could not load data. Please check your connection and try again.');
          setAlbums([]);
        }
        console.error('Fetch error:', e);
      }
    } else if (localAlbums.length === 0) {
      // Critical error: No network AND no local data
      setError('You are offline and no data has been saved locally yet.');
    }

    // Ensure loading is set to false after all attempts are made
    setIsLoading(false);
  }, []);


  // --- Main Effect: Trigger data loading when network status changes ---
  useEffect(() => {
    // Only run the loader once the network status has been determined (initial load)
    if (isConnected !== null) { 
      loadData(isConnected);


      console.log(isConnected)
    }
  }, [isConnected, loadData]); // Re-run whenever network status changes

  return { albums, isLoading, error };
};