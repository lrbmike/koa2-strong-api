# koa2-strong-api
The interface service project integration koa2 middleware

## Usage

this module has a default setting(you must conform to the specifications), now you can use the setting file to configure different modules, just add a 'setting.json' file in the config directory

'setting.json' like this
```json
{
  "jwt": {
      "open": true,
      "secret": "koa2-strong-api-jwt",
      "token_expires_time": 1000 * 60 * 60 * 24 * 7,
      "unless_path": [/^\/login/]
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
```
if you want to modify an attribute, you can see the corresponding module

#### Start
project startup file 'app.js' like this:
```js
// use Application module, and include some modules with the default setting
const Application = require('koa2-strong-api').Application;
const app = new Application()
// the default port is 9012.
app.start();
```