const Koa = require('koa')
const Bodyparser = require('koa-bodyparser');
const Formidable = require('./formidable');
const Router = require('./router');
const koaJwt = require('koa-jwt')

class Application extends Koa {

    constructor() {
        super();

        this.config = global.koa_config;

        this.s_middleware = []
    }

    bind(middleware) {
        this.s_middleware.push(middleware);
    }

    start(port) {

        let root = process.cwd();

        for(let mid of this.s_middleware){
            this.use(mid)
        }

        let jwtConfig = this.config.jwt;
        if (jwtConfig.open) {
            let reg = new RegExp(jwtConfig.unless_path)
            this.use(koaJwt({secret: jwtConfig.secret}).unless({
                path: [reg]
            }))
        }

        let formConfig = this.config.form;
        this.use(Formidable(formConfig));

        let bodyparserConfig = this.config.bodyparser;
        this.use(Bodyparser(bodyparserConfig));

        this.proxy = true;

        this.use(Router());

        port = port || 9032;
        this.listen(port);
    }

}

module.exports = Application;