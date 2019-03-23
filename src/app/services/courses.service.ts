

import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Course} from "../model/course";
import {Lesson} from "../model/lesson";
import {map, timeout} from 'rxjs/operators';



@Injectable()
export class CoursesService {

    static readonly API_URL = 'https://angular-universal-course-763fa.firebaseio.com';

    constructor(private http: HttpClient) {

    }

    findCourseById(courseId: string): Observable<Course> {
        const headers = new HttpHeaders({ 
            timeout: "2000"
        });
        return this.http.get<Course>(`${CoursesService.API_URL}/courses/${courseId}.json`, {
            headers: headers
        });
    }

    findAllCourses(): Observable<Course[]> {
        const headers = new HttpHeaders({ 
            timeout: "2000"
        });
        return this.http.get<Course[]>(`${CoursesService.API_URL}/courses.json`, {
            headers: headers
        });
    }

    findAllCourseLessons(courseId:string): Observable<Lesson[]> {
        const headers = new HttpHeaders({ 
            timeout: "2000"
        });
        return this.http.get<Lesson[]>(`${CoursesService.API_URL}/lessons/${courseId}.json`, {
            headers: headers
        });
    }
}