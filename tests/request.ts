import { RequestHook, RequestLogger, Selector } from "testcafe";

const url = 'https://demos.telerik.com/aspnet-mvc/admin-dashboard';

const logger = RequestLogger(
    {url: 'https://demos.telerik.com/aspnet-mvc/admin-dashboard/Home/Read', method: 'post'}, {
    //{url:/\Home\/Read/, method: 'post'} , { 
    logResponseBody:    true,
    stringifyResponseBody : true
    }
);

fixture `My fixture`
    .page(url)
    .requestHooks(logger);

test('My first tests', async t=> {
    var signInButton = Selector('.k-button.k-primary');
    await t.click(signInButton);


    await t.expect(logger.contains(r => r.response.statusCode === 200)).ok();
    var parsed =  eval("(" +JSON.parse(JSON.stringify(logger.requests[0].response.body)) + ")") ;

    const firstName = parsed['Data'][0]['FullName']; 
    await t.expect(firstName).eql('Weidar McCombe');

})