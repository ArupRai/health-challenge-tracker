import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Workout } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor() {
    // Load initial data from localStorage or other sources
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.usersSubject.next(JSON.parse(storedUsers));
    } else {
      // Initial data (replace with your desired data)
      const initialUsers: User[] = [
        { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] },
        { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] },
        { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Yoga', minutes: 50 }, { type: 'Cycling', minutes: 40 }] }
      ];
      this.usersSubject.next(initialUsers);
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  addUser(user: User) {
    const newUserId = this.usersSubject.value.length + 1;
    user.id = newUserId;
    const updatedUsers = [...this.usersSubject.value, user];
    this.usersSubject.next(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }

  // Add methods for updating, deleting, searching, and filtering users
}
