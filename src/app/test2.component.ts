import { Component, Input } from '@angular/core';

interface Options {
  text: string;
  isCorrect: boolean;
  marks: number;
  isChecked: boolean;
}
interface Questions {
  statement: string;
  options: Options[];
}

@Component({
  selector: 'test2',
  styles: [
    ` 
  .wrong
  {
     font-size:8pt;
     color: red;
  }
  .correct
  {
     font-size:8pt;
     color: green;
  }
  .nomarks
  {
     font-size:8pt;
     color: purple;
  }
  `,
  ],
  template: `
  <div *ngFor="let question of questions">
      <div class="card mt-2 mb-2">
        <div class="card-header">{{question.statement}}</div>
       
        <div class="card-body" *ngFor="let option of question.options">
          <label>
              <input type="checkbox" [(ngModel)]="option.isChecked"/>   
              {{option.text}}
          </label>
        </div>       
      </div>
  </div>

  <div class="col-12" *ngIf="!isTestOver">
    <button class="btn btn-primary" (click)= "finish()"> Finish</button>
  </div>

  <div class="card" *ngIf="isTestOver">
    <div class="card-header"> Test Result </div>
    <div class="card-body">Marks Obtained {{marksObtained}} Out of {{totalMarks}}</div>
  </div>
  `,
})
export class Test2Component {
  isTestOver: boolean = false;
  marksObtained: number = 0;
  totalMarks: number = 0;
  finish() {
    for (let question of this.questions) {
      for (let option of question.options) {
        if (option.isCorrect && option.isChecked) {
          this.marksObtained += option.marks;
        } else if (!option.isCorrect && option.isChecked) {
          this.marksObtained -= option.marks;
        }

        if (option.isCorrect) {
          this.totalMarks += option.marks;
        }
      }
    }
    this.isTestOver = true;
  }
  questions: Questions[] = [
    {
      statement: 'AAA',
      options: [
        { text: 'aa', isCorrect: true, marks: 5, isChecked: false },
        { text: 'bb', isCorrect: false, marks: 4, isChecked: false },
      ],
    },

    {
      statement: 'BBB',
      options: [
        { text: 'cc', isCorrect: true, marks: 6, isChecked: false },
        { text: 'dd', isCorrect: false, marks: 4, isChecked: false },
        { text: 'ee', isCorrect: false, marks: 2, isChecked: false },
        { text: 'ff', isCorrect: false, marks: 8, isChecked: false },
      ],
    },
  ];
}
