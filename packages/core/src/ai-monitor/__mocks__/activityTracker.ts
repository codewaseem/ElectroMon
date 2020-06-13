const activityTracker: MockIt<IActivityTracker> = {
  init: jest.fn(),
  deleteFullHistory: jest.fn(),
  getChangedHistory: jest.fn(),
  getFullHistory: jest.fn(),
  startTracking: jest.fn(),
  stopTracking: jest.fn(),
  getActivityTrackerData: jest.fn(),
  setInitialState: jest.fn(),
  push: jest.fn(),
};

export default activityTracker;
