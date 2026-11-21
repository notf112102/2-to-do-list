let btn_add = document.getElementById("btn_add"); 
let list = document.getElementById("list"); 
let task = document.getElementById("task");
let arr = [];  
if(localStorage.getItem("data")){
    let data = localStorage.getItem("data"); 
    arr = JSON.parse(data); 
    for(let i = 0; i < arr.length; i++){ 
        createItem(arr[i].value, arr[i].stats); 
    }
}
btn_add.addEventListener("click", () => {
    add_task(); 
})
list.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        add_task(); 
    } 
})
function check_input(str){
    str = str.trim(); 
    str = str.toLowerCase(); 
    for(let i = 0; i < arr.length; i++){
        let val1 = str.split(" "); 
        let val2 = arr[i].value.split(" "); 
        let str1 = val1.join(""); 
        let str2 = val2.join("");
        if(str1 == str2) return {desc: "the task is alredy exist", res: false};
    }
    let alpha = "qwertyuiopasdfghjklzxcvbnm";
    let count_alpha = 0; 
    for(let i = 0; i < str.length; i++){
        for(let j = 0; j< alpha.length; j++){
            if(str[i] == alpha[j]) {
                count_alpha++; 
                break; 
            }
        }
    }
    if(count_alpha < 3) return {desc:"the task should contain minimum three Letters", res: false};  
    return {desc:"", res: true}; 
}
function add_task(){
    let val = list.value;
    val = val.trim(); 
    val = val.toLowerCase();  
    let valid_input = check_input(val); 
    if(valid_input.res){
        let obj = {value:val, stats: 0}; 
        arr.push(obj); 
        localStorage.setItem("data", JSON.stringify(arr)); 
        let box = document.createElement("div");
        createItem(obj.value, obj.stats); 
        list.value = ""; 
    }
    else {
        btn_add.disabled = true;  
        btn_add.classList.add("disabled-button"); 
        list.disabled = true; 
        let body = document.body; 
        let div = document.createElement("div"); 
        div.className = "error-alert"; 
        let p = document.createElement("p");
        p.textContent = valid_input.desc; 
        div.appendChild(p); 
        body.appendChild(div); 
        setTimeout(() => {
            let error = document.querySelector(".error-alert"); 
            error.remove(); 
            btn_add.disabled = false; 
            btn_add.classList.remove("disabled-button"); 
            list.disabled = false; 
            list.focus(); 
        }, 2000);    
    }
}
function find_element(str){ 
    for(let i = 0; i < arr.length; i++){
        if(arr[i].value == str) return {idx:i, find:true}; 
    }
    return {idx:-1, find:false}; 
}
function createItem(value, stats){
    let box = document.createElement("div"); 
    box.className = "box"; 
    let txt = document.createElement("div"); 
    txt.className = "txt"; 
    if(stats == 1) txt.classList.add("do-it"); 
    txt.addEventListener("click", function(){
        let obj = find_element(value); 
        let idx = obj.idx; 
        if(this.classList.contains("do-it")){
            this.classList.remove("do-it");
            arr[idx].stats = 0;
        }
        else {
            this.classList.add("do-it");
            arr[idx].stats = 1;
        }
        localStorage.setItem("data", JSON.stringify(arr)); 
    })
    let span = document.createElement("span");
    txt.appendChild(span); 
    let p = document.createElement("p"); 
    p.textContent = value;
    txt.appendChild(p); 
    box.appendChild(txt); 
    let close = document.createElement("span"); 
    let i = document.createElement("i"); 
    i.classList.add("fa-solid", "fa-xmark"); 
    close.appendChild(i); 
    close.addEventListener("click", function(){
        let txt = this.previousSibling.childNodes[1].textContent; 
        for(let i = 0; i < arr.length; i++){
            if(arr[i].value === txt){ 
                arr.splice(i, 1); 
                break; 
            }
        }
        localStorage.setItem("data", JSON.stringify(arr));
        this.parentNode.remove();
    })   
    box.appendChild(close); 
    task.appendChild(box); 
}

// <i class="fa-solid fa-check"></i>
//<i class="fa-solid fa-xmark"></i>