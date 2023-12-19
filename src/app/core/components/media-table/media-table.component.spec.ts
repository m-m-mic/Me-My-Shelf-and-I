import { fireEvent, render } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { MediaTableComponent } from './media-table.component';
import { MediaRow } from '../../models/table.interface';

const gameRows: MediaRow[] = [
  {
    title: 'A Game',
    id: 'id-1',
    progress: 'Not Started',
    format: 'physical',
    platform: 'Platform',
    added_on: 0,
    time: 0,
  },
  {
    title: 'B Game',
    id: 'id-2',
    progress: 'Not Started',
    format: 'physical',
    platform: 'Platform',
    added_on: 0,
    time: 0,
  },
];

const rows = (): MediaRow[] => {
  const rows: MediaRow[] = [];

  for (let i = 0; i < 150; i++) {
    rows.push({
      title: `Media ${i + 1}`,
      id: 'test-id',
      progress: 'Not Started',
      format: 'physical',
      platform: 'Platform',
      added_on: 0,
      time: 0,
    });
  }

  return rows;
};

describe('MediaTableComponent', () => {
  async function renderComponent() {
    return render(MediaTableComponent, {
      componentInputs: {
        rows: gameRows,
      },
    });
  }

  it('should display all rows', async () => {
    const screen = await renderComponent();

    expect(screen.getByText('A Game')).toBeVisible();
    expect(screen.getByText('B Game')).toBeVisible();
  });

  it('should sort by title', async () => {
    const screen = await renderComponent();

    const columnHeaders = screen.getAllByRole('columnheader');

    let rowTitles = screen.getAllByTestId('title-link');

    expect(rowTitles[0].textContent?.trim()).toEqual('A Game');
    expect(rowTitles[1].textContent?.trim()).toEqual('B Game');

    fireEvent.click(columnHeaders[1]);

    rowTitles = screen.getAllByTestId('title-link');

    expect(rowTitles[0].textContent?.trim()).toEqual('B Game');
    expect(rowTitles[1].textContent?.trim()).toEqual('A Game');

    fireEvent.click(columnHeaders[1]);

    rowTitles = screen.getAllByTestId('title-link');

    expect(rowTitles[0].textContent?.trim()).toEqual('A Game');
    expect(rowTitles[1].textContent?.trim()).toEqual('B Game');
  });

  it('should filter rows and clear filter', async () => {
    const screen = await renderComponent();

    fireEvent.input(screen.getByTestId('filter-input'), {
      target: { value: 'a game' },
    });

    expect(screen.queryByText('A Game')).toBeInTheDocument();
    expect(screen.queryByText('B Game')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('clear-button'));

    expect(screen.queryByText('A Game')).toBeInTheDocument();
    expect(screen.queryByText('B Game')).toBeInTheDocument();
  });

  it('should split items into multiple pages', async () => {
    const screen = await renderComponent();
    await screen.rerender({ componentInputs: { rows: rows() } });

    expect(screen.getAllByTestId('page-button').length).toEqual(2);

    expect(screen.getAllByTestId('page-button')[0]).toHaveClass('active');
    expect(screen.getAllByTestId('page-button')[1]).not.toHaveClass('active');
    expect(screen.getAllByTestId('title-link').length).toEqual(100);

    fireEvent.click(screen.getAllByTestId('page-button')[1]);

    expect(screen.getAllByTestId('page-button')[0]).not.toHaveClass('active');
    expect(screen.getAllByTestId('page-button')[1]).toHaveClass('active');
    expect(screen.getAllByTestId('title-link').length).toEqual(50);
  });

  it('should display correct placeholder', async () => {
    const screen = await renderComponent();

    expect(screen.getByPlaceholderText('Search for Games...')).toBeVisible();

    await screen.rerender({
      componentInputs: { mediaType: 'movie', rows: [] },
    });

    expect(screen.getByPlaceholderText('Search for Movies...')).toBeVisible();

    await screen.rerender({
      componentInputs: { mediaType: 'album', rows: [] },
    });

    expect(screen.getByPlaceholderText('Search for Albums...')).toBeVisible();
  });
});
