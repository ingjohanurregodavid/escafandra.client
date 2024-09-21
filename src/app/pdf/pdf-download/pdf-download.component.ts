import { Component, OnInit } from '@angular/core';
import { PdfService } from '../pdf.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-pdf-download',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-download.component.html',
  styleUrl: './pdf-download.component.scss'
})
export class PdfDownloadComponent implements OnInit {
  pdfList: any[] = [];

  constructor(private pdfService: PdfService) {}

  ngOnInit() {
    this.pdfService.getAllPdfs().subscribe({
      next: (data) => this.pdfList = data,
      error: (error) => console.error('Error al obtener la lista de PDFs', error)
    });
  }

  downloadPdf(id: number) {
    this.pdfService.downloadPdf(id).subscribe({
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.pdf';
        a.click();
      },
      error: (error) => console.error('Error al descargar PDF', error)
    });
  }
}
