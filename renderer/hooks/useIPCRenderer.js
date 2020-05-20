const { ipcRenderer } = eval('require("electron");');


export default function useIPCRenderer() {
    return ipcRenderer;
}
