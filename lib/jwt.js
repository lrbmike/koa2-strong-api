const jwt = require('jsonwebtoken')

class JWT {

    constructor() {
         let config = global.koa_config;
         this.jwt_config = config.jwt
    }

    sign(payload) {
        return jwt.sign(payload, this.jwt_config.secret);
    }

    verify(token) {
        return jwt.verify(token.split(' ')[1], this.jwt_config.secret);
    }

}

let apiJwt = new JWT();

module.exports = apiJwt