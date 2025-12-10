import { fetchAlbums } from '../src/api/iTunesService';
// Assuming IiTunesResponse, IAlbumListItem, and ITrack models are in '../src/models/Album'
import { IiTunesResponse, IAlbumListItem } from '../src/models/Album';

// 1. Define Mock Data
const mockItunesResponse: IiTunesResponse = {
  resultCount: 3,
  results: [
    // Item 1: A Collection/Album (used collectionId and collectionName)
    {
      wrapperType: 'collection',
      kind: 'Album',
      collectionId: 12345,
      artistName: 'Jack Johnson',
      collectionName: 'Brushfire Fairytales',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/6b/2a/3c/6b2a3c30-f94d-73b3-b4e1-20d437f1e549/10UMGIM03138.rgb.jpg/100x100bb.jpg',
      releaseDate: '2001-02-06T08:00:00Z',
      primaryGenreName: 'Singer/Songwriter',
    },
    // Item 2: A Track/Song (used trackId and trackName)
    {
      wrapperType: 'track',
      kind: 'song',
      trackId: 54321,
      artistName: 'Jack Johnson',
      collectionName: 'Sleep Through the Static', // Not used for title, but exists
      trackName: 'If I Had Eyes',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/6b/2a/3c/6b2a3c30-f94d-73b3-b4e1-20d437f1e549/10UMGIM03138.rgb.jpg/100x100bb.jpg',
      releaseDate: '2007-02-06T08:00:00Z',
      primaryGenreName: 'Rock',
    },
    // Item 3: Another Collection/Album
    {
      wrapperType: 'collection',
      kind: 'Album',
      collectionId: 67890,
      artistName: 'Jack Johnson',
      collectionName: 'In Between Dreams',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/6b/2a/3c/6b2a3c30-f94d-73b3-b4e1-20d437f1e549/10UMGIM03138.rgb.jpg/100x100bb.jpg',
      releaseDate: '2005-03-01T08:00:00Z',
      primaryGenreName: 'Singer/Songwriter',
    },
  ],
};

// 2. Mock the global fetch function
// Ensure global.fetch is reset if using TypeScript setup
(global.fetch as jest.Mock) = jest.fn();

describe('fetchAlbums', () => {

  // Clean up mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // --- Test Case 1: Successful Fetch and Data Transformation ---
  it('should fetch all results and map them correctly', async () => {
    // Setup the mock successful response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockItunesResponse,
    });

    const items = await fetchAlbums();

    // 1. Assert fetch was called once
    expect(fetch).toHaveBeenCalledTimes(1);
    
    // 2. Assert that ALL 3 items are returned since the filter was removed
    expect(items.length).toBe(3);

    // 3. Assert Item 1 (Collection) is correctly mapped
    expect(items[0]).toEqual({
      id: 12345,
      title: 'Brushfire Fairytales', // uses collectionName
      artist: 'Jack Johnson',
      imageUrl: expect.stringContaining('600x600bb.jpg'), 
      genre: 'Singer/Songwriter',
      releaseDate: '2001-02-06T08:00:00Z',
    });

    // 4. Assert Item 2 (Track) is correctly mapped
    expect(items[1]).toEqual({
      id: 54321,
      title: 'If I Had Eyes', // uses trackName
      artist: 'Jack Johnson',
      imageUrl: expect.stringContaining('600x600bb.jpg'), 
      genre: 'Rock',
      releaseDate: '2007-02-06T08:00:00Z',
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
      'Could not retrieve item data from the network.' // Updated error message to match new service code
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

    const items = await fetchAlbums();

    // Assert that the returned array is empty
    expect(items.length).toBe(0);
  });

});