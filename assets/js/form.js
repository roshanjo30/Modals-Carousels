const form = document.querySelector(".form");
const book =document.querySelector('#book');

book.addEventListener("click", (event)=>{
        form.hidden = false;
});

form.addEventListener("click", (event) => {

    if (event.target === form) {

        form.hidden = true;

    }

});


