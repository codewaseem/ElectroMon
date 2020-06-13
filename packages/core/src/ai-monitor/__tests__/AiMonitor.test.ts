// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../contracts/index.d.ts" />

import aiMonitorApi, { validLoginData } from "../__mocks__/aiMonitorApi";
import activityTracker from "../__mocks__/activityTracker";
import storageGateway from "../__mocks__/storageGateway";

import AiMonitorStopWatch from "../stopwatch/AiMonitorStopWatch";
import AiMonitor, { ErrorMessages } from "..";

jest.mock("../stopwatch/AiMonitorStopWatch");

describe("AiMonitor", () => {
  let aiMonitorStopWatch: AiMonitorStopWatch;

  let aiMonitor: AiMonitor;

  beforeEach(() => {
    aiMonitor = new AiMonitor({
      aiMonitorApi,
      activityTracker,
      storageGateway,
    });
    aiMonitorStopWatch = aiMonitor.getStopWatch();
    jest.clearAllMocks();
  });

  it("providing invalid login data should reject", async () => {
    expect.assertions(1);
    try {
      await aiMonitor.login("badEmail@gmail.com", "pass");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });

  it("calling login method should call the backend api", async () => {
    aiMonitor.login(validLoginData.email, validLoginData.password);
    expect(aiMonitorApi.login).toHaveBeenCalled();
  });

  it("after logging in, the user should be set for stopwatch, activity tracker", async () => {
    const setUserCallData = {
      email: validLoginData.email,
      id: expect.any(String),
    } as UserInfo;
    const spy = jest.spyOn(aiMonitorStopWatch, "setInitialState");
    await aiMonitor.login(validLoginData.email, validLoginData.password);
    expect(aiMonitorStopWatch.setUser).toHaveBeenLastCalledWith(
      setUserCallData
    );

    expect(storageGateway.getStopWatchState).toHaveBeenCalled();
    expect(storageGateway.getActivityTrackerState).toHaveBeenCalled();
    expect(activityTracker.setInitialState).toHaveBeenCalled();
    expect(activityTracker.setUser).toHaveBeenLastCalledWith(setUserCallData);
    expect(spy).toHaveBeenCalled();
  });

  it("starting to track without logging in should throw an error", async () => {
    expect.assertions(3);
    try {
      await aiMonitor.startWork();
    } catch (e) {
      expect(e).toMatch(ErrorMessages.notLoggedIn);
    }
    try {
      await aiMonitor.startCoffeeBreak();
    } catch (e) {
      expect(e).toMatch(ErrorMessages.notLoggedIn);
    }
    try {
      await aiMonitor.startLunchBreak();
    } catch (e) {
      expect(e).toMatch(ErrorMessages.notLoggedIn);
    }
  });

  it("starting timer after logging in should not throw an error", async () => {
    try {
      await aiMonitor.login(validLoginData.email, validLoginData.password);
      await aiMonitor.startWork();
      await aiMonitor.startCoffeeBreak();
      await aiMonitor.startLunchBreak();
    } catch (e) {
      expect(e).not.toBeTruthy();
    }
  });

  it("starting to work should start the timer and activity tracking", async () => {
    await aiMonitor.login(validLoginData.email, validLoginData.password);
    await aiMonitor.startWork();
    expect(aiMonitorStopWatch.startWork).toHaveBeenCalled();
    expect(activityTracker.startTracking).toHaveBeenCalled();
  });

  it("starting coffee or lunch timer should only start stop watch and should stop activity tracking", async () => {
    await aiMonitor.login(validLoginData.email, validLoginData.password);
    await aiMonitor.startCoffeeBreak();
    expect(activityTracker.stopTracking).toHaveBeenCalled();
    expect(aiMonitorStopWatch.startCoffee).toHaveBeenCalled();

    await aiMonitor.startLunchBreak();
    expect(aiMonitorStopWatch.stop).toHaveBeenCalled();
    expect(aiMonitorStopWatch.startLunch).toHaveBeenCalled();
    expect(activityTracker.stopTracking).toHaveBeenCalled();
  });

  it("calling stop should save data to locally and also push the recent history to the server", async () => {
    await aiMonitor.login(validLoginData.email, validLoginData.password);
    await aiMonitor.startCoffeeBreak();

    await aiMonitor.stop();
    expect(storageGateway.saveTimeLogs).toHaveBeenCalled();
    expect(storageGateway.saveUsageHistory).toHaveBeenCalled();
    expect(storageGateway.saveStopWatchState).toHaveBeenCalled();
    expect(activityTracker.getChangedHistory).toHaveBeenCalled();
    expect(aiMonitorApi.addTimeLogs).toHaveBeenCalled();
    expect(aiMonitorApi.addUsageLogs).toHaveBeenCalled();
  });

  it("calling stop should stop the stopwatch and activity tracker if the work timer was started", async () => {
    await aiMonitor.login(validLoginData.email, validLoginData.password);
    await aiMonitor.startWork();
    await aiMonitor.stop();
    expect(aiMonitorStopWatch.stop).toHaveBeenCalled();
    expect(activityTracker.stopTracking).toHaveBeenCalled();
  });

  it("calling logout without logging in should return early and should have not called backend api", async () => {
    await aiMonitor.logout();

    expect(aiMonitorApi.logout).not.toHaveBeenCalled();
  });

  it("calling logout should unset the user and call the backend logout api", async () => {
    expect.assertions(3);

    await aiMonitor.login(validLoginData.email, validLoginData.password);

    await aiMonitor.logout();

    expect(aiMonitorStopWatch.stop).toHaveBeenCalled();

    expect(aiMonitorApi.logout).toHaveBeenCalled();

    try {
      await aiMonitor.startWork();
    } catch (e) {
      expect(e).toMatch(ErrorMessages.notLoggedIn);
    }
  });
});
