import { Pipe, PipeTransform } from "@angular/core";
import { ILocation } from "src/app/core";

@Pipe({ name: "displayLocationAddress" })
export class DisplayLocationAddressPipe implements PipeTransform {
  private displayOption: number = 1;

  transform(location: ILocation, option?: number): String {
    if (typeof option === "undefined" || option === null) {
      this.displayOption = 1;
    } else {
      this.displayOption = option;
    }

    switch (this.displayOption) {
      case 1: {
        //let newDate = moment(datePassed, 'DD/MM/YYYY', true).format('dddd MMMM Do');
        let fullAddress: string = "";
        let seperator: string = ", ";
        if (location.name) fullAddress = location.name;
        if (location.address1) fullAddress += seperator + location.address1;
        if (location.address2) fullAddress += seperator + location.address2;
        if (location.city) fullAddress += seperator + location.city;
        return fullAddress;
      }
      default: {
        let fullAddress: string = "";
        let seperator: string = ", ";
        if (location.address1) fullAddress = location.address1;
        if (location.address2) fullAddress += seperator + location.address2;
        if (location.city) fullAddress += seperator + location.city;
        return fullAddress;
      }
    }
  }
}
