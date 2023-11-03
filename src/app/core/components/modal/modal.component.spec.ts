import { fireEvent, render } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { ModalComponent } from './modal.component';
import { ModalService } from '../../services/modal.service';
import { of } from 'rxjs';

const mockModalService = {
  isVisible$: of(true),
  close: jest.fn(),
};

describe('ModalComponent', () => {
  async function renderComponent() {
    return render(ModalComponent, {
      componentInputs: {
        title: 'TestTitle',
        state: 'danger',
      },
      childComponentOverrides: [
        {
          component: ModalComponent,
          providers: [
            {
              provide: ModalService,
              useValue: mockModalService,
            },
          ],
        },
      ],
    });
  }

  it('should display modal title', async () => {
    const screen = await renderComponent();

    expect(screen.getByText('TestTitle')).toBeVisible();
  });

  it('should set state class', async () => {
    const screen = await renderComponent();

    expect(screen.getByTestId('modal-border')).toHaveClass('danger');

    await screen.rerender({
      componentInputs: {
        state: 'success',
      },
    });

    expect(screen.getByTestId('modal-border')).toHaveClass('success');
  });

  it('should trigger close when close button is pressed', async () => {
    const screen = await renderComponent();

    fireEvent.click(screen.getByTestId('close-button'));

    expect(mockModalService.close.mock.calls.length).toEqual(1);
  });

  it('should trigger close when backdrop is pressed', async () => {
    const screen = await renderComponent();

    fireEvent.click(screen.getByTestId('modal-backdrop'));

    expect(mockModalService.close.mock.calls.length).toEqual(1);
  });
});
