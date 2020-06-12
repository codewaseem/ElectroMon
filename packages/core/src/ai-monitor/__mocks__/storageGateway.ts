const storageGateway: MockIt<IStorageGateway> = {
  getTimeLogs: jest.fn(),
  getUsageHistory: jest.fn(),
  saveTimeLogs: jest.fn(),
  saveUsageHistory: jest.fn(),
  saveStopWatchState: jest.fn(),
  getSavedStopWatchState: jest.fn(),
};

export default storageGateway;
