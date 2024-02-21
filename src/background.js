'use strict'
import { app, protocol, BrowserWindow }  from 'electron'
import { autoUpdater } from "electron-updater";
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const { ipcMain } = require('electron')
const { dialog } = require('electron');
const { execFile, spawn } = require('child_process');
const Store = require('electron-store');
const store = new Store();
/*自动更新*/
let WebContent
const feedUrl = `http://www.rellal.com:8181/${process.platform}`;
function sendUpdateMessage(message, data) {
  WebContent.send("message", { message, data });

   /*   dialog.showMessageBox({
        type: 'info',
        title: '版本',
        message: message,
        detail: data,
    })*/
}
// 检查更新
function checkForUpdates() {
      sendUpdateMessage("start", '检测更新');
  // 设置更新服务器的地址, 其实就是一个静态文件服务器地址
  autoUpdater.setFeedURL(feedUrl);

  autoUpdater.on("error", function(message) {
    sendUpdateMessage("error", message);
  });
  autoUpdater.on("checking-for-update", function(message) {
    sendUpdateMessage("checking-for-update", message);
  });
  autoUpdater.on("update-available", function(message) {
    sendUpdateMessage("update-available", message);
  });
  autoUpdater.on("update-not-available", function(message) {
    sendUpdateMessage("update-not-available", message);
  });

  // 更新下载进度事件
  autoUpdater.on("download-progress", function(progressObj) {
    sendUpdateMessage("downloadProgress", progressObj);
  });
  // 下载完成事件
  autoUpdater.on("update-downloaded", function(
    event,
    releaseNotes,
    releaseName,
    releaseDate,
    updateUrl,
    quitAndUpdate
  ) {
    ipcMain.on("updateNow", (e, arg) => {
      // 停止当前程序并安装
      autoUpdater.quitAndInstall();
    });
    sendUpdateMessage("isUpdateNow", null);
  });
  // 执行检查更新
  autoUpdater.checkForUpdates();
}

/*开启aira2*/
function startengine() {
    console.log(process)
    console.log(spawn);
    const path = require('path');
    let a2path;
    if (process.env.NODE_ENV == 'development') {
        a2path = path.join(__dirname, '../src/aria2')
        console.log(__dirname)
    } else {
        a2path = path.join(__dirname, '../../aria2')
    }
    console.log(`cd /d ${a2path} & start.bat`)
    const child = spawn('cmd.exe', ['/c', `cd /d ${a2path} & start.bat`]);
    child.stdout.on('data', (data) => {
        console.log(`输出：${data}`);
    });
    child.stderr.on('data', (data) => {
        console.error(`错误：${data}`);
    });
    child.on('close', (code) => {
        console.log(`子进程退出码：${code}`);
    });
}
/*           */
/*child.kill(); windows环境下结束进程*/
function killtask(FileName) {
    return new Promise(res => {
        const killarg = spawn('cmd.exe', ['/c', `chcp 65001 & TASKKILL /F /IM ${FileName}`]);
        killarg.stdout.on('data', (data) => {
            console.log(`输出：${data}`);
        });
        killarg.stderr.on('data', (data) => {
            console.error(`错误：${data}`);
            res();
        });
        killarg.on('close', (code) => {
            console.log(`子进程退出码：kill:${code}`);
            res();
        });
    })
}
/*        -------------            */
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])
async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1600,
        height: 1200,
        frame: true,
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: true,
            contextIsolation: false,
            enabkeRemoteModule: true,
        }
    })
    WebContent = win.webContents;
    ipcMain.on('window-min', function() {
        win.minimize();
    })
    ipcMain.on('window-close', async function() {
        await killtask('aria2c.exe')
        app.quit();
    })
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }
}
// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    /*  if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
          await installExtension(VUEJS_DEVTOOLS)
        } catch (e) {
          console.error('Vue Devtools failed to install:', e.toString())
        }
      }*/
    startengine();
    createWindow();
    setTimeout(checkForUpdates, 1000);
  /*  autoupdate();*/
})
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
/*app.on('before-quit', async function () {
console.log('kill')
  await killtask('aria2c.exe');
})
*/
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})
ipcMain.on('setstore', function(k, v) {
    store.set(v.key, v.des)
    console.log(store.get(v.key), v.key)
})
ipcMain.handle("getstore", async (event, arg) => {
    return store.get(arg);
});
ipcMain.handle("selectpath", async (event, arg) => {
    const path = await new Promise((res) => {
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory']
        }).then(result => {
            res(result.filePaths)
            console.log(result.filePaths);
        })
    })
    return path;
});


function autoupdate() {
    dialog.showMessageBox({
        type: 'info',
        title: '版本',
        message: app.getVersion(),
        detail: app.getVersion(),
    })
    if (process.env.NODE_ENV != 'development') {
        const server = 'http://www.rellal.com:1377';
        const url = `${server}/update/${process.platform}/${app.getVersion()}`

        autoUpdater.setFeedURL({ url })

        autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
            const dialogOpts = {
                type: 'info',
                buttons: ['Restart', 'Later'],
                title: 'Application Update',
                message: process.platform === 'win32' ? releaseNotes : releaseName,
                detail: 'A new version has been downloaded. Restart the application to apply the updates.'
            }

            dialog.showMessageBox(dialogOpts).then((returnValue) => {
                if (returnValue.response === 0) autoUpdater.quitAndInstall()
            })
        })
        autoUpdater.on('error', message => {
            console.error('There was a problem updating the application')
            console.error(message)
            dialog.showMessageBox({
                type: 'info',
                title: '版本',
                message: 'There was a problem updating the applicatio',
                detail: message,
            })
        })
    }
}