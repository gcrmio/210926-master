// Marketing DE, Content Connection Program Smaple
// 01. Get Auth Token
// 02. Upsert Data Extension Table
// 03. List Content Category
// 04. List Content in a Content Category
// 05. Get Content Information(url)

"use strict";

var request = require('request');

// ----------------------------------------------------------------------------------------------------

module.exports.checkapi = function (req, res) {

    var payload = {
        client_id: "59x7z62ygf4iduainplpgtrk",          // client_id of app
        client_secret: "QBs7wrzcjKN3HR5cJZKvjzld",      // client_id of app
        grant_type: "client_credentials",               // type of servertoserver case
        account_id: "526002292"                         // MID
    };
    var clientServerOptions = {
        uri: 'https://mcycnrl05rhxlvjpny59rqschtx4.auth.marketingcloudapis.com/v2/token' ,  //fixed
        body: JSON.stringify(payload),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    function getToken() {

        return new Promise(function(resolve, reject) {
    
            request(clientServerOptions, function (error, response) {
                console.log("Auth Token Request: ");	
    
                resolve(response);
                return;
            });
        });
    };
    
    getToken().then(function(response) {
       
        var tmp = JSON.parse(response.body);

        console.log("");
        console.log("Token =====================================================================================================");
        console.log("TOKEN = [ "+tmp.access_token+ " ]");
        console.log("===========================================================================================================");
        console.log("");
        
        console.log("1111111111111111111111111111111111111111111111111111");
        addDE(tmp.access_token);
        console.log("2222222222222222222222222222222222222222222222222222");
        loadContentFolder(tmp.access_token);
        console.log("3333333333333333333333333333333333333333333333333333");
        loadContentList(tmp.access_token); 
        console.log("4444444444444444444444444444444444444444444444444444");
        loadContent(tmp.access_token); 

    });
    
    // 01. Get Auth Token
   

    res.status(200).send('checkapi response');
};


// ----------------------------------------------------------------------------------------------------
// Upsert to Data Extension

function addDE(atoken) {
    
    console.log("[ addDE called ]");	

    var payload2 = {
        "keys":{
            "CSTMSEQ":"KR00000005"
        },
        "values":{
                "FirstName":"Wonny",
                "LastName":"Two",
                "Mobile":"821031248442"
                 }
    }
    
    var DEputOptions = {
        uri: 'https://mcycnrl05rhxlvjpny59rqschtx4.rest.marketingcloudapis.com/hub/v1/dataevents/key:06A11BE8-D9E7-4FFD-B7A1-98F0F9F2B747/rows/CSTMSEQ:KR00000005' ,
        body: JSON.stringify(payload2),
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + atoken ,
        },
        client_id: "59x7z62ygf4iduainplpgtrk",
        client_secret: "QBs7wrzcjKN3HR5cJZKvjzld",
        grant_type: "client_credentials",
        account_id: "526002292"        
    }

    request(DEputOptions, function (error, response) {
        console.log(error,response.body);

        var tmp = JSON.parse(response.body);
        console.log("");
        console.log("Data Extension Upsert =====================================================================================");
        console.log("UPSERT DE = [ "+response.body+ " ]");
        console.log("===========================================================================================================");

        console.log("");
        return;
    });

    res.status(200).send('addDE response');
};

/*
2021-10-10T06:37:11.467879+00:00 app[web.1]: Data Extension Upsert =====================================================================================
2021-10-10T06:37:11.467904+00:00 app[web.1]: UPSERT DE = [ {"keys":{"id":"ID102"},"values":{"name":"TEST LEE","msg":"This Is The First Thing","cdate":"2021-10-09T14:32:00Z"}} ]
2021-10-10T06:37:11.467918+00:00 app[web.1]: ===========================================================================================================

*/

// ----------------------------------------------------------------------------------------------------
// Retrieve Category List(Folders)

function loadContentFolder(atoken) {
    
    console.log("[ loadContentFolder called ]");

    var ContentOptions = {
        uri: 'https://mcycnrl05rhxlvjpny59rqschtx4.rest.marketingcloudapis.com/asset/v1/content/categories?$pagesize=20' ,
        //body: JSON.stringify(payload2),
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + atoken ,
        },
        client_id: "59x7z62ygf4iduainplpgtrk",
        client_secret: "QBs7wrzcjKN3HR5cJZKvjzld",
        grant_type: "client_credentials",
        account_id: "526002292"        
    }
    
    request(ContentOptions, function (error, response) {
        //console.log("ContentOptions: ");	
        console.log(error,response.body);
        var tmp = JSON.parse(response.body);

        console.log("");
        console.log("Category List =============================================================================================");
        for(const item of tmp.items){
            console.log("ID= "+item.id+" Name= "+item.name+" ParentId= "+item.parentId);
        }
        console.log("===========================================================================================================");

        console.log("");

        
        return;
    });
    
    res.status(200).send('addDE response');
};

