import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "filterButtonLabel" })
export class FilterButtonLabelPipe implements PipeTransform {
  private displayOption: number = 1;

  transform(selectedValues: String[], option?: number): String {
    if (typeof option === "undefined" || option === null) {
      this.displayOption = 1;
    } else {
      this.displayOption = option;
    }

    switch (this.displayOption) {
      //Category Filter Button
      case 1: {
        let totalCount = 0;

        if (selectedValues) {
          totalCount = selectedValues.length;
        }

        if (totalCount === 1) {
          return totalCount + " Category";
        } else if (totalCount > 1) {
          return totalCount + " Categories";
        } else {
          return "Event Category";
        }
      }
      // case 2: {
      //   //let newDate = moment(datePassed, 'DD/MM/YYYY', true).format('dddd Do MMMM YYYY');
      //   let newDate = moment(datePassed).format("dddd Do MMMM YYYY");
      //   return newDate;
      // }
      default: {
        return "Event Category";
      }
    }
  }
}
