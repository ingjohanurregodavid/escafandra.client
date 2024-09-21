import { Component } from '@angular/core';
import { PdfService } from '../pdf.service';  
import { CommonModule } from '@angular/common'; 
import { PdfUploadDto } from '../pdf-upload-dto.model';

@Component({
  selector: 'app-pdf-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-upload.component.html',
  styleUrl: './pdf-upload.component.scss'
})
export class PdfUploadComponent {
  selectedFile: File | null = null; 
  constructor(private pdfService: PdfService) {}

   // Método para seleccionar el archivo
   onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      const uploadDto: PdfUploadDto = {
        file: this.selectedFile
      };

      this.pdfService.uploadPdf(uploadDto).subscribe({
        next: (response) => {
          console.log('Archivo subido', response);
        },
        error: (error) => {
          console.error('Error al subir archivo', error);
        }
      });
    } else {
      console.error('No se ha seleccionado ningún archivo');
    }
  }
}
