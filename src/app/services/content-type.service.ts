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

  getContentTypeById(id: string): Observable<ContentType> {
    return this.http.get<ContentType>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<ContentType>())
    );
  }

  addContentType(contentType: ContentType): Observable<ContentType> {
    return this.http.post<ContentType>(this.apiUrl, contentType).pipe(
      catchError(this.handleError<ContentType>())
    );
  }

  updateContentType(id: string, contentType: ContentType): Observable<ContentType> {
    return this.http.put<ContentType>(`${this.apiUrl}/${id}`, contentType).pipe(
      catchError(this.handleError<ContentType>())
    );
  }

  deleteContentType(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
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
