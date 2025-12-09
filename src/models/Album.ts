// --- 1. Interface for a Single Track (Song) ---
// Note: While the main requirement is the Album List, the API response 
// terms are usually for a 'track' (which can be an album item). 
// The API key 'wrapperType' helps distinguish between a collection (album) 
// and a track (song). We primarily focus on the 'collection' type for the list.

export interface ITrack {
    wrapperType: 'track';
    kind: string; // e.g., "song"
    artistName: string;
    collectionName: string; // The Album Title
    trackName: string; // The Song Title
    artworkUrl100: string; // A small image URL for the song
    trackId: number;
  }
  
  

  
  
  // --- 3. Interface for the entire API Response structure ---
  export interface IiTunesResponse {
    resultCount: number;
    // The 'results' array will contain a mix of IAlbumCollection and ITrack
    results: (IAlbumCollection | ITrack)[];
  }
  
  
  // --- 4. Interface for the data after we filter and clean it (Optional but recommended) ---
  // This is what your Home Page list component will actually use.
  export interface IAlbumListItem {
    id: number; // Use collectionId for the key
    title: string; // The collectionName
    artist: string; // The artistName
    imageUrl: string; // The artworkUrl100
    genre: string;
    releaseDate: string;
  }