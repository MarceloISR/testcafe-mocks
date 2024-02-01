import { RequestHook, RequestLogger, Selector } from "testcafe";

const url = 'https://demos.telerik.com/aspnet-mvc/admin-dashboard/';
const logger = RequestLogger(
    //1st parameter
    req=> { 
        return Number(req.headers['content-length']) > 39 && 
        Number(req.headers['content-length']) < 50; 
    }, 
    //{url: 'https://demos.telerik.com/aspnet-mvc/admin-dashboard/Home/Read' },  
    //{url: /\Home\/Read/, method: 'post'},
    //2nd parameter
    {
        logResponseBody: true,
        stringifyResponseBody: true
    });

fixture `RequestMock fixture`
    .page(url)
    .requestHooks(logger)

test(`probando requestLogger`, async t => {
    var signInButton = Selector('.k-button.k-primary');
    //Click signIn
    await t.click(signInButton);

    //succesful request 
    await t.expect(logger.contains(r=>r.response.statusCode === 200)).ok();

    //transform node.js buffer to object-keys 
    const stringified = JSON.stringify(logger.requests[0].response.body);
    const parsed = JSON.parse(stringified);
    const transform = eval("(" + parsed + ")");

    //verify that the first employer is the expected
    await t.expect(transform['Data'][0]['FullName']).eql('Weidar McCombe');
});