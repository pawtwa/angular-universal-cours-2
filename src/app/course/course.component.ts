import { Component, ElementRef, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from '@angular/material';
import { Meta, Title, TransferState, makeStateKey } from '@angular/platform-browser';

import { Course } from "../model/course";
import { CoursesService } from "../services/courses.service";
import { Lesson } from '../model/lesson';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {


    course: Course;

    dataSource: MatTableDataSource<Lesson>;

    displayedColumns = ["seqNo", "description", "duration"];


    constructor(
        private route: ActivatedRoute,
        private coursesService: CoursesService,
        private title: Title,
        private meta: Meta,
        @Inject(PLATFORM_ID) private platformId,
        private transferState: TransferState
    ) {

    }



    ngOnInit() {

        this.course = this.route.snapshot.data["course"];

        this.dataSource = new MatTableDataSource([]);

        const COURSE_LESSONS_KEY = makeStateKey<Lesson[]>('course_lessons_' + this.course.id);

        if (this.transferState.hasKey(COURSE_LESSONS_KEY)) {
            this.dataSource.data = this.transferState.get<Lesson[]>(COURSE_LESSONS_KEY, null);
            //this.transferState.remove(COURSE_LESSONS_KEY);
            console.log('hasKey course_lessons_' + this.course.id, COURSE_LESSONS_KEY, this.dataSource.data);
        } else {
            this.coursesService.findAllCourseLessons(this.course.id)
            .subscribe(lessons => {
                this.dataSource.data = lessons;
                this.transferState.set(COURSE_LESSONS_KEY, this.dataSource.data);
                console.log('set course_lessons_' + this.course.id, COURSE_LESSONS_KEY, this.dataSource.data);
            });
        }


        

        this.title.setTitle(this.course.description);
        this.meta.addTag({
            name: 'description',
            content: this.course.longDescription
        });

        this.meta.addTag({
            name: 'twitter:card',
            content: '@AngularUniv'
        });
        this.meta.addTag({
            name: 'twitter:site',
            content: this.course.longDescription
        });
        this.meta.addTag({
            name: 'twitter:title',
            content: this.course.description
        });
        this.meta.addTag({
            name: 'twitter:description',
            content: this.course.longDescription
        });
        this.meta.addTag({
            name: 'twitter:text:description',
            content: this.course.longDescription
        });
        this.meta.addTag({
            name: 'twitter:image',
            content: this.course.iconUrl
        });
    }


}
