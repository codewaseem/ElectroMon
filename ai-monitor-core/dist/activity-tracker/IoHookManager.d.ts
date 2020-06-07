declare class IoHookManager {
    private _mouseclicks;
    private _keystrokes;
    private subscribers;
    start(): void;
    resetData(): void;
    stop(): void;
    private _incrementMouseClicks;
    private _incrementKeystrokes;
    getData(): {
        mouseclicks: number;
        keystrokes: number;
    };
    subscribe(fn: (data: {
        mouseclicks: number;
        keystrokes: number;
    }) => void): void;
    private _onChange;
}
declare const ioHookManager: IoHookManager;
export default ioHookManager;
//# sourceMappingURL=IoHookManager.d.ts.map