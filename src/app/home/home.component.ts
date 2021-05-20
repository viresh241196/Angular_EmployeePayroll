import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { UpdateComponent } from "../update/update.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService, public dialog: MatDialog) {}
  employee: any = [];
  empId: any;
  ngOnInit(): void {
    this.userService.getEmployeeList().subscribe((res) => {
      console.log(res);
      this.employee = res;
    });
  }

  onDelete(empId: any) {
    console.log(empId);
    this.userService.deleteEmployee(empId).subscribe((res) => {
      console.log(res);
    });
  }

  onUpdate(info: any) {
    console.log(info);
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: {
        info,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("The dialog was closed");
    });
  }
}
