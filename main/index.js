"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const config_js_1 = require("./config.js");
const platform_js_1 = require("./types/platform.js");
const Logger_js_1 = require("./packages/logger/Logger.js");
const systemMenu_js_1 = require("./lib/systemMenu.js");
const tray_js_1 = require("./lib/tray.js");
const singleInstance_js_1 = require("./lib/singleInstance.js");
const createWindow_js_1 = require("./lib/createWindow.js");
const updater_js_1 = require("./lib/updater.js");
const events_js_1 = require("./events.js");
const customTitleBar_js_1 = require("./lib/customTitleBar.js");
const loadURL_js_1 = require("./lib/loadURL.js");
const deviceInfo_js_1 = require("./lib/deviceInfo.js");
const safeRedirects_js_1 = require("./lib/safeRedirects.js");
const handleCrash_js_1 = require("./lib/handlers/handleCrash.js");
const handleExternalLink_js_1 = require("./lib/handlers/handleExternalLink.js");
const handleWindowLifecycleEvents_js_1 = require("./lib/handlers/handleWindowLifecycleEvents.js");
const handleDeeplink_js_1 = require("./lib/handlers/handleDeeplink.js");
const handleUncaughtException_js_1 = require("./lib/handlers/handleUncaughtException.js");
const handleWindowSessionEvents_js_1 = require("./lib/handlers/handleWindowSessionEvents.js");
const handleWindowReady_js_1 = require("./lib/handlers/handleWindowReady.js");
const handleHeadersReceived_js_1 = require("./lib/handlers/handleHeadersReceived/handleHeadersReceived.js");
const handleBackgroundTasks_js_1 = require("./lib/handlers/handleBackgroundTasks.js");
Logger_js_1.Logger.setupLogger();
(0, handleUncaughtException_js_1.handleUncaughtException)();
(0, singleInstance_js_1.checkForSingleInstance)();
(0, handleDeeplink_js_1.handleDeeplinkOnApplicationStartup)();
(async () => {
    const updater = (0, updater_js_1.getUpdater)();
    await electron_1.app.whenReady();
    const window = await (0, createWindow_js_1.createWindow)();
    (0, systemMenu_js_1.setupSystemMenu)(window);
    if (deviceInfo_js_1.devicePlatform === platform_js_1.Platform.WINDOWS) {
        (0, tray_js_1.setupTray)(window);
    }
    (0, safeRedirects_js_1.safeRedirects)(window);
    (0, handleWindowReady_js_1.handleWindowReady)(window);
    (0, handleWindowLifecycleEvents_js_1.handleWindowLifecycleEvents)(window);
    (0, handleWindowSessionEvents_js_1.handleWindowSessionEvents)(window);
    (0, events_js_1.handleApplicationEvents)(window);
    (0, handleExternalLink_js_1.handleExternalLink)(window);
    (0, handleDeeplink_js_1.handleDeeplink)(window);
    (0, handleHeadersReceived_js_1.handleHeadersReceived)(window);
    (0, handleBackgroundTasks_js_1.handleBackgroundTasks)(window);
    (0, handleCrash_js_1.handleCrash)();
    await (0, loadURL_js_1.loadURL)(window);
    if ([platform_js_1.Platform.WINDOWS, platform_js_1.Platform.LINUX].includes(deviceInfo_js_1.devicePlatform)) {
        (0, customTitleBar_js_1.createCustomTitleBar)(window);
    }
    if (config_js_1.config.app.enableAutoUpdate) {
        updater.start();
        updater.onUpdate((version) => {
            (0, events_js_1.sendUpdateAvailable)(window, version);
        });
    }
})();
