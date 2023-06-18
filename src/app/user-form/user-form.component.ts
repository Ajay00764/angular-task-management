import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  hotelForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private service: UserDataService,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.hotelForm = this.builder.group({
      id: '',
      name: '',
      role : '',
      contactNumber: '',
    })
  }

  ngOnInit(): void {
    this.hotelForm.patchValue(this.data)
  }

  hotelRegistr() {
    if (this.hotelForm.valid) {
      if (this.data) {
        this.service.updateUser(this.data.id, this.hotelForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('User Updated Successfully !!');
            this.dialog.close(true);

          },
          error: (err: any) => {
            this.toastr.error("some error occurred")
          }
        })
      } else {
        console.log(this.hotelForm.value)
        this.service.addUser(this.hotelForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('User Registered Successfully', "Congratulations!!");
            this.dialog.close(true);

          },
          error: (err: any) => {
            this.toastr.error("some error occurred")
          }
        })
      }
    }

  }

  closeDialog() {
    this.dialog.close();
  }

}
