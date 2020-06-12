export const validLoginData = {
  email: "goodusername@email.com",
  password: "goodpassword",
};

const aiMonitorApi: MockIt<IAiMonitorApi> = {
  login: jest.fn((username, password) => {
    if (
      username == validLoginData.email &&
      password == validLoginData.password
    ) {
      return Promise.resolve({
        id: "1",
        email: username,
      } as UserInfo);
    } else {
      return Promise.reject();
    }
  }),
  logout: jest.fn(),
  addTimeLogs: jest.fn(),
  addUsageLogs: jest.fn(),
  applyForLeave: jest.fn(),
};

export default aiMonitorApi;
