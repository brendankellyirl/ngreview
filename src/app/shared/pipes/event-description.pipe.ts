import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'formatEventDescription'})
export class FormatEventDescriptionPatternPipe implements PipeTransform {

    private formatOption: number = 1;

    transform(eventDescription: String, option?: number): String {
        if (typeof option === 'undefined' || option === null) {
            this.formatOption = 1;
        } else {
            this.formatOption = option;
        }

        switch(this.formatOption) {
            case 1: {
                let firstLine = eventDescription.substring(0, eventDescription.indexOf("."));
                let remainder = eventDescription.substring(eventDescription.indexOf(".")+1, eventDescription.length);
                
                let updatedDescription = '<p class="eventDescriptionFirstLine">'+ firstLine + '.</p><p>'+remainder+'</p>';
                return updatedDescription;
                
            }
            default: {
                let firstLine = eventDescription.substring(0, eventDescription.indexOf("."));
                let remainder = eventDescription.substring(eventDescription.indexOf(".")+1, eventDescription.length);
                
                let updatedDescription = '<p class="eventDescriptionFirstLine">'+ firstLine + '.</p><p>'+remainder+'</p>';
                return updatedDescription;
            }
        }
    }
}
