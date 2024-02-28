function addItemToList() {
	let newTask = document.getElementById("taskInput").value;
	let taskList = document.getElementById("taskList");
	let listItem = document.createElement("li");
	let itemText = document.createTextNode(newTask + "	");

	if (newTask == "") {
		return alert("Please don't leave input empty!");
	} else {
		listItem.appendChild(itemText);
		listItem.addEventListener("click", function (){
			return listItem.style.textDecoration == "none" ? listItem.style.textDecoration = "line-through" : listItem.style.textDecoration = "none";
		});
		listItem.innerHTML += "<i class='fa-solid fa-trash' onclick='return this.parentNode.remove();'></i>";
		taskList.appendChild(listItem);
		
		document.getElementById("taskInput").value = "";
		document.getElementById("taskInput").focus();
	}
}

function saveList() {
	let newSavedList = document.getElementById("taskList");
	let savedLists = document.getElementById("savedLists");
	let allListItems = newSavedList.getElementsByTagName("li");
	let titleElement = document.createElement("li");
	let newTaskList = [];
	
	if (localStorage.getItem(document.getElementById("listTitle").value)) {
		return alert("A list with this name already exists. Please provide a different name.");
	} else {
		titleElement.appendChild(document.createTextNode(document.getElementById("listTitle").value));
		
		if (!localStorage.getItem("titleList")) {
			let listOfNewTitles = [];
			listOfNewTitles.push(document.getElementById("listTitle").value);
			localStorage.setItem("titleList", JSON.stringify(listOfNewTitles));
		} else {
			let tList = JSON.parse(localStorage.getItem("titleList"));
			tList.push(document.getElementById("listTitle").value);
			localStorage.setItem("titleList", JSON.stringify(tList));
		}
	}
	
	let selectElement = document.createElement("select");
	let optionElement = document.createElement("option");
	optionElement.appendChild(document.createTextNode(titleElement.innerText));
	selectElement.appendChild(optionElement);
	newTaskList.push(titleElement.innerText);
	
	for (let i = 0; i < allListItems.length; i++) {
		allListItems[i].lastChild.remove();
		newTaskList.push(allListItems[i].innerText);
		let optionElement = document.createElement("option");
		optionElement.appendChild(document.createTextNode(allListItems[i].innerText));
		selectElement.appendChild(optionElement);
	}
	savedLists.appendChild(selectElement);
	savedLists.innerHTML += "<i class='fa-solid fa-trash' onclick='localStorage.removeItem(this.previousElementSibling.firstChild.innerHTML); this.nextElementSibling.remove(); this.previousElementSibling.remove(); return this.remove();'></i><hr>";
	
	localStorage.setItem(document.getElementById("listTitle").value, JSON.stringify(newTaskList));
	newSavedList.innerHTML = "";
}

function printExistingLists() {
	let storageList = JSON.parse(localStorage.getItem("titleList"));
	let savedLists = document.getElementById("savedLists");
	
	if (!storageList) {
		return;
	} else {
		for (let i = 0; i < storageList.length; i++) {
			let selectElement = document.createElement("select");
			let taskList = JSON.parse(localStorage.getItem(storageList[i]));
			
			for (let j = 0; j < taskList.length; j++) {
				let optionElement = document.createElement("option");
				optionElement.appendChild(document.createTextNode(taskList[j]));
				selectElement.appendChild(optionElement);
			}
			
			savedLists.appendChild(selectElement);
			savedLists.innerHTML += "<i class='fa-solid fa-trash' onclick='localStorage.removeItem(this.previousElementSibling.firstChild.innerHTML); removeTitleFromList(this.previousElementSibling.firstChild.innerHTML); this.nextElementSibling.remove(); this.previousElementSibling.remove(); return this.remove();'></i><hr>";
		}
	}
}

function removeTitleFromList(titleLocation) {
	let titleList = JSON.parse(localStorage.getItem("titleList"));
	let removedTitle = titleList.indexOf(titleLocation);
	
	titleList.splice(removedTitle, 1);
	return localStorage.setItem("titleList", JSON.stringify(titleList));
}