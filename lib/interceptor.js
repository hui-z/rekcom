const _ = require('lodash');

//interceptor
function Interceptor(uri='/', method='GET') {
    this.uri = uri;
    this.method = method;
    this.statusCode = 200;
    this.body = {};
    this.rawQuery = null;
    this.headers = null;
}

Interceptor.prototype.reply = function reply(statusCode, body, rawHeaders) {
    // use callback to get statusCode, body, and headers
    if (_.isFunction(statusCode)) {
        this.getOptions = statusCode;
        return this;
    }
    
    this.body = body;
    this.statusCode = statusCode;
    this.headers = rawHeaders;
    return this;
}

Interceptor.prototype.replyWithFile = function replyWithFile() {

}

Interceptor.prototype.query = function query(query) {
    this.rawQuery = query;
    return this;
}

module.exports = Interceptor;
