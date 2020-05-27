import activeWin from "active-win";
import tasklist from "tasklist";
import log from "electron-log";

export function startTracking() {
  activeWin().then((result) => {
    log.log("activeWin:");
    log.log(JSON.stringify(result, null, 2));
  });

  if (process.platform === "win32") {
    tasklist({
      verbose: true,
      filter: [
        "USERNAME ne NT AUTHORITYSYSTEM",
        "STATUS eq running",
        "cputime gt 00:01:00",
      ],
    }).then((values) => {
      log.log("Tasklist:");
      log.log(JSON.stringify(values, null, 2));
    });
  }
}
