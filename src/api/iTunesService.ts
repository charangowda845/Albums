import { IiTunesResponse, ITrack, IAlbumListItem } from '../models/Album';

// The API endpoint required by the project specifications
const ITUNES_SEARCH_URL = 'https://itunes.apple.com/search?term=jack+johnson';

/**
 * Fetches TRACK data for "Jack Johnson" from the iTunes Search API.
 */
export const fetchAlbums = async (): Promise<IAlbumListItem[]> => {
  try {
    const response = await fetch(ITUNES_SEARCH_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: IiTunesResponse = await response.json();

    // 1. Filter the results to only include TRACK types (as requested)
    const tracks = data.results.filter(
      (item): item is ITrack => item.wrapperType === 'audiobook'
    );

    // 2. Map the complex API track data into our simplified IAlbumListItem model
    const trackListItems: IAlbumListItem[] = tracks.map((track) => ({
      // Using trackId
      id: track.trackId, 
      // Using trackName
      title: track.trackName, 
      artist: track.artistName,
      imageUrl: track.artworkUrl100.replace('100x100bb', '600x600bb'),
      // Using kind (e.g., 'song', 'feature-movie') for genre, as primaryGenreName might be missing on some tracks
      genre: (track as any).primaryGenreName || track.kind || 'Unknown', 
      releaseDate: (track as any).releaseDate || 'N/A',
    }));

    return trackListItems;

  } catch (error) {
    console.error('Failed to fetch tracks:', error);
    throw new Error('Could not retrieve track data from the network.');
  }
};