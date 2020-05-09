import moment from 'moment';


interface Lap {
    startTime: string,
    endTime: string,
    duration: number
}

interface LogsByDate {
    [key: string]: Lap[]
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

    toTimeObject(milliseconds: number) {
        let time = moment(milliseconds).utc();
        return {
            hours: time.hours(),
            minutes: time.minutes(),
            seconds: time.seconds()
        }
    }

    getCurrentTimeObject() {
        return this.toTimeObject(this.milliseconds);
    }

    get currentTime() {
        return this.milliseconds;
    }

    get totalTime() {
        let duration = 0;
        this.laps.forEach(lap => duration += lap.duration);
        return duration;
    }

    getLaps = () => {
        return this.laps;
    }
}


export class DailyTimer extends Timer {
    private logsByDate: LogsByDate = {};

    constructor() {
        super();

    }

    private getDateKey = () => moment().toISOString().split('T')[0]

    stop() {
        super.stop();
        let date = this.getDateKey();
        this.logsByDate[date] = this.getLaps();
    }

    getTodaysTimeObject = () => {
        let duration = 0;
        this.logsByDate[this.getDateKey()]?.forEach(lap => duration += lap.duration);
        return this.toTimeObject(duration + this.currentTime);
    }

    getTodaysLogs = () => this.logsByDate[this.getDateKey()];

    getAllLogs = () => this.logsByDate;
}

class DailyTimers {

}