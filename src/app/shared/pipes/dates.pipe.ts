import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({ name: "displayDatePattern" })
export class DisplayDatePatternPipe implements PipeTransform {
  private displayOption: number = 1;

  transform(datePassed: any, option?: number): String {
    if (typeof option === "undefined" || option === null) {
      this.displayOption = 1;
    } else {
      this.displayOption = option;
    }

    switch (this.displayOption) {
      case 1: {
        //let newDate = moment(datePassed, 'DD/MM/YYYY', true).format('dddd MMMM Do');
        let newDate = moment(datePassed).format("dddd MMMM Do");
        return newDate;
      }
      case 2: {
        //let newDate = moment(datePassed, 'DD/MM/YYYY', true).format('dddd Do MMMM YYYY');
        let newDate = moment(datePassed).format("dddd Do MMMM YYYY");
        return newDate;
      }
      default: {
        let newDate = moment(datePassed, "DD/MM/YYYY", true).format(
          "dddd MMMM Do"
        );
        return newDate;
      }
    }
  }
}
