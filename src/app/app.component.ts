import { Component, OnInit } from '@angular/core';
import {TodoserviceService} from './todoservice.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-todo-app';
  task:string;
  loader:Boolean = false;
  alltask:any;
  constructor(private _todo:TodoserviceService){}
  ngOnInit(){
    this.alltask = this._todo.get_alltask()
  }
  
  
  submit_task(){
    if(this.task){
      let data = {};
      data['task_name']=this.task;
      
      this._todo.submit_task(data).then(res=>{
        
        // console.log(res)
       
      }).catch(
        err=>{
          console.log(err)
      })
    }
    else{
      alert('Add a task first.')
    }
  }
}
