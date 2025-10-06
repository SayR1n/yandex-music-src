"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSystemMenu = void 0;
const electron_1 = require("electron");
const deviceInfo_js_1 = require("./deviceInfo.js");
const updater_js_1 = require("./updater.js");
const config_js_1 = require("../config.js");
const platform_js_1 = require("../types/platform.js");
const formatters_js_1 = require("./i18n/formatters.js");
const createWindow_js_1 = require("./createWindow.js");
const createSupportChatUrl = () => {
    const context = JSON.stringify({ entrypoint: 'web_desktop' });
    return `https://yandex.ru/chat?context=${encodeURIComponent(context)}#${config_js_1.config.common.SUPPORT_URL}`;
};
const createContextMenu = (window) => {
    const updater = (0, updater_js_1.getUpdater)();
    const template = [];
    if (deviceInfo_js_1.devicePlatform === platform_js_1.Platform.MACOS) {
        template.push({
            label: (0, formatters_js_1.formatMessage)({ id: 'about-app.app-name' }),
            submenu: [
                {
                    label: (0, formatters_js_1.formatMessage)({ id: 'desktop.about' }),
                    role: 'about'
                },
                {
                    label: (0, formatters_js_1.formatMessage)({ id: 'desktop.check-for-updates' }),
                    click() {
                        updater.check();
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: (0, formatters_js_1.formatMessage)({ id: 'desktop.terms' }),
                    click() {
                        electron_1.shell.openExternal(config_js_1.config.common.TERMS_OF_USE_URL);
                    }
                },
                {
                    label: (0, formatters_js_1.formatMessage)({ id: 'desktop.recommendations' }),
                    click() {
                        electron_1.shell.openExternal(config_js_1.config.common.RECOMMENDATIONS_URL);
                    }
                },
                {
                    label: (0, formatters_js_1.formatMessage)({ id: 'desktop.support' }),
                    click() {
                        electron_1.shell.openExternal(createSupportChatUrl());
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: (0, formatters_js_1.formatMessage)({ id: 'desktop.hide-yandex-music' }),
                    role: 'hide'
                },
                {
                    label: (0, formatters_js_1.formatMessage)({ id: 'desktop.close-yandex-music' }),
                    accelerator: 'CmdOrCtrl+W',
                    click() {
                        if (window) {
                            (0, createWindow_js_1.toggleWindowVisibility)(window, false);
                        }
                    }
                },
                {
                    label: (0, formatters_js_1.formatMessage)({ id: 'desktop.quit-yandex-music' }),
                    role: 'quit'
                }
            ]
        });
        template.push({
            label: (0, formatters_js_1.formatMessage)({ id: 'desktop.edit' }),
            submenu: [
                {
                    label: (0, formatters_js_1.formatMessage)({ id: 'desktop.undo' }),
                    accelerator: 'CmdOrCtrl+Z',
                    role: 'undo'
                },
                {
                    label: (0, formatters_js_1.formatMessage)({ id: 'desktop.redo' }),
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    label: (0, formatters_js_1.formatMessage)({ id: 'desktop.cut' }),
                    accelerator: 'CmdOrCtrl+X',
                    role: 'cut'
                },
                {
                    label: (0, formatters_js_1.formatMessage)({ id: 'desktop.copy' }),
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy'
                },
                {
                    label: (0, formatters_js_1.formatMessage)({ id: 'desktop.paste' }),
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste'
                },
                {
                    label: (0, formatters_js_1.formatMessage)({ id: 'desktop.select-all' }),
                    accelerator: 'CmdOrCtrl+A',
                    role: 'selectAll'
                }
            ]
        });
        template.push({
            label: (0, formatters_js_1.formatMessage)({ id: 'desktop.window' }),
            submenu: [
                {
                    label: (0, formatters_js_1.formatMessage)({ id: 'desktop.minimize' }),
                    accelerator: 'CmdOrCtrl+M',
                    role: 'minimize'
                }
            ]
        });
    }
    if (config_js_1.config.app.enableDevTools) {
        const debugMenu = [
            {
                role: 'reload'
            },
            {
                role: 'forceReload'
            },
            {
                role: 'toggleDevTools'
            }
        ];
        template.push({
            label: 'Debug',
            submenu: debugMenu
        });
    }
    return electron_1.Menu.buildFromTemplate(template);
};
const setupSystemMenu = (window) => {
    electron_1.Menu.setApplicationMenu(createContextMenu(window));
};
exports.setupSystemMenu = setupSystemMenu;
