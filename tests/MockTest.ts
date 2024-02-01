import { RequestLogger, RequestMock, Selector } from "testcafe";
const url = 'https://demos.telerik.com/aspnet-mvc/admin-dashboard/';

const mockResponse = 
    {
        AggregateResults:null,
        Data:[
            {
                Id:16,
                FullName:"Wilfredo Vargas",
                JobTitle:"Civil Engineer",
                Rating:1,
                Budget:25000
            },
            {
                Id:27,
                FullName:"Marisabel Vargas",
                JobTitle:"Engineer III",
                Rating:5,
                Budget:20000
            },
            {
                Id:29,
                FullName:"Enrique Pineda",
                JobTitle:"Software Engineer I",
                Rating:3,
                Budget:25000
            },
            {
                Id:32,
                FullName:"Carolina Delfina",
                JobTitle:"Software Engineer III",
                Rating:2,
                Budget:30000
            },
            {
                Id:34,
                FullName:"Rodrigo Alonso Ponce",
                JobTitle:"Nuclear Power Engineer",
                Rating:1,
                Budget:-32000
            },
            {
                Id:35,
                FullName:"David Schroepfer",
                JobTitle:"Chief Design Engineer",
                Rating:2,
                Budget:40000
            },
            {
                Id:26,
                FullName:"Elia Moya",
                JobTitle:"Structural Analysis Engineer",
                Rating:4,
                Budget:20000
            }
        ],
        Total:18,
        Errors:null
    };

const mock = RequestMock()
	.onRequestTo( /\/Home\/Read/ )
	.respond(mockResponse, 200);

fixture('RequestMock fixture ')
    .page(`${url}`)
    .requestHooks(mock)

test('requestMock test', async t => {
    var signInButton = Selector('.k-button.k-primary');
    //Click signIn
    await t.click(signInButton);

    //existe el botón Logout
    var logoutButton = Selector('.k-button.k-secondary').withText('Logout');
    await t.expect(logoutButton.exists).ok();

    //Optener el primer nombre de la tabla
    var employerSelector= Selector('tbody tr.k-master-row').nth(0).find('td');
    var text = await employerSelector.innerText;
    
    //verificar que el primer nombre es el esperado
    await t.expect(text).contains('Wilfredo Vargas');

});

