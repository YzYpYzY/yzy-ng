import { AnswerType } from './../models/AnswerType';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Answer } from '../models/Answer';

@Component({
    selector: 'yzy-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
    @Input() question: string;
    @Input() answers: Answer[];
    // tslint:disable-next-line: no-output-native
    @Output() select = new EventEmitter<Answer>();

    constructor() {}

    ngOnInit(): void {}

    selectAnswer(answer: Answer): void {
        this.select.emit(answer);
    }

    typeToClass(type: AnswerType): string {
        return 'answer answer-' + AnswerType[type].toLowerCase();
    }
}
