export default class IdleTimeTracker {
  private _prevIdleTime;
  private _currentIdleTime;
  private _newTotalIdleTime;
  private _totalIdleTime;
  constructor(prevIdleTime?: number);
  getTotalIdleTime(): number;
  private _isNewIdleState;
}
//# sourceMappingURL=IdleTimeTracker.d.ts.map
