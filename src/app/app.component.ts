import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

import {AngularFirestore} from '@angular/fire/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-todo-app';
  task:string;
  loader:Boolean = false;
  alltask=[];


  constructor(private _fireservice:AngularFirestore){}

  ngOnInit(){
    this.get_alltask()
  }
  
  // to export file as excel
  export(){                 
    if(this.alltask.length!=0){
      let ele = document.getElementById('export');
    
      const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(ele);
  
      const wb:XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
  
      XLSX.writeFile(wb,'sheet1.xlsx');
    }
    else{
      alert('No. task to export')
    }
    
  }

  submit_task(){
    if(this.task){
      let data = {};
      data['task_name']=this.task;
      this._fireservice.collection('tasks').add(data)
      
    }
    else{
      alert('Add a task first.')
    }
  }


  get_alltask(){
    this._fireservice.collection('tasks')
    .snapshotChanges()
    .subscribe(snap=>{
      let mydata = []
      snap.forEach(doc=>{
        console.log(doc.payload.doc.data());
        mydata.push(doc.payload.doc.data()['task_name'])
        
      })
     this.alltask = mydata;
    },
    err=>{
      console.log(err)
    })
    
   
  }
}
