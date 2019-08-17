import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private afs: AngularFirestore) { }

  addProducet(product) {
    return this.afs.collection('products').add(product)
  }

  getProducts() {
    return this.afs.collection('products').snapshotChanges()
      .pipe(
        map(snapshot => {
          return snapshot.map(doc => {
            return {
              data: doc.payload.doc.data(),
              id: doc.payload.doc.id
            }
          })
        })
      )
  }

  getProductById(productId){
   return this.afs.doc(`products/${productId}`).valueChanges()
  }

// updateproduct by id
updateProductById(productId,product){
  return this.afs.doc(`products/${productId}`).update(product)
}
}
