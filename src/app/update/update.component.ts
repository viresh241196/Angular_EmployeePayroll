import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"],
})
export class UpdateComponent implements OnInit {
  obj: any;
  userName: any;
  day: any;
  month: any;
  year: number;
  employee: any;
  gender: any;
  @ViewChild("register") signupForm: any;

  constructor(
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    console.log("info in update component", data.info);
    this.obj = data.info;
    this.userName = this.obj.name;
    this.gender = this.obj.gender;
    console.log(this.gender);
    let date = this.obj.startDate;
    let dateArray = date.split("/");
    this.day = dateArray[0];
    this.month = dateArray[1];
    this.year = dateArray[2];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.userService.getEmployeeList().subscribe((res) => {
      console.log(res);
      this.employee = res;
    });
  }

  openSnackBar() {
    this._snackBar.open("updated successfully", "close");
    this.router.navigateByUrl("dashboard");
  }

  nameError: string = "";
  departmentsList = ["HR", "Sales", "Finance", "Engineer", "Others"];
  genders = ["male", "female"];
  checkedDepartments: any = [];
  salary: number = 30000;
  // day: number = 0;
  // month: string = "";
  // year: number = 0;
  note: string = "";

  getDepartment(dept: string) {
    if (!this.checkedDepartments.includes(dept)) {
      this.checkedDepartments.push(dept);
    } else {
      let index = this.checkedDepartments.indexOf(dept);
      this.checkedDepartments.splice(index, 1);
    }
    console.log(this.checkedDepartments);
  }

  updateEmployee(data: any) {
    console.log("request send", data);
    this.userService.updateEmployee(this.obj.empId, data).subscribe((res) => {
      console.log(res);
    });
  }

  onInput($event: any) {
    console.log("Change Event Occurred", $event.data);
    const nameRegex = RegExp("^[A-Z]{1}[a-zA-Z\\s]{2,}$");
    if (nameRegex.test(this.obj.name)) {
      this.nameError = "";
      return;
    }
    this.nameError = "Name is Incorrect";
  }
  submitForm(register: any) {
    let data = this.addEmp(register);
    this.updateEmployee(data);
    console.log(data);
    this.dialogRef.close();
    this.openSnackBar();
  }

  addEmp(register: any) {
    let date =
      register.value.Day +
      "/" +
      register.value.Month +
      "/" +
      register.value.Year;
    let response = {
      empId: this.obj.empId,
      name: register.value.name,
      salary: register.value.salary,
      gender: register.value.gender,
      startDate: date,
      profilePic: register.value.profile,
      note: register.value.Notes,
      departments: this.checkedDepartments,
    };
    return response;
  }
}
