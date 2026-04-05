import { Component } from '@angular/core';

@Component({
  selector: 'students',
  standalone: true,
  template: `<h1>{{ getTitle() }} - - - - - {{ getCurrentDate() }}</h1>`
})
export class StudentsComponent {
  title = "My List of Students";

  getTitle() {
    return this.title;
  }

  getCurrentDate() {
    return new Date().toLocaleDateString();
  }

}
