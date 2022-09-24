import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
    ) { }

  initAuthListener(){
    this.auth.authState.subscribe(firebaseUser => console.log(firebaseUser));
  }

  createUser(name: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(user?.uid, name, email);
        this.firestore.doc(`${newUser.uid}/user`)
        .set({...newUser});
      });
  }

  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.auth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(firebaseUser => firebaseUser != null)
    );
  }
}
