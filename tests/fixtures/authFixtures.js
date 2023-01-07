export const initialState = {
  status: "checking",
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
  errorMessage: null,
};

export const authState = {
  status: "authenticated",
  uid: "abc123xyz",
  email: "mock.email@email.com",
  displayName: "Mock name",
  photoUrl: null,
  errorMessage: null,
};

export const notAuthState = {
  status: "not-authenticated",
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
  errorMessage: null,
};

export const demoUser = {
  uid: "abc123xyz",
  displayName: "Demo user",
  email: "demo@demo.com",
  photoUrl: "https://demo.jpg",
};
