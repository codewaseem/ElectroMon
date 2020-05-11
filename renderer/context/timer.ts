import moment from 'moment';


interface Lap {
    startTime: string,
    endTime: string,
    duration: number
}

interface TimersByDate {
    [key: string]: Timer
}

interface TimerInitData {
    laps: Lap[],
    milliseconds: number,
    isRunning: boolean,
    startTimeISO?: string
}

interface DatedTimerInitData {
    [key: string]: TimerInitData
}

export const zeroPad = (number: number) => (number <= 9 ? `0${number}` : number);


class Timer {
    private _isRunning = false;
    private laps: Lap[] = [];
    private milliseconds = 0;
    private startTime: moment.Moment;

    private clearTimerId;

    constructor(initialData?: TimerInitData) {
        if (initialData) {
            this.laps = initialData.laps;
            this.milliseconds = initialData.milliseconds;
            this._isRunning = initialData.isRunning;
            this.startTime = initialData.startTimeISO && moment(initialData.startTimeISO);
        }
    }

    private measure = () => {
        if (!this._isRunning) return;

        this.milliseconds = moment().diff(this.startTime);

        this.clearTimerId = setTimeout(() => this.measure(), 10);
    }


    protected calculateTotalRunningTime(laps: Lap[]) {
        let duration = 0;
        laps?.forEach(lap => duration += lap.duration);
        return this.toTimeObject(duration + this.currentTime);
    }

    protected getLaps = () => {
        return this.laps;
    }

    get isRunning() {
        return this._isRunning;
    }

    start() {
        if (this._isRunning) return;

        this._isRunning = true;
        this.startTime = moment();
        this.measure();

    }

    stop() {
        if (!this._isRunning) return;

        this._isRunning = false;
        clearTimeout(this.clearTimerId);

        // call measure manually to get accurate time duration.
        this.measure();
        this.laps.push({
            startTime: this.startTime.toISOString(),
            duration: this.milliseconds,
            endTime: moment(this.startTime).add(this.milliseconds).toISOString(), // should be always computed from startTime and duration
        });

        this.startTime = undefined;
        this.milliseconds = 0;

    }

    toTimeObject(milliseconds?: number) {
        let ms = milliseconds || this.milliseconds;
        return millisecondsToTimeObject(ms)
    }

    // time of current running lap in ms
    get currentTime() {
        return this.milliseconds;
    }

    // time object of current running lap
    get currentTimeObject() {
        return this.toTimeObject();
    }

    // Total time is current running time + all time in laps
    get totalTime() {
        let duration = 0;
        this.laps.forEach(lap => duration += lap.duration);
        return duration + this.milliseconds;
    }

    get totalTimeObject() {
        return this.calculateTotalRunningTime(this.laps);
    }

    toJSON() {
        return {
            isRunning: this.isRunning,
            milliseconds: this.milliseconds,
            laps: this.laps,
            startTimeISO: this.startTime && this.startTime.toISOString(),
        }
    }

    toObject() {
        return this.toJSON();
    }

    toString() {
        return JSON.stringify(this.toObject());
    }
}


export class DatedTimer {
    private logsByDate: TimersByDate = {};


    private getDateKey = () => moment().toISOString().split('T')[0];

    constructor(initialData?: DatedTimerInitData) {
        // initialize timers by date with initial data
        if (initialData) {
            Object.keys(initialData).map(date => {
                this.logsByDate[date] = new Timer(initialData[date]);
            });
        }
    }

    start() {
        this.getTimer().start();
    }

    stop() {
        this.getTimer().stop();
    }

    get totalTime() {
        return this.getTimer().totalTime;
    }

    get totalTimeObject() {
        return this.getTimer().totalTimeObject;
    }

    get isRunning() {
        return this.getTimer().isRunning;
    }

    getTotalTimeOn(dateKey: string) {
        if (this.logsByDate[dateKey]) return this.logsByDate[dateKey].totalTime;
        return 0;
    }

    getTotalTimeObjectOn(dateKey: string) {
        if (this.logsByDate[dateKey]) return this.logsByDate[dateKey].totalTimeObject;
    }

    private getTimer(dateKey?) {
        let key = dateKey || this.getDateKey();
        if (!this.logsByDate[key])
            this.logsByDate[key] = new Timer();
        return this.logsByDate[key];
    }

    toJSON() {
        return this.logsByDate;
    }
}


type TimersByName = {
    [key: string]: DatedTimer
}

export class TimersManager {
    private timers: TimersByName = {};
    private activeTimerKey: string;


    getActiveTimer() {
        return this.timers[this.activeTimerKey];
    }

    constructor(timersData?: {
        [key: string]: DatedTimerInitData
    }) {
        if (timersData) {
            Object.keys(timersData).map(timerName => {
                this.timers[timerName] = new DatedTimer(timersData[timerName]);
                this.timers[timerName].isRunning;
                this.timers[timerName].stop();
            });
        }
    }

    getTotalTimeObject() {
        let total = 0;
        Object.keys(this.timers).map(timerName => {
            total += this.timers[timerName].totalTime
        });
        return millisecondsToTimeObject(total);
    }

    getTotalTimeFor(timerName) {
        return this.timers[timerName].totalTime;
    }

    getTotalTimeObjectFor(timerName) {
        return this.timers[timerName].totalTimeObject;
    }

    getTimersData() {
        return this.timers;
    }

    getActiveTimerKey() {
        return this.activeTimerKey;
    }

    startTimer(timerName: string) {
        let newTimer = this.timers[timerName];
        let activeTimer = this.getActiveTimer();

        if (!newTimer) return;

        if (activeTimer) activeTimer.stop();

        this.activeTimerKey = timerName;
        this.timers[timerName].start();
    }

    stopTimer() {
        let activeTimer = this.getActiveTimer();
        if (!activeTimer) return;

        activeTimer.stop();

        activeTimer = null;
    }

    getTimerByName(timerName: string) {
        return this.timers[timerName];
    }

    addNewTimer(timerName: string) {
        if (this.timers[timerName]) return;

        this.timers[timerName] = new DatedTimer();
    }

    toJSON() {
        return this.timers;
    }
}

function millisecondsToTimeObject(milliseconds: number) {
    let time = moment(milliseconds).utc();
    return {
        hours: zeroPad(time.hours()),
        minutes: zeroPad(time.minutes()),
        seconds: zeroPad(time.seconds())
    };
}
