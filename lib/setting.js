const fs = require('fs');
const path = require('path');

class Setting {

    constructor() {

        let root = process.cwd();
        let settingFilePath = path.join(root, '/config/setting.json')

        try {
            fs.accessSync(settingFilePath, fs.F_OK)

            this.config = require(settingFilePath)

        } catch (err) {
            console.warn('setting.json file not exist, use default setting')

            this.config = {
                "jwt": {
                    "open": true,
                    "secret": "koa2-strong-api-jwt",
                    "token_expires_time": 604800000,
                    "unless_path": "^\/login"
                },
                "form": {
                    "uploadDir": "uploads/"
                },
                "bodyparser": {
                    "formLimit": "2mb"
                },
                "router": {
                    "routesFilePath": "/config/routes.js",
                    "controllerFilePath": "/app/controllers/{controller}.js",
                    "controllerPattern": "{controller}"
                },
                "db": {
                    "settingPath": "/config/db.json",
                    "modelPath": "/app/schema"
                },
                "logger": {
                    "appenders": {
                        "out": { "type": "stdout"},
                        "app": { "type": "dateFile", "filename": "logs/app.log", "pattern": ".yyyy-MM-dd", "compress": true}
                    },
                    "categories": {
                        "default": { "appenders": [ "out", "app" ], "level": "debug" }
                    }
                }
            }
        }

        global.koa_config = this.config
    }

}



module.exports = Setting