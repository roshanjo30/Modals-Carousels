const modal = document.querySelector("#modal");
const close = document.querySelector("#close-modal");

close.addEventListener("click",()=>{
    modal.hidden=true;
});

modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.hidden = true;

    }

});

