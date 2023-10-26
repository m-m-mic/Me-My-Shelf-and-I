import { fireEvent, render } from '@testing-library/angular';
import { ChangePasswordComponent } from './change-password.component';
import { AuthenticationService } from '../../services/authentication.service';

let isPasswordValid: boolean;

const mockAuthenticationService = {
  updatePassword: jest.fn(),
  validatePassword: () => isPasswordValid,
};

describe('ChangePasswordComponent', () => {
  async function renderComponent() {
    return render(ChangePasswordComponent, {
      childComponentOverrides: [
        {
          component: ChangePasswordComponent,
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

  it('should enable and disable input when change and discard button is pressed', async () => {
    const screen = await renderComponent();

    const oldPasswordInput = screen.getByTestId('old-password-input');
    const newPasswordInput = screen.getByTestId('new-password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');

    expect(oldPasswordInput.hasAttribute('disabled')).toBeTruthy();
    expect(newPasswordInput.hasAttribute('disabled')).toBeTruthy();
    expect(confirmPasswordInput.hasAttribute('disabled')).toBeTruthy();

    const changeButton = screen.getByTestId('change-button');

    fireEvent.click(changeButton);

    expect(oldPasswordInput.hasAttribute('disabled')).toBeFalsy();
    expect(newPasswordInput.hasAttribute('disabled')).toBeFalsy();
    expect(confirmPasswordInput.hasAttribute('disabled')).toBeFalsy();

    const discardButton = screen.getAllByTestId('discard-button')[0];

    fireEvent.click(discardButton);

    expect(oldPasswordInput.hasAttribute('disabled')).toBeTruthy();
    expect(newPasswordInput.hasAttribute('disabled')).toBeTruthy();
    expect(confirmPasswordInput.hasAttribute('disabled')).toBeTruthy();
  });

  it('should update display name and disable input if update button is pressed', async () => {
    const screen = await renderComponent();
    isPasswordValid = true;

    const oldPasswordInput = screen.getByTestId('old-password-input');
    const newPasswordInput = screen.getByTestId('new-password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');

    fireEvent.click(screen.getByTestId('change-button'));

    fireEvent.input(oldPasswordInput, { target: { value: 'OldPassword' } });
    fireEvent.blur(oldPasswordInput);

    // Wait for async validator to finish
    await new Promise((resolve) => setTimeout(resolve, 200));

    fireEvent.input(newPasswordInput, { target: { value: 'NewPassword' } });
    fireEvent.blur(newPasswordInput);

    fireEvent.input(confirmPasswordInput, { target: { value: 'NewPassword' } });
    fireEvent.blur(confirmPasswordInput);

    const updateButton = screen.getAllByTestId('update-button')[0];

    // Check for disabled is required because jsdom ignores disabled state when executing
    // fireEvent: https://github.com/jsdom/jsdom/issues/2665
    expect(updateButton.getAttribute('ng-reflect-disabled')).toEqual('false');
    fireEvent.click(updateButton);
    expect(mockAuthenticationService.updatePassword.mock.calls).toHaveLength(1);

    expect(oldPasswordInput.hasAttribute('disabled')).toBeTruthy();
    expect(newPasswordInput.hasAttribute('disabled')).toBeTruthy();
    expect(confirmPasswordInput.hasAttribute('disabled')).toBeTruthy();
  });

  it('should show error messages and disabled update button when inputs are invalid', async () => {
    const screen = await renderComponent();
    isPasswordValid = false;

    const oldPasswordInput = screen.getByTestId('old-password-input');
    const newPasswordInput = screen.getByTestId('new-password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');

    fireEvent.click(screen.getByTestId('change-button'));

    fireEvent.input(oldPasswordInput, { target: { value: 'OldPassword' } });
    fireEvent.blur(oldPasswordInput);

    // Wait for async validator to finish
    await new Promise((resolve) => setTimeout(resolve, 200));

    fireEvent.input(newPasswordInput, { target: { value: 'WPW' } });
    fireEvent.blur(newPasswordInput);

    fireEvent.input(confirmPasswordInput, { target: { value: 'NewPassword' } });
    fireEvent.blur(confirmPasswordInput);

    const updateButton = screen.getAllByTestId('update-button')[0];

    // Check for disabled is required because jsdom ignores disabled state when executing
    // fireEvent: https://github.com/jsdom/jsdom/issues/2665
    expect(updateButton.getAttribute('ng-reflect-disabled')).toEqual('true');

    expect(screen.getByText('Incorrect Password')).toBeTruthy();
    expect(
      screen.getByText('Has to be at least 8 characters long'),
    ).toBeTruthy();
    expect(screen.getByText('Passwords do not match')).toBeTruthy();
  });
});
