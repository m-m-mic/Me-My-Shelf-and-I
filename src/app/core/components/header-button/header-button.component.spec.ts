import { HeaderButtonComponent } from './header-button.component';
import '@testing-library/jest-dom';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { fireEvent, render } from '@testing-library/angular';

const mockStore = {
  dispatch: jest.fn(),
};

const menuItems: MenuItem[] = [
  {
    label: 'Options',
    routerLink: '/options',
  },
  {
    label: 'Sign Out',
    command: () => {
      mockStore.dispatch();
    },
  },
];

describe('HeaderButtonComponent', () => {
  async function renderComponent() {
    return render(HeaderButtonComponent, {
      componentInputs: {
        account: 'TestAccount',
        menuItems: menuItems,
      },
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        provideNoopAnimations(),
      ],
      childComponentOverrides: [
        {
          component: HeaderButtonComponent,
          providers: [{ provide: Store, useValue: mockStore }],
        },
      ],
    });
  }

  it('should display account name', async () => {
    const screen = await renderComponent();

    expect(screen.getByText('TestAccount')).toBeVisible();
  });

  it('should display menu items', async () => {
    const screen = await renderComponent();

    const button = screen.getByTestId('account-button');
    fireEvent.click(button);

    expect(screen.getByText('Options')).toBeVisible();
    expect(screen.getByText('Sign Out')).toBeVisible();
  });

  it('should sign out user', async () => {
    const screen = await renderComponent();

    const button = screen.getByTestId('account-button');
    fireEvent.click(button);

    screen.debug(screen.getAllByRole('menuitem')[1]);

    // This is a very specific, nested link without a testId or role in a PrimeNG component
    // So far I have found no better way of accessing it, might break by upgrading the PrimeNG package
    fireEvent.click(
      screen.debugElement.queryAll(By.css('.p-menuitem-link'))[1].nativeElement,
    );

    expect(mockStore.dispatch.mock.calls.length).toEqual(1);
  });
});
