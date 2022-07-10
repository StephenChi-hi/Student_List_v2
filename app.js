class Student {
    constructor(studentName, department, level) {
      this.studentName = studentName;
      this.department = department;
      this.level = level;
    }
  }
  
  class UI {
    addStudentToList(student) {
      const list = document.getElementById('student-list');
      // Create tr element
      const row = document.createElement('tr');
      // Insert cols
      row.innerHTML = `
        <td>${student.studentName}</td>
        <td>${student.department}</td>
        <td>${student.level}</td>
        <td><button class="edit" onClick="onEdit(this)">edit</button></td>
        <td><a href="#" class="delete">X<a></td>
      `;
    
      list.appendChild(row);
    }

  
    showAlert(message, className) {
      // Create div
      const div = document.createElement('div');
      // Add classes
      div.className = `alert ${className}`;
      // Add text
      div.appendChild(document.createTextNode(message));
      // Get parent
      const container = document.querySelector('.container');
      // Get form
      const form = document.querySelector('#student-form');
      // Insert alert
      container.insertBefore(div, form);
  
      // Timeout after 3 sec
      setTimeout(function(){
        document.querySelector('.alert').remove();
      }, 3000);
    }
  
    deleteStudent(target) {
      if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
      }
    }
  
    clearFields() {
      document.getElementById('studentName').value = '';
      document.getElementById('depertment').value = '';
      document.getElementById('level').value = '';
    }
  }
  
  // Local Storage Class
  class Store {
    static getStudents() {
      let students;
      if(localStorage.getItem('students') === null) {
        students = [];
      } else {
        students = JSON.parse(localStorage.getItem('students'));
      }
  
      return students;
    }
  
    static displayStudents() {
      const students = Store.getStudents();
  
      students.forEach(function(student){
        const ui  = new UI;
  
        // Add student to UI
        ui.addStudentToList(student);
      });
    }
  
    static addStudent(student) {
      const students = Store.getStudents();
  
      students.push(student);
  
      localStorage.setItem('students', JSON.stringify(students));
    }

    static removeStudent(level) {
      const students = Store.getStudents();
  
      students.forEach(function(student, index){
       if(student.level === level) {
        students.splice(index, 1);
       }
      });
  
      localStorage.setItem('students', JSON.stringify(students));
    }
  }

  
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', Store.displayStudents);
  
  // Event Listener for add student
  document.getElementById('student-form').addEventListener('submit', function(e){
    // Get form values
    const studentName = document.getElementById('studentName').value,
          department = document.getElementById('department').value,
          level = document.getElementById('level').value
  
    // Instantiate student
    const student = new Student(studentName, department, level);
  
    // Instantiate UI
    const ui = new UI();
  
    console.log(ui);
  
    // Validate
    if(studentName === '' || department === '' || level === '') {
      // Error alert
      ui.showAlert('Please fill in all fields', 'error');
    } else {
      // Add student to list
      ui.addStudentToList(student);
  
      // Add to LS
      Store.addStudent(student);
  
      // Show success
      ui.showAlert('Student Added!', 'success');
    
      // Clear fields
      ui.clearFields();
    }
  
    e.preventDefault();
  });

  
  // Event Listener for delete
  document.getElementById('student-list').addEventListener('click', function(e){
  
    // Instantiate UI
    const ui = new UI();
  
    // Delete student
    ui.deleteStudent(e.target);
  
    // Remove from LS
    Store.removeStudent(e.target.parentElement.previousElementSibling.textContent);
  
    // Show message
    ui.showAlert('student Removed!', 'success');
  
    e.preventDefault();
  });
  
  // Edit function
  function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("studentName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("department").value = selectedRow.cells[1].innerHTML;
    document.getElementById("level").value = selectedRow.cells[2].innerHTML;
}
  