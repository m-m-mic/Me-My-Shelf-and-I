import { fireEvent, render } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { InitResetPasswordComponent } from './init-reset-password.component';
import { AuthenticationService } from '../../services/authentication.service';

const mockAuthenticationService = {
  initializeResetPassword: async () => {
    return;
  },
};

describe('InitResetPasswordComponent', () => {
  async function renderComponent() {
    return render(InitResetPasswordComponent, {
      componentInputs: {
        email: 'test@email.com',
      },
      childComponentOverrides: [
        {
          component: InitResetPasswordComponent,
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

  it('should autofill email', async () => {
    const screen = await renderComponent();

    expect(screen.getByDisplayValue('test@email.com')).toBeVisible();
  });

  it('should send password reset email', async () => {
    const screen = await renderComponent();

    fireEvent.click(screen.getByTestId('send-email'));

    await new Promise((resolve) => setTimeout(resolve, 200));
    screen.detectChanges();

    expect(screen.getByTestId('confirm-sent')).toBeVisible();
  });
});
