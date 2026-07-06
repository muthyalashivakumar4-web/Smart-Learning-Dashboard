/* ==========================================
   SMART LEARNING DASHBOARD
   APP.JS - PART 1
========================================== */

/* ==========================
   ARRAYS
========================== */

let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

let notes = JSON.parse(localStorage.getItem("notes")) || [];


/* ==========================
   HTML ELEMENTS
========================== */

// Assignment

const assignmentTitle =
document.getElementById("assignmentTitle");

const assignmentSubject =
document.getElementById("assignmentSubject");

const assignmentDate =
document.getElementById("assignmentDate");

const addAssignmentBtn =
document.getElementById("addAssignment");

const assignmentTable =
document.getElementById("assignmentTable");


// Attendance

const subjectName =
document.getElementById("subjectName");

const presentClasses =
document.getElementById("presentClasses");

const totalClasses =
document.getElementById("totalClasses");

const addAttendanceBtn =
document.getElementById("addAttendance");

const attendanceTable =
document.getElementById("attendanceTable");


// Notes

const noteTitle =
document.getElementById("noteTitle");

const noteContent =
document.getElementById("noteContent");

const addNoteBtn =
document.getElementById("addNote");

const notesContainer =
document.getElementById("notesContainer");


// Dashboard Cards

const totalAssignments =
document.getElementById("totalAssignments");

const completedAssignments =
document.getElementById("completedAssignments");

const attendanceAverage =
document.getElementById("attendanceAverage");

const totalNotes =
document.getElementById("totalNotes");


// Search

const searchInput =
document.getElementById("searchInput");


// Theme

const themeToggle =
document.getElementById("themeToggle");


/* ==========================
   SAVE LOCAL STORAGE
========================== */

function saveData(){

    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );

    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}


/* ==========================
   UPDATE DASHBOARD
========================== */

function updateDashboard(){

    totalAssignments.textContent = assignments.length;

    completedAssignments.textContent =
        assignments.filter(item =>
            item.status==="Completed").length;

    totalNotes.textContent =
        notes.length;

    if(attendance.length===0){

        attendanceAverage.textContent="0%";

        return;

    }

    let average=0;

    attendance.forEach(item=>{

        average += item.percentage;

    });

    attendanceAverage.textContent =
        Math.round(average/attendance.length)+"%";

}
/* ==========================
   PAGE LOAD
========================== */

window.onload = function(){

    displayAssignments();

    displayAttendance();

    displayNotes();

    updateDashboard();

};

/* ==========================================
   ASSIGNMENT MODULE
========================================== */

// Add Assignment
addAssignmentBtn.addEventListener("click", addAssignment);

function addAssignment() {

    let title = assignmentTitle.value.trim();
    let subject = assignmentSubject.value.trim();
    let dueDate = assignmentDate.value;

    if (title === "" || subject === "" || dueDate === "") {
        alert("Please fill all assignment fields.");
        return;
    }

    let assignment = {
        id: Date.now(),
        title: title,
        subject: subject,
        dueDate: dueDate,
        status: "Pending"
    };

    assignments.push(assignment);

    saveData();
    displayAssignments();
    updateDashboard();

    assignmentTitle.value = "";
    assignmentSubject.value = "";
    assignmentDate.value = "";
}

/* ==========================================
   DISPLAY ASSIGNMENTS
========================================== */

