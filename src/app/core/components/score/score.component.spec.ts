import { render } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { ScoreComponent } from './score.component';

describe('ScoreComponent', () => {
  async function renderComponent() {
    return render(ScoreComponent, {
      componentInputs: {
        score: {
          average: 8,
          ratings: 2,
        },
      },
    });
  }

  it('should display score and ratings amount', async () => {
    const screen = await renderComponent();

    expect(screen.getByText('8.0')).toBeVisible();
    expect(screen.getByText('2 users')).toBeVisible();
  });

  it('should set container class', async () => {
    const screen = await renderComponent();

    expect(screen.getByTestId('container')).toHaveClass('good');
  });
});
