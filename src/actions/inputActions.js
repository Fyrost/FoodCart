import {
  //FORMAT CHECK
  REGEX_EMAIL,
  REGEX_EMAIL_VALID,
  REGEX_PASSWORD,
  REGEX_PASSWORD_MIN,
  REGEX_PASSWORD_MAX,
  REGEX_NAME_MIN,
  REGEX_NUMBER_ONLY,
  REGEX_CONTACT_LENGTH,
  REGEX_MENU_NAME_MIN,
  REGEX_MENU_NAME_MAX,
  REGEX_MENU_PRICE_MAX,
  REGEX_MENU_COOKTIME_MAX,
  REGEX_CATEGORY_MIN,
  REGEX_CATEGORY_MAX,
  REGEX_RESTO_FLAT_RATE_MAX,
  REGEX_RESTO_ETA_MAX,
  //ERROR MESSAGES
  MSG_EMAIL_EMPTY,
  MSG_EMAIL_INVALID_FORMAT,
  MSG_EMAIL_INVALID_EMAIL,
  MSG_PASSWORD_EMPTY,
  MSG_PASSWORD_INVALID_FORMAT,
  MSG_PASSWORD_MIN,
  MSG_PASSWORD_MAX,
  MSG_CONFIRM_PASSWORD_EMPTY,
  MSG_CONFIRM_PASSWORD_MATCH,
  MSG_FIRST_NAME_EMPTY,
  MSG_FIRST_NAME_MIN,
  MSG_FIRST_NAME_MAX,
  MSG_MIDDLE_NAME_EMPTY,
  MSG_MIDDLE_NAME_MIN,
  MSG_MIDDLE_NAME_MAX,
  MSG_LAST_NAME_EMPTY,
  MSG_LAST_NAME_MIN,
  MSG_LAST_NAME_MAX,
  REGEX_NAME_MAX,
  MSG_CONTACT_EMPTY,
  MSG_CONTACT_INVALID_FORMAT,
  MSG_CONTACT_LENGTH,
  MSG_ADDRESS_EMPTY,
  MSG_MENU_NAME_EMPTY,
  MSG_MENU_NAME_MIN,
  MSG_MENU_NAME_MAX,
  MSG_MENU_PRICE_EMPTY,
  MSG_MENU_PRICE_FORMAT,
  MSG_MENU_PRICE_MAX,
  MSG_MENU_PRICE_ZERO,
  MSG_MENU_COOKTIME_EMPTY,
  MSG_MENU_COOKTIME_FORMAT,
  MSG_MENU_COOKTIME_MAX,
  MSG_MENU_COOKTIME_ZERO,
  MSG_CATEGORY_EMPTY,
  MSG_CATEGORY_MIN,
  MSG_CATEGORY_MAX,
  MSG_RESTO_NAME_EMPTY,
  MSG_RESTO_NAME_MIN,
  MSG_RESTO_NAME_MAX,
  MSG_RESTO_FLAT_RATE_EMPTY,
  MSG_MENU_FLAT_RATE_FORMAT,
  MSG_RESTO_FLAT_RATE_MAX,
  MSG_RESTO_ETA_EMPTY,
  MSG_MENU_ETA_FORMAT,
  MSG_RESTO_ETA_MAX,
  MSG_RESTO_IMAGE_EMPTY
} from "../constants/validator";

export const contains = (data, query) => {
  const { name } = data;
  if (name.includes(query)) {
    return true;
  }
  return false;
};

export const inputHandler = (input, type) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    middleName,
    lastName,
    contact,
    address,
    menuName,
    menuPrice,
    cookTime,
    restoName,
    flatRate,
    eta,
    image
  } = input;
  switch (type) {
    case "email":
      return emailValidate(email.text);
    case "password":
      return passwordValidate(password.text);
    case "confirmPassword":
      return passwordConfirmValidate(password.text, confirmPassword.text);
    case "firstName":
      return firstNameValidate(firstName.text);
    case "middleName":
      return middleNameValidate(middleName.text);
    case "lastName":
      return lastNameValidate(lastName.text);
    case "contact":
      return contactValidate(contact.text);
    case "address":
      return addressValidate(address.text);

    case "menuName":
      return menuNameValidate(menuName.text);
    case "menuPrice":
      return menuPriceValidate(menuPrice.text);
    case "cookTime":
      return cookTimeValidate(cookTime.text);

    case "category":
      return categoryValidate(category.text);

    case "restoName":
      return restoNameValidate(restoName.text);
    case "flatRate":
      return flatRateValidate(flatRate.text);
    case "eta":
      return etaValidate(eta.text);
    case "image":
      return imageValidate(image.uri);
    default:
      return alert("Invalid Input");
  }
};

const emailValidate = text => {
  if (!text) return { text, error: MSG_EMAIL_EMPTY };
  else if (!REGEX_EMAIL.test(text))
    return { text, error: MSG_EMAIL_INVALID_FORMAT };
  else if (!REGEX_EMAIL_VALID.test(text))
    return { text, error: MSG_EMAIL_INVALID_EMAIL };
  else return { text, error: "" };
};

const passwordValidate = text => {
  if (!text) return { text, error: MSG_PASSWORD_EMPTY };
  else if (!REGEX_PASSWORD.test(text))
    return { text, error: MSG_PASSWORD_INVALID_FORMAT };
  else if (!REGEX_PASSWORD_MIN.test(text))
    return { text, error: MSG_PASSWORD_MIN };
  else if (!REGEX_PASSWORD_MAX.test(text))
    return { text, error: MSG_PASSWORD_MAX };
  else return { text, error: "" };
};

