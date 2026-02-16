import { Component, signal } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatButtonModule,MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone:true
})
export class App {
  protected readonly title = signal('angular-material-theme');
}
