const slides = document.querySelectorAll(".slide");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

const dots = document.querySelectorAll(".dot");

let currentSlide=0;
updateDots();
showSlide(currentSlide);

function showSlide(index){
    slides.forEach((slide)=>
    {
        slide.hidden=true;
    })
    slides[index].hidden=false;

}

previous.addEventListener("click", ()=>{
    currentSlide--;
    if(currentSlide<0){
        currentSlide=slides.length - 1;
    }
    showSlide(currentSlide);
    
    
});

next.addEventListener("click", ()=>{
    currentSlide++;
    if(currentSlide>slides.length - 1){
        currentSlide=0;
    }
    showSlide(currentSlide);
    
    
});

function updateDots() {
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide=index;
            showSlide(currentSlide);
            dots.forEach((dot) => {
                dot.removeAttribute("aria-current");
            });

            dot.setAttribute("aria-current", "true");
        });
    });
}



