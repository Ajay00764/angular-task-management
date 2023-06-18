import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserDataService } from '../user-data.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  displayedColumns: string[] = [
    'id',
    'name',
    'contactNumber',
    'role',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private service: UserDataService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  addUser() {
    const dialogRef = this.dialog.open(UserFormComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      }
    })
  }

  getUserList() {
    this.service.getUsers().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res)
      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: number) {
    this.service.deleteUser(id).subscribe({
      next: (res: any) => {
        this.toastr.success("Member Deleted !!");
        this.getUserList();
      },
      error: console.log,
    })
  }

  openUserForm(data: any) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      }
    })
  }

}
