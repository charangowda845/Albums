import { fetchAlbums } from '../src/api/iTunesService';
import { IiTunesResponse } from '../src/models/Album';

// 1. Define Mock Data
const mockItunesResponse: IiTunesResponse = {
  resultCount: 3,
  results: [
    // A valid Album/Collection item

 



    {
        wrapperType: 'track',
        kind: 'Album',
      collectionId: 12345,
      artistName: 'Jack Johnson',
      collectionName: 'Brushfire Fairytales',
      trackName: 987,
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/6b/2a/3c/6b2a3c30-f94d-73b3-b4e1-20d437f1e549/10UMGIM03138.rgb.jpg/100x100bb.jpg',
      releaseDate: '2001-02-06T08:00:00Z',
      primaryGenreName: 'Singer/Songwriter',
 
    
    },
    // A Track item (which should be filtered out)
    {
      wrapperType: 'track',
      kind: 'song',
      trackId: 54321,
      artistName: 'Jack Johnson',
      collectionName: 'Sleep Through the Static',
      trackName: 'If I Had Eyes',
      artworkUrl100: '...',
      releaseDate: '2001-02-06T08:00:00Z',
      primaryGenreName: 'Singer/Songwriter',
    },
    // Another valid Album/Collection item
    {
      wrapperType: 'collection',
      kind: 'Album',
      trackId: 67890,
      artistName: 'Jack Johnson',
      collectionName: 'In Between Dreams',
      artistId: 987,
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/6b/2a/3c/6b2a3c30-f94d-73b3-b4e1-20d437f1e549/10UMGIM03138.rgb.jpg/100x100bb.jpg',
      releaseDate: '2005-03-01T08:00:00Z',
      primaryGenreName: 'Singer/Songwriter',
    },
  ],
};
// 2. Mock the global fetch function
global.fetch = jest.fn();

describe('fetchAlbums', () => {

  // Clean up mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // --- Test Case 1: Successful Fetch and Data Transformation ---
  it('should fetch, filter, and map album collections correctly', async () => {
    // Setup the mock successful response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockItunesResponse,
    });

    const albums = await fetchAlbums();

    // 1. Assert fetch was called once
    expect(fetch).toHaveBeenCalledTimes(1);
    
    // 2. Assert that only collection items (2 albums) are returned, not the track (1 song)
    expect(albums.length).toBe(2);

    // 3. Assert the data is correctly mapped to the IAlbumListItem structure
    expect(albums[0]).toEqual({
      id: 12345,
      title: 'Brushfire Fairytales',
      artist: 'Jack Johnson',
      // The image URL is checked for the optional '600x600bb' replacement
      imageUrl: expect.stringContaining('600x600bb.jpg'), 
      genre: 'Singer/Songwriter',
      releaseDate: '2001-02-06T08:00:00Z',
    });
  });

  // --- Test Case 2: Network or HTTP Failure ---
  it('should throw an error if the network request fails (response.ok is false)', async () => {
    // Setup the mock failed response (e.g., HTTP 404 or 500)
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}), // Still needs a json function
    });

    // Assert that the function rejects and throws the custom error
    await expect(fetchAlbums()).rejects.toThrow(
      'Could not retrieve album data from the network.'
    );
  });
  
  // --- Test Case 3: Empty Result Set ---
  it('should return an empty array if the API returns no results', async () => {
    const emptyResponse: IiTunesResponse = { resultCount: 0, results: [] };
    
    // Setup the mock successful but empty response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => emptyResponse,
    });

    const albums = await fetchAlbums();

    // Assert that the returned array is empty
    expect(albums.length).toBe(0);
  });

});