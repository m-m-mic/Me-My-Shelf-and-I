import { DestroyRef, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Rating, Score } from '../models/rating.interface';
import { AuthenticationService } from './authentication.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';

const RATINGS_PATH = '/ratings';

@Injectable({
  providedIn: 'root',
})
export class RatingsService {
  ratingsRef: AngularFirestoreCollection<Rating>;

  constructor(
    private db: AngularFirestore,
    private authenticationService: AuthenticationService,
    private destroyRef: DestroyRef,
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
        takeUntilDestroyed(this.destroyRef),
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

  addRating(itemId: string) {
    return;
  }

  removeRating(itemId: string) {
    return;
  }
}
