const remote = require('electron').remote;
const dialog = require('electron').remote.dialog;
var path=require('path')
var request=require("request")
var fs=require('fs')

const projectPath = path.resolve('./');
const keysPath=path.join(projectPath,"app","keys","user.keys");

function revokeAttr() {
    var form1=document.getElementById("form1");
    var form2=document.getElementById("form2")
    var tagElements1=form1.getElementsByTagName("input");
    var tagElements2=form2.getElementsByTagName("input");

    var attributes=new Array();
    var users=new Array();
    for(var j=0;j<tagElements1.length;j++){
        attributes.push(tagElements1[j].value);
    }
    for(var i=0;i<tagElements2.length;i++){
        users.push(tagElements2[i].value)
    }
    var requestData={
        'users':users,
        'attributes':attributes
    }

    request({
        url:'http://localhost:8090/AA/revokeAttributes',
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: requestData
    }, function(error, response, body) {
        if (!error && response.statusCode == 200 && body==true) {
            console.log(body);
            dialog.showMessageBox({
                type:"info",
                title:"结果",
                message:"属性撤销成功"
            })
        }else {
            dialog.showErrorBox(
                "错误",
                "属性撤销失败"
            )
        }
    });
}

