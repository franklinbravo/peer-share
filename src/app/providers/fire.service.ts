import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ElectronService } from './electron.service';
import { Observable } from 'rxjs'
import { Router } from '@angular/router';
import { User } from '../models/user-data'

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(public afAuth: AngularFireAuth, 
    public electron:ElectronService,
    public db:AngularFirestore,
    private router:Router) {
      
     }
  getKey(user){
    return this.db.collection('data_users').doc(user).snapshotChanges() 
  }
  verifyUser(data:User){
    return this.db.collection('data_users').doc(data.dataLog.username).snapshotChanges()
  }
  saveKey(data:User){
    return this.db.collection('data_users').doc(data.dataLog.username).set({
      name:data.name,
      lastname:data.lastname,
      key:data.keyPub,
      username:data.dataLog.username 
    })
  }
  async login(email: string, password: string) {
    var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['/horario']);
}
  async register(email: string, password: string) {
    var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    this.sendEmailVerification();
}
  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification()
    
}
  async loginUser(){
    
  }
  logoutUser(){}
}
