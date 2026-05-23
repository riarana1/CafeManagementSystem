import { Component, EventEmitter, Inject ,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  imports: [MatToolbar, MatToolbarRow, MatIcon, MatDialogContent, MatDialogActions]
})
export class ConfirmationComponent implements OnInit {

  onEmistStatusChange = new EventEmitter();
  details:any = {};
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any) { }


  ngOnInit(): void {
    if(this.dialogData && this.dialogData.confirmation){
      this.details = this.dialogData;
    }
  }

  handleChangeAction(){
    this.onEmistStatusChange.emit();
  }

}