const passwordConfirmValidate = (password, confirmPassword) => {
  if (!confirmPassword)
    return { text: confirmPassword, error: MSG_CONFIRM_PASSWORD_EMPTY };
  else if (!(password === confirmPassword))
    return { text: confirmPassword, error: MSG_CONFIRM_PASSWORD_MATCH };
  else return { text: confirmPassword, error: "" };
};

const firstNameValidate = text => {
  if (!text) return { text, error: MSG_FIRST_NAME_EMPTY };
  else if (!REGEX_NAME_MIN.test(text))
    return { text, error: MSG_FIRST_NAME_MIN };
  else if (!REGEX_NAME_MAX.test(text))
    return { text, error: MSG_FIRST_NAME_MAX };
  else return { text, error: "" };
};

const middleNameValidate = text => {
  if (!text) return { text, error: MSG_MIDDLE_NAME_EMPTY };
  else if (!REGEX_NAME_MIN.test(text))
    return { text, error: MSG_MIDDLE_NAME_MIN };
  else if (!REGEX_NAME_MAX.test(text))
    return { text, error: MSG_MIDDLE_NAME_MAX };
  else return { text, error: "" };
};

const lastNameValidate = text => {
  if (!text) return { text, error: MSG_LAST_NAME_EMPTY };
  else if (!REGEX_NAME_MIN.test(text))
    return { text, error: MSG_LAST_NAME_MIN };
  else if (!REGEX_NAME_MAX.test(text))
    return { text, error: MSG_LAST_NAME_MAX };
  else return { text, error: "" };
};

const contactValidate = text => {
  if (!text) return { text, error: MSG_CONTACT_EMPTY };
  else if (!REGEX_NUMBER_ONLY.test(text))
    return { text, error: MSG_CONTACT_INVALID_FORMAT };
  else if (!REGEX_CONTACT_LENGTH.test(text))
    return { text, error: MSG_CONTACT_LENGTH };
  else return { text, error: "" };
};

const addressValidate = text => {
  if (!text) return { text, error: MSG_ADDRESS_EMPTY };
  else return { text, error: "" };
};

const menuNameValidate = text => {
  if (!text) return { text, error: MSG_MENU_NAME_EMPTY };
  else if (!REGEX_MENU_NAME_MIN.test(text))
    return { text, error: MSG_MENU_NAME_MIN };
  else if (!REGEX_MENU_NAME_MAX.test(text))
    return { text, error: MSG_MENU_NAME_MAX };
  else return { text, error: "" };
};

const menuPriceValidate = text => {
  if (!text) return { text, error: MSG_MENU_PRICE_EMPTY };
  else if (!REGEX_NUMBER_ONLY.test(text))
    return { text, error: MSG_MENU_PRICE_FORMAT };
  else if (!REGEX_MENU_PRICE_MAX.test(text))
    return { text, error: MSG_MENU_PRICE_MAX };
  else if (text === "0") return { text, error: MSG_MENU_PRICE_ZERO };
  else return { text, error: "" };
};

const cookTimeValidate = text => {
  if (!text) return { text, error: MSG_MENU_COOKTIME_EMPTY };
  else if (!REGEX_NUMBER_ONLY.test(text))
    return { text, error: MSG_MENU_COOKTIME_FORMAT };
  else if (!REGEX_MENU_COOKTIME_MAX.test(text))
    return { text, error: MSG_MENU_COOKTIME_MAX };
  else if (text === "0") return { text, error: MSG_MENU_COOKTIME_ZERO };
  else return { text, error: "" };
};

const categoryValidate = text => {
  if (!text) return { text, error: MSG_CATEGORY_EMPTY };
  else if (!REGEX_CATEGORY_MIN.test(text))
    return { text, error: MSG_CATEGORY_MIN };
  else if (!REGEX_CATEGORY_MAX.test(text))
    return { text, error: MSG_CATEGORY_MAX };
  else return { text, error: "" };
};

const restoNameValidate = text => {
  if (!text) return { text, error: MSG_RESTO_NAME_EMPTY };
  else if (!REGEX_NAME_MIN.test(text))
    return { text, error: MSG_RESTO_NAME_MIN };
  else if (!REGEX_NAME_MAX.test(text))
    return { text, error: MSG_RESTO_NAME_MAX };
  else return { text, error: "" };
};

const flatRateValidate = text => {
  if (!text) return { text, error: MSG_RESTO_FLAT_RATE_EMPTY };
  else if (!REGEX_NUMBER_ONLY.test(text))
    return { text, error: MSG_MENU_FLAT_RATE_FORMAT };
  else if (!REGEX_RESTO_FLAT_RATE_MAX.test(text))
    return { text, error: MSG_RESTO_FLAT_RATE_MAX };
  else return { text, error: "" };
};

const etaValidate = text => {
  if (!text) return { text, error: MSG_RESTO_ETA_EMPTY };
  else if (!REGEX_NUMBER_ONLY.test(text))
    return { text, error: MSG_MENU_ETA_FORMAT };
  else if (!REGEX_RESTO_ETA_MAX.test(text))
    return { text, error: MSG_RESTO_ETA_MAX };
  else return { text, error: "" };
};

const imageValidate = uri => {
  if (!uri) return { uri, error: MSG_RESTO_IMAGE_EMPTY };
  else return { uri, error: "" };
};
