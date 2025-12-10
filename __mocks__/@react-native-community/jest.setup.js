// Silencing the expected console.error from the successful 404 test case
global.console = {
    ...global.console,
    error: jest.fn(),
  };
  
  // No need for the NetInfo mock here anymore, as it's handled by __mocks__
  
  // Include other necessary mocks (like AsyncStorage)
  jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
  );


  jest.mock('react-native/Libraries/Utilities/BackHandler', () => ({
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    exitApp: jest.fn(),
    canExitApp: jest.fn(() => true),
  }));