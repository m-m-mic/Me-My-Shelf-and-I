import { fireEvent, render } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { MediaDataComponent } from './media-data.component';
import { Game } from '../../models/game.interface';
import { Score } from '../../models/rating.interface';
import { GamesService } from '../../services/games.service';
import { MoviesService } from '../../services/movies.service';
import { AlbumsService } from '../../services/albums.service';

const mockMediaService = {
  saveToUserCollection: jest.fn(),
  removeFromUserCollection: jest.fn(),
};

const mockGame: Game = {
  title: 'Test Game',
  platform: 'TestPlatform',
  saved_by: ['test_id1', 'test_id2'],
};

const mockScore: Score = {
  average: 8,
  ratings: 2,
};

describe('MediaDataComponent', () => {
  async function renderComponent() {
    return render(MediaDataComponent, {
      componentInputs: {
        data: mockGame,
        inCollection: false,
        score: mockScore,
        id: 'testId',
      },
      childComponentOverrides: [
        {
          component: MediaDataComponent,
          providers: [
            { provide: GamesService, useValue: mockMediaService },
            { provide: MoviesService, useValue: mockMediaService },
            { provide: AlbumsService, useValue: mockMediaService },
          ],
        },
      ],
    });
  }

  it('should display title', async () => {
    const screen = await renderComponent();

    expect(screen.getByText('Test Game')).toBeVisible();
  });

  it('should add and remove media item from collection', async () => {
    const screen = await renderComponent();

    fireEvent.click(screen.getByTestId('add-button'));

    expect(mockMediaService.saveToUserCollection.mock.calls.length).toEqual(1);

    await screen.rerender({
      componentInputs: {
        data: mockGame,
        inCollection: true,
        score: mockScore,
        id: 'testId',
      },
    });

    fireEvent.click(screen.getByTestId('remove-button'));

    expect(mockMediaService.removeFromUserCollection.mock.calls.length).toEqual(
      1,
    );
  });

  it('should not add or remove to collection if id is undefined', async () => {
    const screen = await renderComponent();

    await screen.rerender({
      componentInputs: {
        data: mockGame,
        inCollection: false,
        score: mockScore,
      },
    });

    fireEvent.click(screen.getByTestId('add-button'));

    expect(mockMediaService.saveToUserCollection.mock.calls.length).toEqual(0);

    await screen.rerender({
      componentInputs: {
        data: mockGame,
        inCollection: true,
        score: mockScore,
      },
    });

    fireEvent.click(screen.getByTestId('remove-button'));

    expect(mockMediaService.removeFromUserCollection.mock.calls.length).toEqual(
      0,
    );
  });
});
