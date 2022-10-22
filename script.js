/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const linklist = document.getElementsByClassName("link-list")[0];
const studentlist = document.getElementsByClassName("student-list")[0];
let itemData = data;
function showPage(list, page) {
    
	const startIndex = page * 9 - 9;
	const endIndex = page * 9;
	studentlist.innerHTML = "";
	let studentInfo = "";
	//If no results found during search
	if (list.length === 0) {
		studentInfo += `<p class="no-results">No Results Found</p>`;
	} else {
		for (let i = 0; i < list.length; i++) {
			if (i >= startIndex && i < endIndex) {
				studentInfo += `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>    
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
          </div>
         </li>`;
			}
		}
	}
	studentlist.insertAdjacentHTML("beforeend", studentInfo);
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function createbutton(list) {
	let pagenumber = Math.ceil(list.length / 9);
	linklist.innerHTML = "";
	// Math.ceil always rounds a number up to the next largest integer.
	for (let i = 1; i <= pagenumber; i++) {
		linklist.insertAdjacentHTML(
			"beforeend",
			`<li>
      <button type="button">${i}</button>
   </li>`
		);
	}

	const firstbutton = document.querySelector("button");
	firstbutton.setAttribute("class", "active");
	linklist.addEventListener("click", (e) => {
		if (e.target.tagName === "BUTTON") {
			const removebutton = document.querySelector(".active");
			removebutton.className = "";
			const addbutton = e.target;
			addbutton.className = "active";
			const display = addbutton.textContent;
			showPage(list, display);
		}
	});
}
//setAttribute() method adds the specified attribute to an element, and gives it the specified value.
function insertSearchBar() {
	const header = document.querySelector(".header");
	searchBarHTML = `
   <label for="search" class="student-search">
            <span>Search by name</span>
            <input id="search" placeholder="Search by name...">
            <button type="button" class="submit"><img src="icn-search.svg" alt="Search icon"></button>
          </label>`;
	header.insertAdjacentHTML("beforeend", searchBarHTML);
}

// Call functions
showPage(data, 1);
createbutton(data);
insertSearchBar();

// Variables for search bar
const searchField = document.getElementById("search");
const searchBtn = document.querySelector("button.submit");

// Click event for search bar
searchField.addEventListener("keyup", () => {
	let searchText = searchField.value.toUpperCase();
	searchBtn.onclick = () => {
		searchField.value = "";
	};

	const filteredList = data.filter((student) => {
		return (
			student.name.first.toUpperCase().includes(searchText) ||
			student.name.last.toUpperCase().includes(searchText)
		);
	});
	itemData = filteredList;
	currentPage = 1;
	showPage(itemData, currentPage);
	createbutton(itemData);
})