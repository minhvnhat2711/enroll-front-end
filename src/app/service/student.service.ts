import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Student } from '../model/student';
import { catchError, map } from "rxjs/operators"; 
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private _http: HttpClient) { }

  getStudentById(sid: number): Observable<Student> {
    let url = "http://localhost:8080/students/" + sid;
    return this._http.get<Student>(url);
  }

  getStudents(): Observable<Student[]> {
    let url: string = "http://localhost:8080/students";
      return this._http.get<Student[]>(url)
      .pipe(map((result:any)=>result._embedded.students));
  }

  getEnroll(sid: number): Observable<Course[]> {
    let url: string = "http://localhost:8080/students/" + sid + "/enroll";
      return this._http.get<Course[]>(url)
      .pipe(map((result:any)=>{
        return result._embedded.courses;
      }));
  }

  addStudent(student: Student) {
    let url = "http://localhost:8080/students/"
    return this._http.post<any>(url, student)
    .pipe(catchError( (err) => {
      console.log(err);
      return this.errorHandler(err);
    }
    ));
  }
  
  deleteStudent(sid: number) {
    let url = "http://localhost:8080/students/" + sid;
    return this._http.delete<any>(url)
    .pipe(catchError( (err) => {
      console.log(err);
      return this.errorHandler(err);
    }
    ));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
