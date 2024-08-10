import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User, Workout } from '../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  name: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  addUser() {
    const newUser: User = {
      id: 0, // Will be assigned by the service
      name: this.name,
      workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }]
    };

    this.userService.addUser(newUser);
    // Clear form fields after successful addition
    this.name = '';
    this.workoutType = '';
    this.workoutMinutes = 0;
  }
}
