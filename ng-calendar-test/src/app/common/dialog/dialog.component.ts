import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CoreService} from '../../services/core.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  standAlone = { standAlone:true };
  isQuerying = false;
  forecast = null;
  colors = ['blue', 'red', 'green', 'purple', 'gray', 'brown', 'orange'];

  constructor(@Optional() public dialogRef: MatDialogRef<DialogComponent>,
              public coreService: CoreService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data.form.city) {
      this.getWeather();
    }
  }

  getWeather() {
    if (this.data.form.city) {
      this.isQuerying = true;
      const setSpinnerOff = () => {
        this.isQuerying = false;
      };
      this.coreService.getWeather(this.data.form.city)
        .subscribe((res: any) => {
          this.forecast = {
            min: (res.main.temp_min - 273.15).toFixed(0) + 'F°',
            max: (res.main.temp_max - 273.15).toFixed(0) + 'F°',
            icon: res.weather[0].icon
          };
        }, () => {
          this.forecast = null;
          setSpinnerOff();
        }, () => {
          setSpinnerOff();
        });
    } else {
      this.forecast = null;
    }
  }

  onCancel(form) {
    form.reset();
    this.dialogRef.close();
  }
}