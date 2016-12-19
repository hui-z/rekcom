const Interceptor = require('./interceptor');

module.exports = function respond(interceptor) {
    if (!interceptor) throw new Error('interceptor doesn\'t exist, how to respond?');
    if (!(interceptor instanceof Interceptor))
        throw new Error('interceptor is not instance of Interceptor!');
    return function*(next) {
        // passby requests that have query while interceptor not specified query
        if (this.request.querystring && !interceptor.rawQuery) {
            yield next;
            return;
        }

        // passby requests that query not match interceptor query
        if (interceptor.rawQuery) {
            let queryMatch = true;
            for (const [k, v] of Object.entries(interceptor.rawQuery)) {
                // query should all in string format
                if (this.request.query[k] != v) {
                    queryMatch = false;
                    break;
                }
            }
            if (!queryMatch) {
                yield next;
                return;
            }
        }

        // read options from callback
        let options = [];
        if (interceptor.getOptions) {
            options = interceptor.getOptions(interceptor.uri, this.request.body);
        }

        // use value in options first
        let headers = options[2] || interceptor.headers;
        if (headers) {
            for (const [k, v] of Object.entries(headers)) {
                this.set(k, v);
            }
        }

        let body = options[1] || interceptor.body;
        if (typeof body === 'object') {
            this.set('Content-Type', 'application/json');
        }
        this.body = JSON.stringify(body);

        this.status = options[0] || interceptor.statusCode;
    }
}
