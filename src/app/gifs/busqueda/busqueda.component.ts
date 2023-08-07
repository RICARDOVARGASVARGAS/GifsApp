import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
})
export class BusquedaComponent {
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}
  search() {
    const value = this.txtSearch.nativeElement.value;
    if (!value.trim().length) {
      return;
    }
    this.gifsService.searchGifs(value);
    this.txtSearch.nativeElement.value = '';
  }
}
