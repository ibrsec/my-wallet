

const form = document.querySelector("form");


form.addEventListener("click",(e)=>{
   

    if(e.target.id == "save"){
         e.preventDefault();
        saveExpenses(e.target);
        
    }else if(e.target.id == 'add'){
        e.preventDefault();
        saveIncoming(e.target);
    }else if(e.target.id == "delete-btn"){
        e.target.parentNode.remove();
        saveOutGoings();
        calculateRemaining();

    }else if(e.target.id == "cleanBtn"){
        console.log(e.target);
        e.target.closest("form").querySelector("#table-body").textContent = "";
        e.target.closest("form").querySelector(".incoming-result").textContent = "0";
        e.target.closest("form").querySelector(".outgoing-result").textContent = "0";
        e.target.closest("form").querySelector(".remaining-result").textContent = "0";
        document.querySelector(".remaining-result").style.color = 'black';
        document.querySelector(".remaining-result").previousElementSibling.style.color = 'black';

    }


})


const saveExpenses = (btn)=>{
    let date;
    if(!btn.closest(".spend-field").querySelector("#date").value){
        alert("Enter a date!");
        return;
    }else{
        date = btn.closest(".spend-field").querySelector("#date").value;
    }
let amount;
    if(!btn.closest(".spend-field").querySelector("#amount").value){
        alert("Enter a amount!");
        return;
    }else{
        amount = btn.closest(".spend-field").querySelector("#amount").value;
    }

    let category;
    if(!btn.closest(".spend-field").querySelector("#category").value){
        alert("Enter a category!");
        return;
    }else{
        category = btn.closest(".spend-field").querySelector("#category").value;
    }
    
    
console.log(category);

    let tr = document.createElement("tr");
    let tdDate = document.createElement("td");
    let tdCategory = document.createElement("td");
    let tdAmount = document.createElement("td");
    let tdRemove = document.createElement("td");

    tdDate.textContent = date;
    tdCategory.textContent = category;
    tdAmount.textContent = amount; 
    tdAmount.setAttribute("id", "saved-outgoing");
    tdRemove.textContent = '⌫'
    tdRemove.style.color= 'red'
    tdRemove.style.fontSize= '20px'
    tdRemove.setAttribute("id","delete-btn")

    tr.appendChild(tdDate);
    tr.appendChild(tdCategory);
    tr.appendChild(tdAmount);
    tr.appendChild(tdRemove);

    document.querySelector("#table-body").appendChild(tr);


    // btn.closest(".spend-field").querySelector("#date").value = "";
    btn.closest(".spend-field").querySelector("#amount").value = "";
    btn.closest(".spend-field").querySelector("#category").value = "";


    saveOutGoings();
    calculateRemaining();
}

const saveIncoming = (btn) => {
    let incoming;
    if(!btn.closest(".save-incoming").querySelector("#incoming").value){
        alert("Enter incoming!!");
        return;
    }else{

         incoming = btn.closest(".save-incoming").querySelector("#incoming").value;
    }

    document.querySelector(".incoming-result").textContent = incoming;


    btn.closest(".save-incoming").querySelector("#incoming").value = "";

    calculateRemaining();
}

const saveOutGoings = () =>{
    const allOutgoings = document.querySelectorAll("#saved-outgoing");
    const totalOutGoings = [...allOutgoings].reduce((sum, current) => sum + +current.textContent,0);
    document.querySelector(".outgoing-result").textContent = totalOutGoings;
};

const calculateRemaining = ()=>{
    const incoming = document.querySelector(".incoming-result").textContent.replace(".","");
    const outgoing = document.querySelector(".outgoing-result").textContent;
    const result = incoming - outgoing;
    document.querySelector(".remaining-result").textContent = result;
    if(result < 0){
        document.querySelector(".remaining-result").style.color = 'red';
        document.querySelector(".remaining-result").previousElementSibling.style.color = 'red';
    }else{
        document.querySelector(".remaining-result").style.color = 'black';
        document.querySelector(".remaining-result").previousElementSibling.style.color = 'black';

    }
}


window.onload = () =>{
    saveOutGoings();
    calculateRemaining();
}

