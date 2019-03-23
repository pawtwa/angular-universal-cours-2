import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Meta, Title } from '@angular/platform-browser';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from "rxjs/observable/merge";
import { fromEvent } from 'rxjs/observable/fromEvent';

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
        private meta: Meta
    ) {

    }



    ngOnInit() {

        this.course = this.route.snapshot.data["course"];

        this.dataSource = new MatTableDataSource([]);

        this.coursesService.findAllCourseLessons(this.course.id)
            .subscribe(lessons => this.dataSource.data = lessons);

        this.title.setTitle(this.course.description);
        this.meta.addTag({
            name: 'description',
            content: this.course.longDescription
        });

        this.meta.addTag({
            name: 'twitter:description',
            content: 'summary'
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
