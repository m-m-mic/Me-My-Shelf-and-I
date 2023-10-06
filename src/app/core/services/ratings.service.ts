import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Rating, Score } from '../models/rating.interface';
import { AuthenticationService } from './authentication.service';
import { firstValueFrom, map, Observable } from 'rxjs';

const RATINGS_PATH = '/ratings';

@Injectable({
  providedIn: 'root',
})
export class RatingsService {
  ratingsRef: AngularFirestoreCollection<Rating>;

  constructor(
    private db: AngularFirestore,
    private authenticationService: AuthenticationService,
  ) {
    this.ratingsRef = db.collection(RATINGS_PATH);
  }

  getAverageScore(itemId: string): Observable<Score> {
    return this.db
      .collection<Rating>(RATINGS_PATH, (ref) =>
        ref.where('item_id', '==', itemId),
      )
      .valueChanges()
      .pipe(
        map((items) => {
          let cumulativeScore = 0;
          items.forEach(
            (item) => (cumulativeScore = cumulativeScore + item.score),
          );
          return {
            average: cumulativeScore === 0 ? 0 : cumulativeScore / items.length,
            ratings: items.length,
          };
        }),
      );
  }

  async addRating(itemId: string, score: number) {
    const authUser = await firstValueFrom(this.authenticationService.getUser());

    if (!authUser?.uid) {
      throw new Error('Could not find user');
    }

    const data: Rating = {
      item_id: itemId,
      user_id: authUser.uid,
      score: score,
    };

    this.ratingsRef.add(data);
  }

  async updateRating(itemId: string, score: number) {
    const authUser = await firstValueFrom(this.authenticationService.getUser());

    if (!authUser?.uid) {
      throw new Error('Could not find user');
    }

    const ratings = await firstValueFrom(
      this.db
        .collection<Rating>(RATINGS_PATH, (ref) =>
          ref
            .where('item_id', '==', itemId)
            .where('user_id', '==', authUser.uid),
        )
        .snapshotChanges(),
    );

    if (ratings.length === 0) {
      throw new Error('Could not find rating entry');
    }

    const data: Rating = {
      item_id: itemId,
      user_id: authUser.uid,
      score: score,
    };

    this.ratingsRef.doc(ratings[0].payload.doc.id).update(data);
  }

  async removeRating(itemId: string) {
    const authUser = await firstValueFrom(this.authenticationService.getUser());

    if (!authUser?.uid) {
      throw new Error('Could not find user');
    }

    const ratings = await firstValueFrom(
      this.db
        .collection<Rating>(RATINGS_PATH, (ref) =>
          ref
            .where('item_id', '==', itemId)
            .where('user_id', '==', authUser.uid),
        )
        .snapshotChanges(),
    );

    if (ratings.length === 0) {
      throw new Error('Could not find rating entry');
    }

    this.ratingsRef.doc(ratings[0].payload.doc.id).delete();
  }
}
