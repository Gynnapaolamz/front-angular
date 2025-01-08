import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ContentType } from '../interfaces/content-type.model';


@Injectable({
  providedIn: 'root'
})
export class ContentTypeService {

  private apiUrl = 'http://localhost:3000/content_type';

  constructor(private http: HttpClient) {}

  getContentTypes(): Observable<ContentType[]> {
    return this.http.get<ContentType[]>(this.apiUrl).pipe(
      catchError(this.handleError<ContentType[]>([]))
    );
  }

  getContentTypeById(id: number): Observable<ContentType> {
    return this.http.get<ContentType>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<ContentType>())
    );
  }

  addContentType(contentType: ContentType): Observable<ContentType> {
    return this.http.post<ContentType>(this.apiUrl, contentType).pipe(
      catchError(this.handleError<ContentType>())
    );
  }

  updateContentType(content_type_id: number, contentType: ContentType): Observable<ContentType> {
    return this.http.put<ContentType>(`${this.apiUrl}/${content_type_id}`, contentType).pipe(
      catchError(this.handleError<ContentType>())
    );
  }

  deleteContentType(content_type_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${content_type_id}`).pipe(
      catchError(this.handleError<void>())
    );
  }

  private handleError<T>(result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error('An error occurred:', error);
      return of(result as T);
    };
  }
}
