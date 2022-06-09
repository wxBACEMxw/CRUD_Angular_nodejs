import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

lists: List[] | undefined;
tasks: Task[] | undefined;
  constructor(private taskService: TaskService, private root: ActivatedRoute) { }

  ngOnInit(): void {
    this.root.params.subscribe(
      (params: Params)=>{
        console.log(params);

        this.taskService.getTasks(params['listId']).subscribe((tasks: any)=>{
          this.tasks= tasks;
          console.log(tasks);
        })
      }

    )

    this.taskService.getLists().subscribe((lists: any) => {
      this.lists= lists;
    })
  }

}