/*
2021-10-10T06:37:11.577275+00:00 app[web.1]: Category List =============================================================================================
2021-10-10T06:37:11.577338+00:00 app[web.1]: ID= 7965 Name= Content Builder ParentId= 0
2021-10-10T06:37:11.577364+00:00 app[web.1]: ID= 13776 Name= TW_LNG ParentId= 7965
2021-10-10T06:37:11.577387+00:00 app[web.1]: ID= 15307 Name= TW_SWS ParentId= 7965
2021-10-10T06:37:11.577405+00:00 app[web.1]: ID= 15308 Name= for LINE ParentId= 13776
2021-10-10T06:37:11.577423+00:00 app[web.1]: ID= 16251 Name= Training_Cle_AP_TW ParentId= 7965
2021-10-10T06:37:11.577440+00:00 app[web.1]: ID= 16252 Name= Blocks/Layouts ParentId= 16251
2021-10-10T06:37:11.577460+00:00 app[web.1]: ID= 16253 Name= Emails ParentId= 16251
2021-10-10T06:37:11.577477+00:00 app[web.1]: ID= 16254 Name= Images ParentId= 16251
2021-10-10T06:37:11.577493+00:00 app[web.1]: ID= 16255 Name= Templates ParentId= 16251
2021-10-10T06:37:11.577517+00:00 app[web.1]: ===========================================================================================================

*/


// ----------------------------------------------------------------------------------------------------
// Retrieve Asset List by ParentId

function loadContentList(atoken) {

    console.log("[ loadContentFolder called ]");

    var payload3 = {
            "page":
            {
                "page":1,
                "pageSize":50
            },        
            "query":
                    {
                        "property": "category.id",
                        "simpleOperator": "equals",
                        //"valueType": "int",
                        "value": 16254
                    },
            "sort":
            [
                { "property":"id", "direction":"ASC" }
            ],        
            "fields":
            [
                "enterpriseId",
                "memberId",
                "thumbnail",
                "category",
                "content",
                "data"
            ]
    }
    
    var ContentOptions = {
        //uri: 'https://mcycnrl05rhxlvjpny59rqschtx4.rest.marketingcloudapis.com/asset/v1/content/assets?$page=1&$pagesize=50&$filter=category.id%20eq%2016254',
        uri: 'https://mcycnrl05rhxlvjpny59rqschtx4.rest.marketingcloudapis.com/asset/v1/content/assets/query' ,
        body: JSON.stringify(payload3),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + atoken ,
        },
        client_id: "59x7z62ygf4iduainplpgtrk",
        client_secret: "QBs7wrzcjKN3HR5cJZKvjzld",
        grant_type: "client_credentials",
        account_id: "526002292"        
    }
    
    request(ContentOptions, function (error, response) {
        //console.log("ContentOptions: ");	
        console.log(error,response.body);
        var tmp = JSON.parse(response.body);

        console.log("");
        console.log("Content List ==============================================================================================");
        for(const item of tmp.items){
            console.log("ID= "+item.id+" Name= "+item.name+" assetType= "+item.assetType.name+" category= "+item.category.id);
        }
        console.log("===========================================================================================================");

        console.log("");

        
        return;
    });
    
    res.status(200).send('addDE response');
};

/*
2021-10-10T06:37:11.707646+00:00 app[web.1]: Content List ==============================================================================================
2021-10-10T06:37:11.707699+00:00 app[web.1]: ID= 11785 Name= demo2.jpg assetType= jpg category= 16254
2021-10-10T06:37:11.707728+00:00 app[web.1]: ID= 12269 Name= news_1596069099_1444722_m_1.jpeg assetType= jpeg category= 16254
2021-10-10T06:37:11.707730+00:00 app[web.1]: ID= 12270 Name= news_1521435544_934158_main2.jpg assetType= jpg category= 16254
2021-10-10T06:37:11.707739+00:00 app[web.1]: ID= 12271 Name= azIk8aIJu2vfskP6boqrThXj3TM.jpg assetType= jpg category= 16254
2021-10-10T06:37:11.707750+00:00 app[web.1]: ID= 12272 Name= 2019041000039_0.jpg assetType= jpg category= 16254
2021-10-10T06:37:11.707764+00:00 app[web.1]: ID= 12273 Name= 2020101600794_0.png assetType= png category= 16254
2021-10-10T06:37:11.707778+00:00 app[web.1]: ===========================================================================================================

*/

// ----------------------------------------------------------------------------------------------------
// Retrieve Asset by Id

function loadContent(atoken) {

    console.log("[ loadContent called ]");

    var payload4 = {
    }
    
    var ContentOptions = {
        uri: 'https://mcycnrl05rhxlvjpny59rqschtx4.rest.marketingcloudapis.com/asset/v1/content/assets/21089' ,
        //body: JSON.stringify(payload4),
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + atoken ,
        },
        client_id: "59x7z62ygf4iduainplpgtrk",
        client_secret: "QBs7wrzcjKN3HR5cJZKvjzld",
        grant_type: "client_credentials",
        account_id: "526002292"        
    }
    
    request(ContentOptions, function (error, response) {
        //console.log("ContentOptions: ");	
        console.log(error,response.body);
        var tmp = JSON.parse(response.body);

        console.log("");
        console.log("Content Info ==============================================================================================");

        console.log(tmp.name);
        console.log(tmp.fileProperties.publishedURL);

        console.log("===========================================================================================================");
        console.log("");


        
        return;
    });
    
    res.status(200).send('addDE response');
};

/*
2021-10-10T06:37:11.646369+00:00 app[web.1]: Content Info ==============================================================================================
2021-10-10T06:37:11.646371+00:00 app[web.1]: change.png
2021-10-10T06:37:11.646385+00:00 app[web.1]: https://image.s12.sfmc-content.com/lib/fe3311727364047f771d72/m/1/1c721a33-2072-4db8-a789-22f62baf419a.png
2021-10-10T06:37:11.646398+00:00 app[web.1]: ===========================================================================================================

*/
