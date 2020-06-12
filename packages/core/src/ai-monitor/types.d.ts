declare interface PulseTwoContext {
  token: string;
}

declare interface UserInfo {
  id: string;
  email: string;
  pulseTwoId: string;
  pulseTwoContext: PulseTwoContext;
}

declare interface PulseLoginResponse {
  data: UserInfo & {
    pulseTwoContext: string;
  };
  code: 200;
}

declare type MockIt<T> = {
  [P in keyof T]: jest.Mock<ReturnType<P>>;
};

declare interface UserAssignable {
  setUser(user: UserInfo);
  getUser(): UserInfo | null;
}

declare interface IAiMonitorApi {
  login(username: string, password: string): Promise<UserInfo>;
}

declare type Milliseconds = number;

declare interface LogHistory {
  logType: string;
  startTime: number;
  endTime: number;
  duration: number;
  durationByCount: number;
  userId?: string;
}
