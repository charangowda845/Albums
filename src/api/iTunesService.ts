import { IiTunesResponse, ITrack, IAlbumListItem } from '../models/Album';


const ITUNES_SEARCH_URL = 'https://itunes.apple.com/search?term=jack+johnson';


export const fetchAlbums = async (): Promise<IAlbumListItem[]> => {
  try {
    const response = await fetch(ITUNES_SEARCH_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: IiTunesResponse = await response.json();

 
    const rawItems = data.results;


    const albumListItems: IAlbumListItem[] = rawItems.map((item: any) => {
      const isTrack = item.wrapperType === 'track';
      

      const id = item.trackId ?? item.collectionId;
      const title = item.trackName ?? item.collectionName;

      return { 
        id: id, 
        title: title, 
        artist: item.artistName || 'Unknown Artist',
        // Get higher resolution image, safely checking for 'artworkUrl100'
        imageUrl: item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '600x600bb') : '',
        // Use primaryGenreName, falling back to 'kind' (e.g., 'song')
        genre: item.primaryGenreName || item.kind || 'Unknown', 
        releaseDate: item.releaseDate || 'N/A',
      };
    });

    return albumListItems;

  } catch (error) {
   // console.error('Failed to fetch items:', error);
    throw new Error('Could not retrieve item data from the network.');
  }
};