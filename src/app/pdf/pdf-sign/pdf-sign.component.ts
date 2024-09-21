import { Component, OnInit } from '@angular/core';
import { PdfService } from '../pdf.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-pdf-sign',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-sign.component.html',
  styleUrl: './pdf-sign.component.scss'
})
export class PdfSignComponent implements OnInit {
  pdfList: any[] = [];

  constructor(private pdfService: PdfService) {}

  ngOnInit() {
    this.pdfService.getAllPdfs().subscribe({
      next: (data) => this.pdfList = data,
      error: (error) => console.error('Error al obtener la lista de PDFs', error)
    });
  }

  signPdf(id: number) {
    this.pdfService.signPdf(id).subscribe({
      next: (response) => console.log('PDF firmado', response),
      error: (error) => console.error('Error al firmar PDF', error)
    });
  }
}
