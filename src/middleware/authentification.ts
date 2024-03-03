export class Authentification {
  public checkoutEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  public checkoutUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;
    return usernameRegex.test(username);
  };

  public checkoutPassword = (password: string): boolean => {
    // Just verify if there is 8 characters
    const passwordRegex = /^.{8,}$/;
    return passwordRegex.test(password);
  };

  public checkoutToken = (token: string): boolean => {
    if (token && token == "briatte") {
      return true;
    }
    return false;
  };
}
