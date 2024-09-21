import { Component, OnInit } from '@angular/core';
import { PdfService } from '../pdf.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-pdf-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-list.component.html',
  styleUrl: './pdf-list.component.scss'
})
export class PdfListComponent implements OnInit {
  pdfList: any[] = [];
  displayedColumns: string[] = ['fileName'];

  constructor(private pdfService: PdfService) {}

  ngOnInit() {
    this.pdfService.getAllPdfs().subscribe({
      next: (data) => this.pdfList = data,
      error: (error) => console.error('Error al obtener la lista de PDFs', error)
    });
  }
}
