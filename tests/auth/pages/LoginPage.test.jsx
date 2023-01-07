import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth/authSlice";
import { notAuthState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockOnSignInWithEmailAndPassword = jest.fn();

jest.mock("../../../src/store/auth/authThunks", () => ({
  onGoogleSignIn: () => mockStartGoogleSignIn,
  onSignInWithEmailAndPassword: (email, password) => () =>
    mockOnSignInWithEmailAndPassword(email, password),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthState,
  },
});

describe("Tests for LoginPage", () => {
  beforeEach(() => jest.clearAllMocks());

  test("should render the component correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  test("[LoginPage - Google sign in button] - should call onGoogleSignIn when the button is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText("google-btn");
    fireEvent.click(googleBtn);

    expect(mockStartGoogleSignIn).toHaveBeenCalledTimes(1);
  });

  test("[LoginPage - Submit form] - should call onSignInWithEmailAndPassword when the form is submit", () => {
    const email = "test@test.com";
    const password = "12345670";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailField, { target: { name: "email", value: email } });

    const passwordField = screen.getByTestId("password");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });

    const form = screen.getByLabelText("login-form");
    fireEvent.submit(form);

    expect(mockOnSignInWithEmailAndPassword).toHaveBeenCalledWith(
      email,
      password
    );
  });
});
