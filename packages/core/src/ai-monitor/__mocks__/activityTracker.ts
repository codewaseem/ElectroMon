const activityTracker: MockIt<IActivityTracker> = {
  deleteFullHistory: jest.fn(),
  getChangedHistory: jest.fn(),
  getFullHistory: jest.fn(),
  startTracking: jest.fn(),
  stopTracking: jest.fn(),
  getActivityTrackerData: jest.fn(),
  setInitialState: jest.fn(),
  push: jest.fn(),
  setUser: jest.fn(),
};

export default activityTracker;
