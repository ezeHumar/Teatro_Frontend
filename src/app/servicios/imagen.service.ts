import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const url= `${environment.apiUrl}` + 'upload/';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  

  constructor(private http: HttpClient) { }

  getImage(): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }

  post (imagen: File, nombreImagen: string): Observable<any>{
    const fd = new FormData();
    fd.append('file', imagen, nombreImagen);
    return this.http.post(url, fd, {responseType: 'text'});
  }

  delete(nombreImagen: string){
    return this.http.delete(url+nombreImagen, {responseType: 'text'});
  }


}
