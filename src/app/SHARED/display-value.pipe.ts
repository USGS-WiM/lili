import { Pipe, PipeTransform } from '@angular/core';

/*
 * Retrieve display value for a field
 * Accepts the field name and the field id
 * returns the appropriate display value for UI display
 * Usage:
 *  value | id:displayValue:sourceArray
 * Example:
 *  {{sample.sample_type | displayValue:sample_type}}
 * formats to: "Performance Evaluation"
 */

@Pipe({
  name: 'displayValue'
})
export class DisplayValuePipe implements PipeTransform {

  transform(value: any, displayValue: string, sourceArray: Array<any>): any {

    alert("the pipe has been laid");
    console.log("the pipe has been laid");

    for (var i = 0; i < sourceArray.length; i++) {
            if (sourceArray[i].id === value) {
              return sourceArray[i].displayValue;
            }
        }

  }
}
