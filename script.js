function validate(callback){
    let username= document.getElementById("username");
    let password=document.getElementById("password");

    if(username.value.trim()=="admin" && password.value.trim()=="12345"){
        callback();
    }
    else{
        alert("invalid credentials");
        return false;
    }
}

function redirect(){

    window.location.href="./todo.html";
}

function displaylist(){

    var httpRequest=new XMLHttpRequest();
    httpRequest.onreadystatechange=function(){
        try{
            if(httpRequest.readyState===XMLHttpRequest.DONE){
                if(httpRequest.status===200){
                    // console.log(httpRequest.responseText);
                    display(httpRequest.responseText);
                }
                else{
                    alert("Error from API");
                }
            }
        }
    

    catch(e){

        alert(e.description);
    }
};
    try{
        httpRequest.open('GET','https://jsonplaceholder.typicode.com/todos',true);
        httpRequest.send();

    }
    catch(e){
        alert(e.description);

    }
}

function logout(){
    window.location.href="./index.html";
}

function display(data){
    // console.log(data);
    var list=JSON.parse(data);
    console.log(list);
    let table= document.getElementById("todotable");
    
    for(var i=0;i<list.length;i++){
        
        let rowcount= table?.ariaRowSpan?.length ?? 0;
        console.log(rowcount);
        var row=table.insertRow(rowcount);
        var cell1=row.insertCell(0);
        cell1.innerHTML=list[i].title;

        var cell2=row.insertCell(1);
        cell2.innerHTML=list[i].title;

        var cell3=row.insertCell(2);
        var element= document.createElement("input");
        element.type="checkbox";

        if(list[i].completed==true){
            element.setAttribute("checked","true");
            element.setAttribute("disabled","true");

        }

        element.addEventListener('change',(event)=>{
            if(event.currentTarget.checked){
                count++;
                checkcounter();
            }
            else{
                count--;

            }
        })
        cell3.appendChild(element);
    

    }
    let rowcount= table?.ariaRowSpan?.length ?? 0;
    var row=table.insertRow(rowcount);

    var cell1=row.insertCell(0);
    cell1.innerHTML="title";

    var cell2=row.insertCell(1);
    cell2.innerHTML="task description";

    var cell3=row.insertCell(1);
    cell3.innerHTML="status";
}

var count=0;
function checkcounter(){
    let promise=new Promise(function(resolve,reject){
        if(count==5){
            resolve("congrats, 5 tasks have been completed");

        }
    })
    promise.then(function(s){
        alert(s);
    })
}