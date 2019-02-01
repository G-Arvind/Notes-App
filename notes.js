var flag=-1;

var delid=-1;

var div=document.getElementById("addcontainer");

var newbtn=document.getElementById("newbtn");

var ipcontent=document.getElementById("area");

ipcontent.innerText="";

var list=document.getElementById("list");

var item_id=0;

var data="";

var idval=-1;

var notes={
   "data":"",
};

list.addEventListener("click",function(event){

    var element=event.target;

    if(element.getAttribute('type')=="items"){

        //list.children.style.background="#3c4554";

       // element.style.background="#3d353a";

       idval=element.getAttribute('id');

       var tempel=document.getElementById(idval);

       console.log(tempel.childNodes[0].innerHTML);

       ipcontent.value=tempel.childNodes[0].innerHTML;

       delid=idval;

    }

    //console.log(notes[idval]['data']);



    //ipcontent.value=element;

  //  ipcontent.value=notes[idval]['data'];
    
});

ipcontent.addEventListener("keyup",function(){



    update(this.value);



});

async function newnews(){
    if(flag==-1){

        alert("Cannot have more than one empty note");
        return;

    }

    var bodyobj={
        "description":""
    }

   let str=JSON.stringify(bodyobj);

   let tokenval=localStorage.getItem("token");

    let result=await fetch("http://192.168.100.162:3000/notes",{
        method: "post",
        body: str,
        headers:{
            "Authorization":"Bearer "+tokenval,
            "Content-Type": "application/json"
        } 
    });

    let resp=await result.json();

    console.log(resp);

     if(resp.isSuccess){
       data=resp.responseBody.description;
       item_id=resp.responseBody.id;
       alert("New note Created id is"+item_id);
     }


data="New Notes";

//item_id++;

list.innerHTML+="<li type='items' id="+item_id+"><span>"+data+"</span></li>";   

ipcontent.value="";

// newbtn.style.display="none";
// div.style.display="block";

}

async function verifytoken(){

    ipcontent.value="";

    //alert("token ver");

    let tokenval=localStorage.getItem("token");

    let result=await fetch("http://192.168.100.162:3000/notes",{
        method: "get",
        headers:{
            "Authorization":"Bearer "+tokenval,
            "Content-Type": "application/json"
        } 
    });

    let resp=await result.json();

    console.log(resp);

     if(resp.isSuccess){
        for(var i=0;i<resp.responseBody.length;i++){

            if(data=resp.responseBody[i].description==""){
                flag=-1;
            }else{
               flag=2; 
            }

            data=resp.responseBody[i].description;
            item_id=resp.responseBody[i].id;

           // console.log("ifff",resp.responseBody.id);

//item_id++;

list.innerHTML+="<li type='items' id="+item_id+"><span>"+data+"</span></li>";   
            
        }
        alert("Welcome");
     }

}

async function update(data){

//console.log(this.value);
if(idval>-1){
    item_id=idval;
    }

var li=document.getElementById(""+item_id+"");

//data=this.value;

notes[item_id]={
    "data":data,
};
console.log(data);
var bodyobj={
    "description":data
}

let str=JSON.stringify(bodyobj);

let tokenval=localStorage.getItem("token");

let result=await fetch("http://192.168.100.162:3000/notes/"+item_id,{
    method: "put",
    body: str,
    headers:{
        "Authorization":"Bearer "+tokenval,
        "Content-Type": "application/json"
    } 
});

let resp=await result.json();

console.log(resp);



//console.log(notes);


// if(data.length<=5){
//     li.innerText=this.value;
// }
// else if(data.length>=6){
//     li.innerText=data.slice(0,5)+"...";
// }
//console.log(li.childNodes[0]);
console.log(data);
li.childNodes[0].innerText=data;

}

async function deletenote(){

    if(delid!=-1){
    let tokenval=localStorage.getItem("token");
    let result=await fetch("http://192.168.100.162:3000/notes/"+delid,{
    method: "delete",
    headers:{
        "Authorization":"Bearer "+tokenval
    } 
});

let resp=await result.json();

if(resp.isSuccess){
    alert("Delete success");
    ipcontent.value="";
    var litag=document.getElementById(delid);
    console.log(litag);
    litag.parentElement.removeChild(litag);
    delid=-1;
    return;
}
else{
    alert("Delete Failed");
    delid=-1;
    return;
}

//console.log(resp);

    }
    else{
       alert("no item selected");
       delid=-1;
       return;
    }

}