import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-crud-page',
  imports: [MatToolbarModule, RouterLink, MatIcon],
  templateUrl: './crud-page.html',
  styleUrl: './crud-page.scss',
})
export class CrudPage {

}
