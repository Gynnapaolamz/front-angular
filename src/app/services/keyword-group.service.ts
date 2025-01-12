import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { KeywordGroup } from '../interfaces/keywords-group.model';

@Injectable({
  providedIn: 'root'
})
export class KeywordsGroupService {

  private apiUrl = 'http://localhost:3000/keyword_group';

  constructor(private http: HttpClient) {}

  getKeywordGroups(): Observable<KeywordGroup[]> {
    return this.http.get<KeywordGroup[]>(this.apiUrl).pipe(
      catchError(this.handleError<KeywordGroup[]>([]))
    );
  }

  getKeywordGroupById(id: string): Observable<KeywordGroup> {
    return this.http.get<KeywordGroup>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<KeywordGroup>())
    );
  }

  addKeywordGroup(keywordGroup: KeywordGroup): Observable<KeywordGroup> {
    return this.http.post<KeywordGroup>(this.apiUrl, keywordGroup).pipe(
      catchError(this.handleError<KeywordGroup>())
    );
  }

  updateKeywordGroup(id: string, keywordGroup: KeywordGroup): Observable<KeywordGroup> {
    return this.http.put<KeywordGroup>(`${this.apiUrl}/${id}`, keywordGroup).pipe(
      catchError(this.handleError<KeywordGroup>())
    );
  }

  deleteKeywordGroup(id: string): Observable<void> {
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
