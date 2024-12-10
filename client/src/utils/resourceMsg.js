export default function (messageCode) {
  let message = "";
  switch (messageCode) {
    case "USER_NOT_FOUND":
      message = "User with this email address not found";
      break;
    case "INVALID_PASSWORD":
      message = "Password is not correct, please try again";
      break;
    case "USER_NOT_VERIFIED":
      message =
        "The user's email is not verified. Please check your email box to confirm your address";
      break;
    case "USER_EXISTS":
      message = "User with this email aready exists";
      break;
    case "USER_CREATED":
      message =
        "User has been successfully created. Please check your email box to confirm your address";
      break;
    case "VALIDATION_FAILED":
      message =
        "Email or password is not valid. Please ensure your email is in right format and password is at least 3 characters long";
      break;
    case "SERVER_ERROR":
      message =
        "Application crashed due to unexpected issue. Please contact administrator for further assistance";
      break;
    default:
  }
  return message;
}
