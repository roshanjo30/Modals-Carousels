const modelsBody = document.querySelector("#models");

const previouspg = document.querySelector("#prev");
const nextpg = document.querySelector("#nex");
const pageno = document.querySelector("#page-no");

const search = document.querySelector("#search");

let currentPage = 1;

async function getBMWModels(searchText = "") {
    const response = await fetch(
        `https://fleetcatalog.disturbingbyte.pt/v1/makes/6e959721-83ee-4dcc-98b0-f12155c5888c/models?pageSize=10&page=${currentPage}&search=${encodeURIComponent(searchText)}`
    );

    const data = await response.json();
    modelsBody.innerHTML = "";
    data.items.forEach(model => {
        const row = document.createElement("p");
        row.textContent = model.name;
        modelsBody.appendChild(row);

    });

    pageno.textContent = currentPage;
    previouspg.disabled = currentPage === 1;
    nextpg.disabled = currentPage * data.pageSize >= data.total;
}


nextpg.addEventListener("click", () => {
    currentPage++;
    getBMWModels(search.value);
});

previouspg.addEventListener("click", () => {
    currentPage--;
    getBMWModels(search.value);
});

getBMWModels();

let timer;
search.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        currentPage = 1;
        getBMWModels(search.value);
    }, 500);

});