function displayAssignments() {

    assignmentTable.innerHTML = "";

    assignments.forEach((assignment) => {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${assignment.title}</td>
            <td>${assignment.subject}</td>
            <td>${assignment.dueDate}</td>

            <td class="${assignment.status === "Completed" ? "completed" : "pending"}">
                ${assignment.status}
            </td>

            <td>

                <button
                    class="action-btn complete-btn"
                    onclick="completeAssignment(${assignment.id})">

                    Complete

                </button>

                <button
                    class="action-btn edit-btn"
                    onclick="editAssignment(${assignment.id})">

                    Edit

                </button>

                <button
                    class="action-btn delete-btn"
                    onclick="deleteAssignment(${assignment.id})">

                    Delete

                </button>

            </td>
        `;

        assignmentTable.appendChild(row);

    });

}

/* ==========================================
   DELETE ASSIGNMENT
========================================== */

function deleteAssignment(id) {

    assignments = assignments.filter(item => item.id !== id);

    saveData();
    displayAssignments();
    updateDashboard();

}

/* ==========================================
   COMPLETE ASSIGNMENT
========================================== */

function completeAssignment(id) {

    assignments.forEach(item => {

        if (item.id === id) {

            item.status = "Completed";

        }

    });

    saveData();
    displayAssignments();
    updateDashboard();

}

/* ==========================================
   EDIT ASSIGNMENT
========================================== */

function editAssignment(id) {

    let assignment = assignments.find(item => item.id === id);

    if (!assignment) return;

    assignmentTitle.value = assignment.title;
    assignmentSubject.value = assignment.subject;
    assignmentDate.value = assignment.dueDate;

    assignments = assignments.filter(item => item.id !== id);

    saveData();
    displayAssignments();
    updateDashboard();

}
/* ==========================================
   ATTENDANCE MODULE
========================================== */

// Add Attendance
addAttendanceBtn.addEventListener("click", addAttendance);

function addAttendance(){

    let subject = subjectName.value.trim();

    let present = Number(presentClasses.value);

    let total = Number(totalClasses.value);

    if(subject==="" || present==="" || total===""){

        alert("Please fill all attendance fields.");

        return;

    }

    if(present>total){

        alert("Present classes cannot exceed total classes.");

        return;

    }

    let percentage = Math.round((present/total)*100);

    let record={

        id:Date.now(),

        subject,

        present,

        total,

        percentage

    };

    attendance.push(record);

    saveData();

    displayAttendance();

    updateDashboard();

    subjectName.value="";
    presentClasses.value="";
    totalClasses.value="";

}

/* ==========================================
   DISPLAY ATTENDANCE
========================================== */

function displayAttendance(){

    attendanceTable.innerHTML="";

    attendance.forEach(record=>{

        let row=document.createElement("tr");

        row.innerHTML=`

        <td>${record.subject}</td>

        <td>${record.present}</td>

        <td>${record.total}</td>

        <td>${record.percentage}%</td>

        <td>

            <button
            class="action-btn edit-btn"
            onclick="editAttendance(${record.id})">

            Edit

            </button>

            <button
            class="action-btn delete-btn"
            onclick="deleteAttendance(${record.id})">

            Delete

            </button>

        </td>

        `;

        attendanceTable.appendChild(row);

    });

}

/* ==========================================
   DELETE ATTENDANCE
========================================== */

function deleteAttendance(id){

    attendance=attendance.filter(item=>item.id!==id);

    saveData();

    displayAttendance();

    updateDashboard();

}

/* ==========================================
   EDIT ATTENDANCE
========================================== */

function editAttendance(id){

    let record=attendance.find(item=>item.id===id);

    if(!record) return;

    subjectName.value=record.subject;

    presentClasses.value=record.present;

    totalClasses.value=record.total;

    attendance=attendance.filter(item=>item.id!==id);

    saveData();

    displayAttendance();

    updateDashboard();

}
/* ==========================================
   NOTES MODULE
========================================== */

// Add Note
addNoteBtn.addEventListener("click", addNote);

function addNote() {

    let title = noteTitle.value.trim();
    let content = noteContent.value.trim();

    if (title === "" || content === "") {

        alert("Please enter note title and content.");

        return;

    }

    let note = {

        id: Date.now(),

        title,

        content,

        date: new Date().toLocaleDateString()

    };

    notes.push(note);

    saveData();

    displayNotes();

    updateDashboard();

    noteTitle.value = "";

    noteContent.value = "";

}

/* ==========================================
   DISPLAY NOTES
========================================== */

function displayNotes() {

    notesContainer.innerHTML = "";

    notes.forEach(note => {

        let card = document.createElement("div");

        card.className = "note-card";

        card.innerHTML = `

            <h3>${note.title}</h3>

            <p>${note.content}</p>

            <small>${note.date}</small>

            <div class="note-actions">

                <button
                class="action-btn edit-btn"
                onclick="editNote(${note.id})">

                Edit

                </button>

                <button
                class="action-btn delete-btn"
                onclick="deleteNote(${note.id})">

                Delete

                </button>

            </div>

        `;

        notesContainer.appendChild(card);

    });

}

/* ==========================================
   DELETE NOTE
========================================== */

function deleteNote(id) {

    notes = notes.filter(note => note.id !== id);

    saveData();

    displayNotes();

    updateDashboard();

}

/* ==========================================
   EDIT NOTE
========================================== */

function editNote(id) {

    let note = notes.find(item => item.id === id);

    if (!note) return;

    noteTitle.value = note.title;

    noteContent.value = note.content;

    notes = notes.filter(item => item.id !== id);

    saveData();

    displayNotes();

    updateDashboard();

}
/* ==========================================
   SEARCH MODULE
========================================== */

searchInput.addEventListener("keyup", searchData);

function searchData() {

    let search = searchInput.value.toLowerCase();

    // Search Assignments
    let assignmentRows = assignmentTable.getElementsByTagName("tr");

    for (let row of assignmentRows) {

        let text = row.textContent.toLowerCase();

        row.style.display = text.includes(search) ? "" : "none";

    }

    // Search Notes
    let noteCards = notesContainer.getElementsByClassName("note-card");

    for (let card of noteCards) {

        let text = card.textContent.toLowerCase();

        card.style.display = text.includes(search) ? "block" : "none";

    }

}

/* ==========================================
   DARK MODE
========================================== */

themeToggle.addEventListener("click", toggleTheme);

function toggleTheme() {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

    }else{

        localStorage.setItem("theme","light");

    }

}

/* ==========================================
   LOAD SAVED THEME
========================================== */

function loadTheme(){

    let theme = localStorage.getItem("theme");

    if(theme==="dark"){

        document.body.classList.add("dark");

    }

}

loadTheme();