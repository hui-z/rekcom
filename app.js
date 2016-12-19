const rekcom = require('./index')('http://127.0.0.1:8000');

rekcom.get('/api/v1/internal/business_group_pos/')
    .reply(200, [{
        "name": "锦屋料理",
        "uid": "80613676ec8f4b4c85266e14411a4756",
        "amount": 10
    }, {
        "name": "阿里松烧烤名家",
        "uid": "76072d674358489695c122780a5ccb0e",
        "amount": 11,
    }]);

rekcom.get('/api/v1/internal/sales_business_groups/')
    .reply(function(uri, requestBody) {
        return [
            200,
            {message: '成功'},
            {wechat: 'asshole'}
        ];
    });

rekcom.get('/api/v1/internal/query/')
    .reply(200, {
        messag: 'without query',
    });

rekcom.get('/api/v1/internal/query/')
    .reply(200, {
        message: 'query1',
    })
    .query({
        name: 'zaihui'
    });

rekcom.get('/api/v1/internal/query/')
    .reply(200, {
        message: 'query2',
    })
    .query({
        name: 'jingkai',
        age: '18'
    });

rekcom.get('/api/v1/internal/internal_error/')
    .reply(500, 'Internal ServerError');


rekcom.start(8001);
