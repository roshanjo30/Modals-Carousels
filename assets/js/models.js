const modelsBody = document.querySelector("#models");
const previouspg = document.querySelector("#prev");
const nextpg = document.querySelector("#nex");
const pageno = document.querySelector("#page-no");
const search = document.querySelector("#search");
const sort = document.querySelector("#sort");

let currentPage = 1;
const PAGE_SIZE = 10;
let allModels = []; 
async function fetchAllModels(searchText = "") {
  let page = 1;
  let items = [];
  let total = Infinity;

  while (items.length < total) {
    const response = await fetch(
      `https://fleetcatalog.disturbingbyte.pt/v1/makes/6e959721-83ee-4dcc-98b0-f12155c5888c/models?pageSize=50&page=${page}&search=${encodeURIComponent(searchText)}`
    );
    const data = await response.json();
    items = items.concat(data.items);
    total = data.total;
    page++;
  }

  return items;
}

function applySort(items) {
  if (sort.value === "asc" || sort.value === "default") {
    items.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort.value === "desc") {
    items.sort((a, b) => b.name.localeCompare(a.name));
  }
  return items;
}

function renderPage() {
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = allModels.slice(start, start + PAGE_SIZE);

  modelsBody.innerHTML = "";
  pageItems.forEach(model => {
    const row = document.createElement("p");
    row.textContent = model.name;
    modelsBody.appendChild(row);
  });

  pageno.textContent = currentPage;
  previouspg.disabled = currentPage === 1;
  nextpg.disabled = currentPage * PAGE_SIZE >= allModels.length;
}

async function loadModels(searchText = "") {
  const items = await fetchAllModels(searchText);
  allModels = applySort(items);
  renderPage();
}

nextpg.addEventListener("click", () => {
  currentPage++;
  renderPage();
});

previouspg.addEventListener("click", () => {
  currentPage--;
  renderPage();
});

loadModels();

let timer;
search.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    currentPage = 1;
    loadModels(search.value);
  }, 500);
});

sort.addEventListener("change", () => {
  currentPage = 1;
  allModels = applySort(allModels);
  renderPage();
});