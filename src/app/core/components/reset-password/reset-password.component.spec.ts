import { fireEvent, render } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { ResetPasswordComponent } from './reset-password.component';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

const errorMessage = new BehaviorSubject<string | undefined>(undefined);

const mockStore = {
  select: () => errorMessage.asObservable(),
};

const mockAuthenticationService = {
  resetPassword: async () => true,
};

const mockRouter = {
  navigate: jest.fn(),
};

describe('ResetPasswordComponent', () => {
  async function renderComponent() {
    return render(ResetPasswordComponent, {
      componentInputs: {
        email: 'test@email.com',
        oobCode: 'code',
      },
      childComponentOverrides: [
        {
          component: ResetPasswordComponent,
          providers: [
            {
              provide: AuthenticationService,
              useValue: mockAuthenticationService,
            },
            {
              provide: Store,
              useValue: mockStore,
            },
            {
              provide: Router,
              useValue: mockRouter,
            },
          ],
        },
      ],
    });
  }

  it('should display email', async () => {
    const screen = await renderComponent();

    expect(screen.getByText('for: test@email.com')).toBeVisible();
  });

  it('should reset password if inputs are valid and navigate', async () => {
    const screen = await renderComponent();

    const passWordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');

    fireEvent.input(passWordInput, { target: { value: 'NewPassword' } });
    fireEvent.blur(passWordInput);

    fireEvent.input(confirmPasswordInput, { target: { value: 'NewPassword' } });
    fireEvent.blur(confirmPasswordInput);

    const resetButton = screen.getByTestId('reset-button');

    // Check for disabled is required because jsdom ignores disabled state when executing
    // fireEvent: https://github.com/jsdom/jsdom/issues/2665
    expect(resetButton.getAttribute('ng-reflect-disabled')).toEqual('false');
    fireEvent.click(resetButton);

    await new Promise((resolve) => setTimeout(resolve, 200));

    screen.detectChanges();

    fireEvent.click(screen.getByTestId('navigate-button'));

    expect(mockRouter.navigate.mock.calls.length).toEqual(1);
  });

  it('should disabled reset button if inputs are invalid', async () => {
    const screen = await renderComponent();

    const passWordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');

    fireEvent.input(passWordInput, { target: { value: 'NewPassword' } });
    fireEvent.blur(passWordInput);

    fireEvent.input(confirmPasswordInput, { target: { value: 'NewPassw' } });
    fireEvent.blur(confirmPasswordInput);

    const resetButton = screen.getByTestId('reset-button');

    // Check for disabled is required because jsdom ignores disabled state when executing
    // fireEvent: https://github.com/jsdom/jsdom/issues/2665
    expect(resetButton.getAttribute('ng-reflect-disabled')).toEqual('true');
  });

  it('should show error message', async () => {
    const screen = await renderComponent();

    expect(screen.queryByText('Test Password Error')).not.toBeInTheDocument();

    errorMessage.next('Test Password Error');

    screen.detectChanges();

    screen.debug();

    expect(screen.queryByText('Test Password Error')).toBeInTheDocument();
  });
});
