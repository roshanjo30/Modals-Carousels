const posts=document.querySelector("#posts");
const loading = document.querySelector("#loading");


let start=0;
const limit=10;
let isLoading=false;


async function loadPosts(){
    isLoading = true;
    loading.hidden=false;
    const response= await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`);
    const data = await response.json();
     
    data.forEach((post) => {
        const card=document.createElement("article");
        const image=document.createElement("img");
        card.classList.add("post");

        image.src = `https://picsum.photos/400/250?random=${post.id}`;
        image.alt = post.title;

        card.appendChild(image);
        posts.appendChild(card);
        
        });
    
    start += limit;
    isLoading = false;
    loading.hidden = true;
    

  
}

window.addEventListener("scroll", () => {

    if (window.innerHeight + window.scrollY >=document.body.offsetHeight - 200) 
    {
        if (!isLoading) {
            loadPosts();
        }

    }
    
});

loadPosts();