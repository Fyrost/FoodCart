const MIN_PASSWORD = 8;
const MAX_PASSWORD = 21;

const MIN_NAME = 3;
const MAX_NAME = 30;

const MIN_CATEGORY = 3;
const MAX_CATEGORY = 20;

const MIN_MENU_NAME = 6;
const MAX_MENU_NAME = 50;

const MIN_MENU_PRICE = 1;
const MAX_MENU_PRICE = 4;

const MIN_MENU_COOKTIME = 1;
const MAX_MENU_COOKTIME = 3;

const MIN_RESTO_FLAT_RATE = 1;
const MAX_RESTO_FLAT_RATE = 3;

const MIN_RESTO_ETA = 1;
const MAX_RESTO_ETA = 3;
//LENGTH either 7 or 11
const LENGTH_CONTACT = [7, 11];

//FUNCTION

export const REGEX_MIN = min => new RegExp(`^.{${min},}$`);
export const REGEX_MAX = (min, max) => new RegExp(`^.{${min},${max}}$`);
export const REGEX_MULTI_LENGTH = length =>
  new RegExp(`^(?:.{${length.join("}|.{")}})$`);

//FORMAT CHECK

////ACCOUNT
export const REGEX_EMAIL = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
export const REGEX_EMAIL_VALID = /^.+@(yahoo|ymail|gmail)+\.([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const REGEX_PASSWORD = /^(?=.*[A-Z])(?=.*[!@#$&])(?=.*[0-9])(?=.*[a-z])/;
export const REGEX_PASSWORD_MIN = REGEX_MIN(MIN_PASSWORD);
export const REGEX_PASSWORD_MAX = REGEX_MAX(MIN_PASSWORD, MAX_PASSWORD);

export const REGEX_NAME_MIN = REGEX_MIN(MIN_NAME);
export const REGEX_NAME_MAX = REGEX_MAX(MIN_NAME, MAX_NAME);

export const REGEX_NUMBER_ONLY = /^[0-9]*$/;
export const REGEX_CONTACT_LENGTH = REGEX_MULTI_LENGTH(LENGTH_CONTACT);

////MENU
export const REGEX_MENU_NAME_MIN = REGEX_MIN(MIN_MENU_NAME);
export const REGEX_MENU_NAME_MAX = REGEX_MAX(MIN_MENU_NAME, MAX_MENU_NAME);

export const REGEX_MENU_PRICE_MAX = REGEX_MAX(MIN_MENU_PRICE, MAX_MENU_PRICE);

export const REGEX_MENU_COOKTIME_MAX = REGEX_MAX(
  MIN_MENU_COOKTIME,
  MAX_MENU_COOKTIME
);

////CATEGORY
export const REGEX_CATEGORY_MIN = REGEX_MIN(MIN_CATEGORY);
export const REGEX_CATEGORY_MAX = REGEX_MAX(MIN_CATEGORY, MAX_CATEGORY);

//RESTO
export const REGEX_RESTO_FLAT_RATE_MAX = REGEX_MAX(
  MIN_RESTO_FLAT_RATE,
  MAX_RESTO_FLAT_RATE
);

export const REGEX_RESTO_ETA_MAX = REGEX_MAX(MIN_RESTO_ETA, MAX_RESTO_ETA);

//ERROR MESSAGES

////ACCOUNT

//////EMAIL
export const MSG_EMAIL_EMPTY = `Please enter Email`;
export const MSG_EMAIL_INVALID_FORMAT = `Email is invalid`;
export const MSG_EMAIL_INVALID_EMAIL = `Email is Must be a Google or Yahoo email`;
//////PASSWORD
export const MSG_PASSWORD_EMPTY = `Please enter Password`;
export const MSG_PASSWORD_INVALID_FORMAT = `Password must contain atleast 1 digit, lower case letter, uppercase letter and symbol`;
export const MSG_PASSWORD_MIN = `Password is too short (min: ${MIN_PASSWORD})`;
export const MSG_PASSWORD_MAX = `Password is too long (max: ${MAX_PASSWORD})`;
//////CONFIRM PASSWORD
export const MSG_CONFIRM_PASSWORD_EMPTY = `Please confirm Password`;
export const MSG_CONFIRM_PASSWORD_MATCH = `Password did not match`;
//////FIRST NAME
export const MSG_FIRST_NAME_EMPTY = `Please enter First Name`;
export const MSG_FIRST_NAME_MIN = `First Name is too short (min: ${MIN_NAME})`;
export const MSG_FIRST_NAME_MAX = `First Name is too long (max: ${MAX_NAME})`;
//////MIDDLE NAM`
export const MSG_MIDDLE_NAME_EMPTY = `Please enter Middle Name`;
export const MSG_MIDDLE_NAME_MIN = `Middle Name is too short (min: ${MIN_NAME})`;
export const MSG_MIDDLE_NAME_MAX = `Middle Name is too long (max: ${MAX_NAME})`;
//////LAST NAME
export const MSG_LAST_NAME_EMPTY = `Please enter Last Name`;
export const MSG_LAST_NAME_MIN = `Last Name is too short (min: ${MIN_NAME})`;
export const MSG_LAST_NAME_MAX = `Last Name is too long (max: ${MAX_NAME})`;
//////CONSTACT NUMBER
export const MSG_CONTACT_EMPTY = `Please enter Contact Number`;
export const MSG_CONTACT_INVALID_FORMAT = `Contact Number is invalid`;
export const MSG_CONTACT_LENGTH = `Please use a landline or mobile number`;
export const MSG_ADDRESS_EMPTY = `Please enter Address`;

////MENU

//////MENU NAME
export const MSG_MENU_NAME_EMPTY = `Please enter Menu Name`;
export const MSG_MENU_NAME_MIN = `Menu Name is too short (min: ${MIN_MENU_NAME})`;
export const MSG_MENU_NAME_MAX = `Menu Name is too long (max: ${MAX_MENU_NAME})`;
//////MENU PRICE
export const MSG_MENU_PRICE_EMPTY = `Please enter Menu Price`;
export const MSG_MENU_PRICE_FORMAT = `Price can be number only`;
export const MSG_MENU_PRICE_MAX = `Price range is only 1 - 9999`;
export const MSG_MENU_PRICE_ZERO = `Price cannot be zero`;
//////MENU COOKING TIME
export const MSG_MENU_COOKTIME_EMPTY = `Please enter Cooking Time`;
export const MSG_MENU_COOKTIME_FORMAT = `Cooking Time can be number only`;
export const MSG_MENU_COOKTIME_MAX = `Cooking Time range is only 1 - 999`;
export const MSG_MENU_COOKTIME_ZERO = `Cooking Time cannot be zero`;
//////MENU TAGS
export const MSG_MENU_TAG = `Menu can only have up to 5 tags`;

//CATEGORY
export const MSG_CATEGORY_EMPTY = `Please enter Category Name`;
export const MSG_CATEGORY_MIN = `Category Name is too short (min: ${MIN_CATEGORY})`;
export const MSG_CATEGORY_MAX = `Category Name is too long (max: ${MAX_CATEGORY})`;

export const MSG_NO_NETWORK = `Network Error`;

//RESTO

////RESTO NAME
export const MSG_RESTO_NAME_EMPTY = `Please enter Restaurant Name`;
export const MSG_RESTO_NAME_MIN = `Restaurant Name is too short (min: ${MIN_NAME})`;
export const MSG_RESTO_NAME_MAX = `Restaurant Name is too long (max: ${MAX_NAME})`;
////RESTO FLAT RATE
export const MSG_RESTO_FLAT_RATE_EMPTY = `Please enter Delivery Charge`;
export const MSG_MENU_FLAT_RATE_FORMAT = `Delivery Charge can be number only`;
export const MSG_RESTO_FLAT_RATE_MAX = `Delivery Charge range is only 1 - 999`;
////RESTO ETA
export const MSG_RESTO_ETA_EMPTY = `Please enter Delivery Time`;
export const MSG_MENU_ETA_FORMAT = `Delivery Time can be number only`;
export const MSG_RESTO_ETA_MAX = `Delivery Time range is only 1 - 999`;
////RESTO IMAGE
export const MSG_RESTO_IMAGE_EMPTY = `Please choose a Restaurant Image`;
