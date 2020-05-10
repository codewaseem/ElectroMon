import moment from 'moment';


interface Lap {
    startTime: string,
    endTime: string,
    duration: number
}

interface TimersByDate {
    [key: string]: Timer
}


class Timer {
    private isRunning = false;
    private laps: Lap[] = [];
    private milliseconds = 0;
    private startTime: moment.Moment;

    private clearTimerId;


    private measure = () => {
        if (!this.isRunning) return;

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

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.startTime = moment();
        this.measure();

    }

    stop() {
        if (!this.isRunning) return;

        this.isRunning = false;
        clearTimeout(this.clearTimerId);

        this.laps.push({
            startTime: this.startTime.toISOString(),
            endTime: moment().toISOString(),
            duration: this.milliseconds
        });

        this.milliseconds = 0;

    }

    toTimeObject(milliseconds?: number) {
        let time = moment(milliseconds || this.milliseconds).utc();
        return {
            hours: time.hours(),
            minutes: time.minutes(),
            seconds: time.seconds()
        }
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

    toObject() {
        return {
            currentRunningTimeMs: this.milliseconds,
            currentRunningTimeObject: this.currentTimeObject,
            laps: this.laps,
            totalTimeMs: this.totalTime,
            totalTimeObject: this.toTimeObject,
        }
    }

    toString() {
        return JSON.stringify(this.toObject());
    }
}


export class DatedTimer {
    private timers: TimersByDate = {};


    private getDateKey = () => moment().toISOString().split('T')[0];

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

    getTotalTimeOn(dateKey: string) {
        if (this.timers[dateKey]) return this.timers[dateKey].totalTime;
        return 0;
    }

    getTotalTimeObjectOn(dateKey: string) {
        if (this.timers[dateKey]) return this.timers[dateKey].totalTimeObject;
    }

    private getTimer(dateKey?) {
        let key = dateKey || this.getDateKey();
        if (!this.timers[key])
            this.timers[key] = new Timer();
        return this.timers[key];
    }
}

class DatedTimerWithStorage extends DatedTimer {

}