import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {map, tap} from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';

import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    courses$: Observable<Course[]>;

    constructor(
        private coursesService: CoursesService,
        private title: Title,
        private meta: Meta
    ) {

    }

    ngOnInit() {
        this.courses$ = this.coursesService.findAllCourses()
            .pipe(
                map(Object.values)
            );
        
        this.title.setTitle('Angular Universal Course');
        this.meta.addTag({
            name: 'description',
            content: 'Best Sell Angular Universal Course'
        });
    }

}
