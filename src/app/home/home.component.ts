import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {map, tap} from 'rxjs/operators';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';

import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import { of } from 'rxjs';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

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
        private meta: Meta,
        @Inject(PLATFORM_ID) private platformId,
        private transferState: TransferState
    ) {

    }

    ngOnInit() {
        const COURSES_KEY = makeStateKey<Course[]>('courses');

        if (this.transferState.hasKey(COURSES_KEY)) {
            const courses = this.transferState.get<Course[]>(COURSES_KEY, null);
            //this.transferState.remove(COURSES_KEY);
            this.courses$ = of(courses);
            console.log('hasKey courses', COURSES_KEY, courses);
        } else {
            if (isPlatformBrowser(this.platformId)) {
                this.courses$ = this.coursesService.findAllCourses()
                    .pipe(
                        map(Object.values),
                        tap(courses => {
                            this.transferState.set(COURSES_KEY, courses);
                            console.log('set courses', COURSES_KEY, courses);
                        })
                    );
            }
        }
        
        this.title.setTitle('Angular Universal Course');
        this.meta.addTag({
            name: 'description',
            content: 'Best Sell Angular Universal Course'
        });

        this.meta.addTag({
            name: 'twitter:card',
            content: ''
        });
        this.meta.addTag({
            name: 'twitter:site',
            content: ''
        });
        this.meta.addTag({
            name: 'twitter:title',
            content: ''
        });
        this.meta.addTag({
            name: 'twitter:description',
            content: ''
        });
        this.meta.addTag({
            name: 'twitter:text:description',
            content: ''
        });
        this.meta.addTag({
            name: 'twitter:image',
            content: ''
        });
        // this.meta.removeTag('name = "twitter:card"');
        // this.meta.removeTag('name = "twitter:site"');
        // this.meta.removeTag('name = "twitter:title"');
        // this.meta.removeTag('name = "twitter:description"');
        // this.meta.removeTag('name = "twitter:text:description"');
        // this.meta.removeTag('name = "twitter:image"');
    }

}
