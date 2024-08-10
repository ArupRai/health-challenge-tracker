import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'workouts'];
  dataSource: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';
  filterType: string = '';
  pageSize = 5;
  pageIndex = 0;
  length = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.users$.subscribe(users => {
      this.dataSource = users;
      this.length = users.length;
      this.filterUsers();
    });
  }

  handlePageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.filterUsers(); // Reapply filtering when the page changes
  }

  filterUsers() {
    this.filteredUsers = this.dataSource.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const typeMatch = this.filterType === '' || user.workouts.some(workout => workout.type === this.filterType);
      return nameMatch && typeMatch;
    });
    this.paginator.length = this.filteredUsers.length;
  }

  get paginatedData() {
    const startIndex = this.pageIndex * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }
}
