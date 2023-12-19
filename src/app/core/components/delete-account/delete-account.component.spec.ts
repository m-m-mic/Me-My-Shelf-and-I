import { fireEvent, render } from '@testing-library/angular';
import { DeleteAccountComponent } from './delete-account.component';
import { AuthenticationService } from '../../services/authentication.service';
import { DeletionService } from '../../services/deletion.service';

let isPasswordValid: boolean;

const mockAuthenticationService = {
  validatePassword: () => isPasswordValid,
};

const mockDeletionService = {
  delete: jest.fn(),
};

describe('DeleteAccountComponent', () => {
  async function renderComponent() {
    return render(DeleteAccountComponent, {
      childComponentOverrides: [
        {
          component: DeleteAccountComponent,
          providers: [
            {
              provide: AuthenticationService,
              useValue: mockAuthenticationService,
            },
            {
              provide: DeletionService,
              useValue: mockDeletionService,
            },
          ],
        },
      ],
    });
  }

  it('should disable delete account button', async () => {
    const screen = await renderComponent();
    isPasswordValid = false;

    expect(
      screen.getByTestId('delete-button').getAttribute('ng-reflect-disabled'),
    ).toEqual('true');
  });

  it('should delete account when correct password is entered', async () => {
    const screen = await renderComponent();
    isPasswordValid = true;

    const modalButton = screen.getByTestId('open-button');

    fireEvent.click(modalButton);

    const input = screen.getByTestId('password-input');

    fireEvent.input(input, { target: { value: 'password' } });
    fireEvent.blur(input);

    // Wait for async validator to finish
    await new Promise((resolve) => setTimeout(resolve, 200));
    screen.detectChanges();

    const button = screen.getByTestId('delete-button');

    expect(button.getAttribute('ng-reflect-disabled')).toEqual('false');
    fireEvent.click(button);
    expect(mockDeletionService.delete.mock.calls).toHaveLength(1);
  });
});
