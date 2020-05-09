import moment from 'moment';


interface Lap {
    startTime: string,
    endTime: string,
    duration: number
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

interface LogsByDate {
    [key: string]: Lap[]
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

    getTodaysLogs = () => this.logsByDate[this.getDateKey()];

    getAllLogs = () => this.logsByDate;
}