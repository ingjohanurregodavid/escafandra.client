import { Component } from '@angular/core';
import { PdfService } from '../pdf.service';
import { PdfUploadDto } from '../pdf-upload-dto.model';
import { saveAs } from 'file-saver';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar estos módulos
import { AppComponent } from '../../app.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-pdf-manager',
  standalone: true,
  imports: [
    AppComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltip,
    MatIconModule
  ],
  templateUrl: './pdf-manager.component.html',
  styleUrls: ['./pdf-manager.component.scss']
})
export class PdfManagerComponent {

  selectedFile: File | null = null;
  pdfs: any[] = [];

  constructor(private pdfService: PdfService) { }

  // Evento cuando se selecciona un archivo en el input de tipo file
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Método para subir el archivo
  onSubmit() {
    if (this.selectedFile) {
      const uploadDto: PdfUploadDto = { file: this.selectedFile };
      this.pdfService.uploadPdf(uploadDto).subscribe({
        next: (response) => {
          this.pdfs.push(response);  // Agregar el PDF subido a la tabla
          this.selectedFile = null;
          window.location.reload();
        },
        error: (error) => {
          console.error('Error al subir archivo', error);
        }
      });
    }
  }

  // Método para descargar el archivo PDF
  downloadPdf(id: number) {
    this.pdfService.downloadPdf(id).subscribe(
      (pdfBlob: Blob) => {
        const fileName = `documento_${id}.pdf`; // O el nombre que desees
        saveAs(pdfBlob, fileName);
      },
      (error) => {
        console.error('Error al descargar el PDF', error);
      }
    );
  }

  // Método para firmar el archivo PDF
  signPdf(id: number) {
    this.pdfService.signPdf(id).subscribe((signedPdf) => {
      const pdfIndex = this.pdfs.findIndex(pdf => pdf.id === id);
      if (pdfIndex !== -1) {
        this.pdfs[pdfIndex] = signedPdf;  // Actualizar el PDF en la tabla
      }
    });
  }

  // Método para simular la adición de un nuevo archivo
  addNewFile() {
    document.getElementById('pdfFile')?.click();  // Dispara el input de tipo file
  }

  // Método para obtener todos los PDFs al cargar la vista
  ngOnInit() {
    this.pdfService.getAllPdfs().subscribe((pdfs) => {
      this.pdfs = pdfs;
    });
  } 
}
