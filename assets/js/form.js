const form = document.querySelector(".form");
const formStep = document.querySelectorAll(".form-step");
const book =document.querySelector('#book');
const nextStep = document.querySelectorAll(".next");
const emailError=document.querySelector("#email-error");
const fieldError=document.querySelector("#field-error");
const done=document.querySelector(".done");


book.addEventListener("click", (event)=>{
        form.hidden = false;
});

form.addEventListener("click", (event) => {

    if (event.target === form) {

        form.hidden = true;
    }

});


nextStep.forEach((button, index) => {

    button.addEventListener("click", () => {

        if (index === 0) {
            validateStep1();
        }

        if (index === 1) {
            validateStep2();
        }

    });

});

async function validateStep1(){
    const name=document.querySelector("#name").value;
    const email=document.querySelector("#email").value;
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    const users = await response.json();

    const emailExists=users.some(user => {
        return( user.name.toLowerCase()===name.toLowerCase() &&  user.email.toLowerCase() === email.toLowerCase()
    );
    })

    if (emailExists){
        formStep[0].hidden=true;
        formStep[1].hidden=false;
    }
    else{
        emailError.textContent = "Email not found";
    }
    

}

async function validateStep2() {
    const city=document.querySelector("#city").value;
    const zip=document.querySelector("#zip").value;
    if(city && zip ){
        formStep[1].hidden=true;
        formStep[2].hidden=false;
        submitData();
    }   
    else{
        fieldError.textContent = "Fields cant be empty";
    } 
}

done.addEventListener("click", (event)=>{
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#city").value = "";
    document.querySelector("#zip").value = "";

    emailError.textContent = "";

    formStep[0].hidden = false;
    formStep[2].hidden = true;


    form.hidden = true;
});

async function submitData() {

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const city = document.querySelector("#city").value;
    const zip = document.querySelector("#zip").value;

    const data = {
        name: name,
        email: email,
        city: city,
        zip: zip
    };

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    console.log(result);
}