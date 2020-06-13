// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../contracts/index.d.ts" />

import activeWin from "active-win";
import AppTracker from "../ActivityTracker";
import { delay } from "@ai-monitor/common";
import {
  LogInputData,
  LogOutputData,
  TestIntervalTime,
  initialAppUsageData,
} from "../__testdata__/test.data";

AppTracker.TIMER_INTERVAL = TestIntervalTime;

jest.mock("iohook");
jest.useFakeTimers();

describe("AppTracker", () => {
  let tracker: AppTracker;

  beforeEach(async () => {
    tracker = new AppTracker();
    await tracker.setUser({
      email: "some@email.com",
      id: "454",
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("calling start should setup the timer-interval", () => {
    const timerIdSet = jest.spyOn(tracker as any, "timerId", "set");

    tracker.startTracking();

    expect(timerIdSet).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function),
      AppTracker.TIMER_INTERVAL
    );

    tracker.stopTracking();
  });

  it("should not call setTimeout again if the tracker is already started", async () => {
    tracker.startTracking();
    tracker.startTracking();

    expect(setTimeout).toHaveBeenCalledTimes(1);

    tracker.stopTracking();
  });

  it("should call activeWindow repeatedly after timeout when the tracker has started", () => {
    tracker.startTracking();

    expect(activeWin).not.toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();

    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(activeWin).toHaveBeenCalledTimes(1);

    tracker.stopTracking();
  });

  it("calling stop should clear the timer", async () => {
    tracker.startTracking();

    expect(activeWin).not.toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1);

    tracker.stopTracking();
    jest.runOnlyPendingTimers();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(activeWin).not.toHaveBeenCalled();
  });

  it("should be able to track active window data correctly", async () => {
    jest.useRealTimers();

    tracker.startTracking();

    await delay(AppTracker.TIMER_INTERVAL * (LogInputData.length + 1));

    expect(tracker.getActivityTrackerData()).toMatchObject(LogOutputData);

    tracker.stopTracking();
  });

  it("should be able to read saved log", async () => {
    jest.useRealTimers();
    tracker.startTracking();

    await delay(AppTracker.TIMER_INTERVAL);

    expect(await tracker.getActivityTrackerData()).toMatchObject({
      "Google Chrome": {
        "Unicorns - Google Search": {
          timeSpent: AppTracker.TIMER_INTERVAL / 1000,
        },
      },
    });

    tracker.stopTracking();
  });

  it("should be able to resume from an initial data", async () => {
    const initialData = {
      [initialAppUsageData.owner.name]: {
        [initialAppUsageData.title]: {
          timeSpent: (AppTracker.TIMER_INTERVAL * 2) / 1000,
          sessions: [] as any,
        },
      },
    } as ActivityTrackerData;

    const tracker2 = new AppTracker();
    await tracker2.setUser({
      email: "email@email",
      id: "1",
    });
    tracker2.setInitialState(initialData);
    jest.useRealTimers();

    tracker2.startTracking();
    await delay(AppTracker.TIMER_INTERVAL);

    expect(await tracker2.getActivityTrackerData()).toMatchObject({
      [initialAppUsageData.owner.name]: {
        [initialAppUsageData.title]: {
          timeSpent: (AppTracker.TIMER_INTERVAL * 3) / 1000,
        },
      },
    } as ActivityTrackerData);

    tracker2.stopTracking();
  });
});
