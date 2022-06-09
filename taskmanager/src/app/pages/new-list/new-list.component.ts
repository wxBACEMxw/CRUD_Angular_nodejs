import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {

  public lists: List[] | undefined;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
  }


  createList(title: string) {
    this.taskService.createList(title).subscribe((list: any) => {
      this.lists= list;
    });
  }
}
