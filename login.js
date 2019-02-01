

var form1=document.getElementById("loginform");
var form2=document.getElementById("signupform");

var div1=document.getElementById("topbar1");
var div2=document.getElementById("topbar2");

function loginui(){
    form1.style.display="block";
    form2.style.display="none";
    div2.style.border="none";
    div1.style.border="2px solid white";
}
function newpage(){

    window.location="notes.html";
}
function signupui(){
    form1.style.display="none";
    form2.style.display="block";
    div1.style.border="none";
    div2.style.border="2px solid white";  
}

async function login(){
    
    var uname=document.getElementById("uname");

    var pass=document.getElementById("pass");

    uidval=uname.value;
    passval=pass.value;

    
     var bodyobj={
         "username":uidval,
         "password":passval
     }

    let str=JSON.stringify(bodyobj);


    let result=await fetch("http://192.168.100.162:3000/auth/login",{
        method: "post",
        body: str,
        headers:{
            "Content-Type": "application/json"
        } 
    });

    let resp=await result.json();

     if(resp.isSuccess){
         let tokenval=resp.responseBody.token;
         localStorage.setItem("token", tokenval);
         window.location="notes.html";
     }
     else{
         alert("Invalid Details");
     }

    console.log(resp);



}

async function signup(){
    
    var uname=document.getElementById("suname");

    var pass=document.getElementById("spass");

    uidval=uname.value;
    passval=pass.value;

    if(passval.length<6){
        alert("password should be atleast 6 characters long");
        return;
    }

     var bodyobj={
     "username":uidval,
     "password":passval
    }

    let str=JSON.stringify(bodyobj);

    let result=await fetch("http://192.168.100.162:3000/auth/register",{
        method: "post",
        body: str,
        headers:{
            "Content-Type": "application/json"
        } 
    });

    let resp=await result.json();

    if(resp.isSuccess){
        let tokenval=resp.responseBody.token;
        localStorage.setItem("token", tokenval);
        window.location="notes.html";
    }
    else{
        alert("Invalid Details");
    }

    console.log(resp);

}

async function validatetoken(){

    let tokenval=localStorage.getItem("token");

    var bodyobj={
        "token":tokenval
    }

   let str=JSON.stringify(bodyobj);

   //console.log(SVGAnimatedString);

    let result=await fetch("http://192.168.100.162:3000/auth/validate-token",{
        method: "post",
        body:str,
        headers:{
            "Content-Type": "application/json"
        } 
    });

    let resp=await result.json();

    console.log(resp);

     if(resp.isSuccess){
        window.location="notes.html";
     }

}



