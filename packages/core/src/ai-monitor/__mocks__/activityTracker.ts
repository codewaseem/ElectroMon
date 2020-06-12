const activityTracker: MockIt<IActivityTracker> = {
  init: jest.fn(),
  deleteHistory: jest.fn(),
  getHistory: jest.fn(),
  getLastSessionHistory: jest.fn(),
  startTracking: jest.fn(),
  stopTracking: jest.fn(),
};

export default activityTracker;
