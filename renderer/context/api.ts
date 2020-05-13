interface User { }

interface AiMonitorAPI {
    canAddManualTime(): Promise<boolean>;
    login(email: string, password: string): Promise<User>;
    verifyLogin(token: string): Promise<User>;

}

export class TestAiMonitorAPI implements AiMonitorAPI {
    login(email: string, password: string) {
        console.log(email, password);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 2000);
        })
    }
    verifyLogin(token: string) {
        return Promise.reject({});
    }

    async canAddManualTime(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // let canAdd = Math.random() >= 0.5
            setTimeout(() => resolve(true), 2000);
        });
    }
}