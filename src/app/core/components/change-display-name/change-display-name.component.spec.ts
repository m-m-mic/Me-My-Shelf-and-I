import { fireEvent, render } from '@testing-library/angular';
import { ChangeDisplayNameComponent } from './change-display-name.component';
import { AuthenticationService } from '../../services/authentication.service';
import '@testing-library/jest-dom';

const mockAuthenticationService = {
  updateDisplayName: jest.fn(),
};

describe('ChangeDisplayNameComponent', () => {
  async function renderComponent() {
    return render(ChangeDisplayNameComponent, {
      componentInputs: {
        displayName: 'TestProfile',
      },
      childComponentOverrides: [
        {
          component: ChangeDisplayNameComponent,
          providers: [
            {
              provide: AuthenticationService,
              useValue: mockAuthenticationService,
            },
          ],
        },
      ],
    });
  }

  it('should display current displayName as input value', async () => {
    const screen = await renderComponent();

    expect(screen.getByTestId('display-name-input')).toBeTruthy();
  });

  it('should enable and disable input when change and discard button is pressed', async () => {
    const screen = await renderComponent();

    const input = screen.getByTestId('display-name-input');

    expect(input.hasAttribute('disabled')).toBeTruthy();

    const changeButton = screen.getByTestId('change-button');

    fireEvent.click(changeButton);

    expect(input.hasAttribute('disabled')).toBeFalsy();

    const discardButton = screen.getAllByTestId('discard-button')[0];

    fireEvent.click(discardButton);

    expect(input.hasAttribute('disabled')).toBeTruthy();
  });

  it('should disable update button if input is invalid', async () => {
    const screen = await renderComponent();

    fireEvent.click(screen.getByTestId('change-button'));

    expect(
      screen
        .getAllByTestId('update-button')[0]
        .getAttribute('ng-reflect-disabled'),
    ).toBeTruthy();
  });

  it('should display error text when input is invalid (max length)', async () => {
    const screen = await renderComponent();

    const input = screen.getByTestId('display-name-input');

    fireEvent.click(screen.getByTestId('change-button'));
    fireEvent.input(input, { target: { value: 'this-is-an-overly-long' } });

    expect(screen.getByTestId('maxlength-error')).toBeTruthy();
  });

  it('should update display name and disable input if update button is pressed', async () => {
    const screen = await renderComponent();

    const input = screen.getByTestId('display-name-input');

    fireEvent.click(screen.getByTestId('change-button'));
    fireEvent.input(input, { target: { value: 'TestName' } });
    fireEvent.click(screen.getAllByTestId('update-button')[0]);

    expect(mockAuthenticationService.updateDisplayName.mock.calls).toHaveLength(
      1,
    );
  });
});
