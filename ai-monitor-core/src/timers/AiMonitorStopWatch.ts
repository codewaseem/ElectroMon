import StopWatch from "./StopWatch";


export const TimerKeys = { WORK_TIMER: "WORK", COFFEE_TIMER: "COFFEE", LUNCH_TIMER: "LUNCH" };

export interface LogHistory {
    logType: string,
    startTime: number,
    endTime: number,
    duration: number,
    durationByCount: number,
    userId?: string
}

export default class AiMonitorStopWatch {

    private _timers = {
        [TimerKeys.WORK_TIMER]: new StopWatch(),
        [TimerKeys.COFFEE_TIMER]: new StopWatch(),
        [TimerKeys.LUNCH_TIMER]: new StopWatch()
    }
    private _history: LogHistory[] = [];
    private _durationByCount = 0;
    private _lastActiveTimer: string = "";
    private _currentActiveTimer: string = "";
    private _countTimerId: NodeJS.Timeout | undefined = undefined;
    private _userId: string = "";


    constructor(history?: LogHistory[], timersData?: {
        [key: string]: StopWatch
    }) {
        this._history = history || [];

        if (timersData && Object.keys(timersData).length) {
            Object.keys(timersData).forEach(name => {
                this._timers[name] = new StopWatch(timersData[name]);

                if (this._timers[name].isRunning) {
                    let lap = this._timers[name].laps.pop();
                    if (lap) {
                        this._history.push({
                            logType: name,
                            ...lap,
                            durationByCount: -1,
                        });
                    }
                    this._currentActiveTimer = name;
                    this.stop();
                    this.start(name);
                }

            });
        }

    }

    setUserId(id: string) {
        this._userId = id;
    }

    get currentActiveTimer() {
        return this._currentActiveTimer;
    }

    get lastActiveTimer() {
        return this._lastActiveTimer;
    }

    toJSON() {
        return this._timers;
    }

    toObject() {
        return this.toJSON();
    }

    toString() {
        return JSON.stringify(this._timers);
    }

    getWorkTotal() {
        return this._timers[TimerKeys.WORK_TIMER].totalTime;
    }

    getLunchTotal() {
        return this._timers[TimerKeys.LUNCH_TIMER].totalTime;
    }

    getCoffeeTotal() {
        return this._timers[TimerKeys.COFFEE_TIMER].totalTime;
    }

    getTotal() {
        return this.getWorkTotal() + this.getCoffeeTotal() + this.getLunchTotal();
    }

    private stopCurrentActiveTimer() {

        this._lastActiveTimer = this._currentActiveTimer;
        this._timers[this._currentActiveTimer].stop();
        this.stopManualCount();

    }

    private startManualCount() {
        this._countTimerId = setTimeout(() => {
            this._durationByCount += 500;
            this.startManualCount();
        }, 500);
    }

    private stopManualCount() {
        if (this._countTimerId) {
            clearTimeout(this._countTimerId);
            this._countTimerId = undefined;
        }
    }

    startWork() {
        this.start(TimerKeys.WORK_TIMER);
    }

    startLunch() {
        this.start(TimerKeys.LUNCH_TIMER);

    }

    startCoffee() {
        this.start(TimerKeys.COFFEE_TIMER);
    }

    private start(timerKey: string) {

        if (this._currentActiveTimer)
            this.stop();

        this._currentActiveTimer = timerKey;
        this._timers[timerKey].start();
        this._durationByCount = 0;
        this.startManualCount();
    }

    stop() {
        if (!this._currentActiveTimer) return;

        this.stopCurrentActiveTimer();


        const durationByCount = this._durationByCount;
        const lastTimer = this._timers[this._lastActiveTimer];
        const lastLap = lastTimer.laps.pop();

        if (lastLap) {
            const lap: LogHistory = {
                logType: this._lastActiveTimer,
                ...lastLap,
                durationByCount
            }
            if (this._userId) lap.userId = this._userId;
            this._history.push(lap);
        }

        this._currentActiveTimer = "";

    }

    getHistory() {
        return this._history.slice();
    }

    deleteHistory() {
        this._history = [];
    }
}
