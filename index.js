const koa = require('koa');
const proxy = require('koa-proxy');
const bodyParser = require('koa-bodyparser');
const respond = require('./lib/respond');
const Interceptor = require('./lib/interceptor');

function smoker(origin) {
    const _router = require('koa-router')();
    const _app = koa();
    const _intercepters = [];

    function _intercept(uri, method) {
        let ic = new Interceptor(uri, method);
        _intercepters.push(ic);
        return ic;
    }

    return {
        get(uri) {
            return _intercept(uri, 'GET');
        },
        post(uri) {
            return _intercept(uri, 'POST');
        },
        put(uri) {
            return _intercept(uri, 'PUT');
        },
        patch(uri) {
            return _intercept(uri, 'PATCH');
        },
        delete(uri) {
            return _intercept(uri, 'DELETE');
        },
        start(port) {
            for (const ic of _intercepters) {
                let method = _router[ic.method.toLowerCase()];
                method.call(_router, ic.uri, respond(ic));
            }
            _app.use(bodyParser())
                .use(_router.routes())
                .use(_router.allowedMethods())
                .use(proxy({
                    host: origin,
                }));
            _app.listen(port);
        }
    };
}

module.exports = smoker;
