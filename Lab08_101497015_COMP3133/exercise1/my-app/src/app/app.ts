import { Component } from '@angular/core';
import { HerosComponent } from './heros/heros.component';

@Component({
  selector: 'app-root',
  imports: [HerosComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
