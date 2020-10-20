import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {
  alltask=[];
  constructor(private _fireservice:AngularFirestore) { }

  submit_task(data){
    return this._fireservice.collection('tasks').add(data)
  }
  get_alltask(){
    this._fireservice.collection('tasks')
    .snapshotChanges()
    .subscribe(snap=>{
   
      snap.forEach(doc=>{
        // console.log(doc.payload.doc.data());
        this.alltask.push(doc.payload.doc.data()['task_name'])
        
      })
     
    },
    err=>{
      console.log(err)
    })
    return this.alltask
   
  }
}
