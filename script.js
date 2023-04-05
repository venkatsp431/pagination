// let tableContent = document.getElementsByClassName("table");
let tbody = document.getElementById("tbody");
let pagination = document.querySelector(".pagination");

const rowsperPage = 5;
let totalPages;
let currentPage = 1;
let lastpage, pagelink, pageLi;
let index = 1;
async function fetchURL() {
  const res = await fetch(
    "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
  );
  const res1 = await res.json();

  totalPages = res1.length / rowsperPage;

  for (let i = 1; i <= totalPages; i++) {
    const lio = document.createElement("li");
    lio.classList.add("page-item", "dynamic");
    const ao = document.createElement("a");
    ao.className = "page-link";
    ao.href = "#";
    ao.innerHTML = i;
    ao.setAttribute("data-page", i);
    lio.appendChild(ao);
    pagination.insertBefore(lio, pagination.querySelector(".next"));
  }
  init(res1);
  pagelink = pagination.querySelectorAll("a");
  lastpage = pagelink.length - 2;
  pageLi = pagination.querySelectorAll("li");
  pageLi[1].classList.add("active");

  pageRunner(pagelink, 5, lastpage, pageLi, res1);
}
fetchURL();
function init(res1) {
  index = 1;
  for (let i = 0; i < 5; i++) {
    tbody.innerHTML += `<tr>
  <th scope="row">${res1[i].id}</th>
  <td>${res1[i].name}</td>
  <td>${res1[i].email}</td>
</tr>`;
  }
}
function pageRunner(page, items, lastPage, active, res1) {
  for (let button of page) {
    button.onclick = (e) => {
      const page_num = e.target.getAttribute("data-page");
      const page_mover = e.target.getAttribute("id");
      if (page_num != null) {
        index = page_num;
      } else {
        if (page_mover === "next") {
          index++;
          if (index >= lastPage) index = lastPage;
        } else {
          index--;
          if (index <= 1) index = 1;
        }
      }
      tbody.innerHTML = "";
      pageMaker(index, items, active, res1);
    };
  }
}
function pageMaker(index, items, activePage, res1, lios) {
  activePage.forEach((n) => n.classList.remove("active"));
  activePage[index].classList.add("active");

  if (index > 1) {
    activePage[0].classList.remove("disabled");
    activePage[0].style.cursor = "pointer";
  }
  if (index === 1) activePage[0].classList.add("disabled");
  if (index === lastpage)
    activePage[activePage.length - 1].classList.add("disabled");
  if (index < lastpage)
    activePage[activePage.length - 1].classList.remove("disabled");
  const start = items * index;
  const end = start + items;

  const currentPageDisplay = res1.slice(start - items, end - items);
  for (let i = 0; i < currentPageDisplay.length; i++) {
    let item = currentPageDisplay[i];

    tbody.innerHTML += `<tr>
  <th scope="row">${item.id}</th>
  <td>${item.name}</td>
  <td>${item.email}</td>
</tr>`;
  }
}
