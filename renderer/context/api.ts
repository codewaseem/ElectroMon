export class AiMonitorBackendAPI {

    async canAddManualTime(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // let canAdd = Math.random() >= 0.5
            setTimeout(() => resolve(true), 2000);
        });
    }
}