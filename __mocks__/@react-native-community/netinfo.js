// A complete mock for @react-native-community/netinfo
// This ensures all common exports are covered
module.exports = {
    // Mock the primary fetch function for current state
    fetch: () => Promise.resolve({
      type: 'wifi',
      isConnected: true,
      isInternetReachable: true,
    }),
    
    // Mock the event listener for continuous updates (often required by library components)
    addEventListener: jest.fn(() => () => {
      // Return an empty function for unsubscribe
    }),
  
    // Mock the `useNetInfo` hook, which is often used in components
    useNetInfo: () => ({
      type: 'wifi',
      isConnected: true,
      isInternetReachable: true,
    }),
  };