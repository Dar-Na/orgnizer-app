import {Pipe, PipeTransform} from '@angular/core'
import * as moment from "moment";

@Pipe({
  name: 'customDate',
  pure: false
})

export class CustomDatePipe implements PipeTransform {
  transform(d: moment.Moment, format: string = 'MMMM YYYY'): string {
    return d.format(format)
  }

}
