import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  dayOfWeek: string[];
  monthsNames: string[];
  currentDate: Date;
  currentMonth: string;
  currentYear: number;
  selectedDate: Date;
  beforDays: number[];
  day: number[];
  afterDay: number[];

  constructor() { }

  ngOnInit() {
    this.dayOfWeek = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    this.monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.currentDate = new Date();
    this.selectedDate = new Date();
    this.currentMonth = this.monthsNames[this.currentDate.getMonth()];
    this.currentYear = this.currentDate.getFullYear();
    this.beforDays = this.beforeDays();
    this.day = this.days();
    this.afterDay = this.afterDays();
  }

  setCurrentDate(d) {
    this.currentDate = d;
    this.currentMonth = this.monthsNames[this.currentDate.getMonth()];
    this.currentYear = this.currentDate.getFullYear();
    this.beforDays = this.beforeDays();
    this.day = this.days();
    this.afterDay = this.afterDays();
  }

  days () {
    const d = new Date(this.currentDate);
    const days = [];
    const dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
    const daysInMonth = this.numOfDAysInMonth(dObj.getMonth(), dObj.getFullYear());
    for (let i = 0; i < daysInMonth; i++) {
      days.push({
        date: dObj.getDate(),
        timestamp: dObj.getTime(),
        isSelected: false
      });
      dObj.setDate(dObj.getDate() + 1);
    }
    return days;
  }

  beforeDays () {

    const d = this.currentDate;
    const dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
    const bLength = dObj.getDay();
    const beforeDays = [];
    dObj.setMonth(dObj.getMonth() - 1);
    let daysInMonth = this.numOfDAysInMonth(dObj.getMonth(), dObj.getFullYear());
    for (let i = 0; i < bLength; i++) {
      beforeDays.unshift({
        date: daysInMonth
      });
      daysInMonth--;
    }
    return beforeDays;
  }


  afterDays () {
    const d = this.currentDate;
    const afterDays = [];
    const daysInMonth = this.numOfDAysInMonth(d.getMonth(), d.getFullYear());
    const dObj = new Date(d.getFullYear(), d.getMonth(), daysInMonth, d.getHours(), d.getMinutes());
    const theLength = (6 - dObj.getDay());
    dObj.setDate(dObj.getDate() + 1);
    for (let i = 0; i < theLength; i++) {
      afterDays.push({
        date: dObj.getDate()
      });
      dObj.setDate(dObj.getDate() + 1);
    }
    return afterDays;
  }

  numOfDAysInMonth(month, year) {
    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30;
    } else if (month === 1) {
      if ((!(year % 4) && year % 100) || !(year % 400)) {
        return 29;
      } else {
        return 28;
      }
    } else {
      return 31;
    }
  }

  prevMonth() {
    const prevM = this.currentDate.getMonth() - 1;
    const d = this.currentDate;
    d.setMonth(prevM);
    this.setCurrentDate(d);
  }

  nextMonth() {
    const nextM = this.currentDate.getMonth() + 1;
    const d = this.currentDate;
    d.setMonth(nextM);
    this.setCurrentDate(d);
  }

  selectDate(timestamp) {
    const d = new Date(timestamp);
    this.selectedDate = d;
    console.log(this.selectedDate);
  }

}
