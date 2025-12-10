
export interface ITrack {
    wrapperType: 'track';
    kind: string; // e.g., "song"
    artistName: string;
    collectionName: string; // The Album Title
    trackName: string; // The Song Title
    artworkUrl100: string; // A small image URL for the song
    trackId: number;
  }
  

  export interface IiTunesResponse {
    resultCount: number;
    results: (IAlbumCollection | ITrack)[];
  }
  
  export interface IAlbumListItem {
    wrapperType: 'track';
    kind: string; // e.g., "song"
    artistName: string;
    collectionName: string; // The Album Title
    trackName: string; // The Song Title
    artworkUrl100: string; // A small image URL for the song
    trackId: number;
  }