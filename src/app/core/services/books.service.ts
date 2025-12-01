import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Book {
  id: number;
  title: string;
  subtitle?: string;
  authors?: string;
  publishYear?: number;
  description?: string;
  subjects?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private base = '/api/books';


  private fallback: Book[] = [
    { id: 1, title: 'Boaty McBoatface', subtitle: 'by Byron Barton', authors: 'Byron Barton', publishYear: 2016, description: 'boaty good job', subjects: ['British', 'Polar bear'] },
    { id: 2, title: 'Clean Code', subtitle: 'Robert C. Martin', authors: 'Robert C. Martin', publishYear: 2008, description: 'classic', subjects: ['Programming'] }
  ];

  constructor(private http: HttpClient) {}

  /**
   * Поиск книг. Параметры необязательны.
   */
  search(params: { title?: string; author?: string; subject?: string }): Observable<Book[]> {
    let httpParams = new HttpParams();
    if (params.title) httpParams = httpParams.set('title', params.title);
    if (params.author) httpParams = httpParams.set('author', params.author);
    if (params.subject) httpParams = httpParams.set('subject', params.subject);

    return this.http.get<Book[]>(this.base, { params: httpParams }).pipe(
      catchError(err => {
        console.warn('BooksService.search failed, using fallback', err);
        return of(this.fallback);
      })
    );
  }

  /**
   * Получить книгу по id
   */
  getById(id: number | string): Observable<Book> {
    return this.http.get<Book>(`${this.base}/${id}`).pipe(
      catchError(err => {
        console.warn('BooksService.getById failed, using fallback', err);
        const found = this.fallback.find(b => String(b.id) === String(id));
        return of(found || this.fallback[0]);
      })
    );
  }
}
