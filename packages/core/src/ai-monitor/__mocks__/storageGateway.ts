const storageGateway: MockIt<IStorageGateway> = {
  getTimeLogs: jest.fn(),
  getUsageHistory: jest.fn(),
  saveTimeLogs: jest.fn(),
  saveUsageHistory: jest.fn(),
  saveStopWatchState: jest.fn(),
  getStopWatchState: jest.fn(),
  getActivityTrackerState: jest.fn(),
  saveActivityTrackerState: jest.fn(),
};

export default storageGateway;
