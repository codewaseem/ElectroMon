import { delay } from "../../utils";
import AiMonitorStopWatch, { TimerKeys } from "./AiMonitorStopWatch";

describe("AiStopWatch", () => {
  let aiStopWatch: AiMonitorStopWatch;

  beforeEach(() => {
    aiStopWatch = new AiMonitorStopWatch();
  });

  it("should call start method of appropriate internal stopwatch", () => {
    const workStopWatchStart = ((aiStopWatch as any)._timers[
      TimerKeys.WORK_TIMER
    ].start = jest.fn());
    const lunchStopWatchStart = ((aiStopWatch as any)._timers[
      TimerKeys.LUNCH_TIMER
    ].start = jest.fn());
    const coffeeStopWatchStart = ((aiStopWatch as any)._timers[
      TimerKeys.COFFEE_TIMER
    ].start = jest.fn());

    aiStopWatch.startWork();
    aiStopWatch.startCoffee();
    aiStopWatch.startLunch();
    aiStopWatch.stop();

    expect(workStopWatchStart).toHaveBeenCalled();
    expect(lunchStopWatchStart).toHaveBeenCalled();
    expect(coffeeStopWatchStart).toHaveBeenCalled();
  });

  it("should call stop method of appropriate internal stopwatch", () => {
    const workStopWatchStop = ((aiStopWatch as any)._timers[
      TimerKeys.WORK_TIMER
    ].stop = jest.fn());
    const lunchStopWatchStop = ((aiStopWatch as any)._timers[
      TimerKeys.LUNCH_TIMER
    ].stop = jest.fn());
    const coffeeStopWatchStop = ((aiStopWatch as any)._timers[
      TimerKeys.COFFEE_TIMER
    ].stop = jest.fn());

    aiStopWatch.startWork();
    aiStopWatch.stop();
    expect(workStopWatchStop).toHaveBeenCalled();

    aiStopWatch.startLunch();
    aiStopWatch.stop();
    expect(lunchStopWatchStop).toHaveBeenCalled();

    aiStopWatch.startCoffee();
    aiStopWatch.stop();
    expect(coffeeStopWatchStop).toHaveBeenCalled();
  });

  it("should set appropriate previousActiveTimer & currentActiveTimer value", () => {
    expect(aiStopWatch.currentActiveTimer).toBe("");
    expect(aiStopWatch.lastActiveTimer).toBe("");

    aiStopWatch.startWork();
    expect(aiStopWatch.lastActiveTimer).toBe("");
    expect(aiStopWatch.currentActiveTimer).toBe(TimerKeys.WORK_TIMER);

    aiStopWatch.startCoffee();
    expect(aiStopWatch.lastActiveTimer).toBe(TimerKeys.WORK_TIMER);
    expect(aiStopWatch.currentActiveTimer).toBe(TimerKeys.COFFEE_TIMER);

    aiStopWatch.startWork();
    expect(aiStopWatch.lastActiveTimer).toBe(TimerKeys.COFFEE_TIMER);
    expect(aiStopWatch.currentActiveTimer).toBe(TimerKeys.WORK_TIMER);

    aiStopWatch.startLunch();
    expect(aiStopWatch.lastActiveTimer).toBe(TimerKeys.WORK_TIMER);
    expect(aiStopWatch.currentActiveTimer).toBe(TimerKeys.LUNCH_TIMER);

    aiStopWatch.startCoffee();
    expect(aiStopWatch.lastActiveTimer).toBe(TimerKeys.LUNCH_TIMER);
    expect(aiStopWatch.currentActiveTimer).toBe(TimerKeys.COFFEE_TIMER);

    aiStopWatch.stop();
    expect(aiStopWatch.lastActiveTimer).toBe(TimerKeys.COFFEE_TIMER);
    expect(aiStopWatch.currentActiveTimer).toBe("");
  });

  it("after stopping the current timer it should push the data to the history", () => {
    aiStopWatch.stop();
    expect(aiStopWatch.getFullHistory()).toStrictEqual([]);

    aiStopWatch.startWork();
    aiStopWatch.stop();

    expect(aiStopWatch.getFullHistory().pop()).toMatchObject({
      logType: "WORK",
      startTime: expect.any(Number),
      endTime: expect.any(Number),
      duration: expect.any(Number),
      durationByCount: expect.any(Number),
    });
  });

  it("should be able to delete history", () => {
    aiStopWatch.startWork();
    aiStopWatch.stop();

    expect(aiStopWatch.getFullHistory().length).toBe(1);

    aiStopWatch.deleteFullHistory();
    expect(aiStopWatch.getFullHistory().length).toBe(0);
  });

  it("should be also able to time manually", async () => {
    aiStopWatch.startWork();
    await delay(1550);
    aiStopWatch.stop();

    const log = aiStopWatch.getFullHistory().pop();

    expect(log?.durationByCount).toBeGreaterThan(1495);
    expect(log?.durationByCount).toBeLessThan(1550);
  });

  it("should get total times", async () => {
    aiStopWatch.startWork();
    await delay(250);
    aiStopWatch.stop();

    aiStopWatch.startLunch();
    await delay(150);
    aiStopWatch.stop();

    aiStopWatch.startCoffee();
    await delay(250);

    expect(aiStopWatch.getWorkTotal()).toBeGreaterThan(199);
    expect(aiStopWatch.getLunchTotal()).toBeGreaterThan(99);
    expect(aiStopWatch.getCoffeeTotal()).toBeGreaterThan(199);

    expect(aiStopWatch.getTotal()).toBeGreaterThan(499);
  });

  it("should be able to start from initial history", () => {
    const history: TimeLogHistory[] = [
      {
        duration: 60,
        durationByCount: 60,
        endTime: 70,
        startTime: 10,
        logType: TimerKeys.WORK_TIMER,
      },
    ];
    const aiStopWatch1 = new AiMonitorStopWatch(history);
    expect(aiStopWatch1.getFullHistory()).toMatchObject(history);
  });

  it("should be able to start from initial timers data", () => {
    aiStopWatch.startWork();
    aiStopWatch.startLunch();
    aiStopWatch.startCoffee();

    const history = aiStopWatch.getFullHistory();
    const timersData = JSON.parse(JSON.stringify(aiStopWatch));

    const aiStopWatch1 = new AiMonitorStopWatch(history, timersData);
    expect(aiStopWatch1.currentActiveTimer).toBe(TimerKeys.COFFEE_TIMER);
    expect(aiStopWatch1.getFullHistory()).toMatchObject(history);
    expect(JSON.parse(JSON.stringify(aiStopWatch1))).toMatchObject(timersData);

    aiStopWatch.stop();
  });

  it("should be able to set userId", () => {
    aiStopWatch.setUser({
      email: "email",
      id: "1",
    });
    aiStopWatch.startWork();
    aiStopWatch.stop();

    expect(aiStopWatch.getFullHistory().pop()).toMatchObject({
      logType: "WORK",
      startTime: expect.any(Number),
      endTime: expect.any(Number),
      duration: expect.any(Number),
      durationByCount: expect.any(Number),
      userId: `1`,
    });
  });
});
