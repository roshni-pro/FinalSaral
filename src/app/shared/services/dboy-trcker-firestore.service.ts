import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DBoyTrckerFirestoreService {
  // private dbPath = '/vehicleHistory';
  collectionName: string = environment.firebaseCollectionName;
  constructor(private afs: AngularFirestore) { }


  public getGetHistory(tripPlannerVehicleId: number) {
    return this.afs.collection<any>(this.collectionName, ref => ref.where('TripPlannerVehicleId', '==', tripPlannerVehicleId).orderBy('RecordTime', 'desc').limit(1)).valueChanges();
  }

  public getAllHistory(tripPlannerVehicleId: number) {
    return this.afs.collection<any>(this.collectionName, ref => ref.where('TripPlannerVehicleId', '==', tripPlannerVehicleId).orderBy('RecordTime', 'asc')).valueChanges();
  }


}
