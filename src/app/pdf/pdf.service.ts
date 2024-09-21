import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PdfUploadDto } from './pdf-upload-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private baseUrl = 'http://localhost:5062/api/Pdf'; // URL de la API
  constructor(private http: HttpClient) { }
  
    uploadPdf(uploadDto: PdfUploadDto): Observable<any> {
      const formData = new FormData();
      formData.append('file', uploadDto.file);
      return this.http.post(`${this.baseUrl}/upload`, formData);
    }

    downloadPdf(id: number): Observable<Blob> {
      return this.http.get(`${this.baseUrl}/download/${id}`, { responseType: 'blob' });
    }

  signPdf(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/sign/${id}`, {});
  }

  getAllPdfs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAll`);
  }
}
