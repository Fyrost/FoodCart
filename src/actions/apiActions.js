import Axios from "axios";
import * as API from "../constants/API";

export const setAuthorization = token => {
  Axios.defaults.headers.common["Authorization"] = token;
};

export const logoutUser = () => {
  return Axios({
    url: API.LOGOUT,
    method: "get"
  });
};

export const loginUser = ({ email, password }) => {
  return Axios({
    url: API.LOGIN,
    method: "post",
    data: {
      login_email: email,
      login_password: password
    }
  });
};

export const resendVerify = token => {
  return Axios({
    url: API.USER_VERIFY,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const sendForgotPassword = email => {
  return Axios({
    url: API.FORGOT_PASSWORD_CREATE,
    method: "post",
    data: {
      forgot_email: email
    }
  });
};

export const verifyForgotPassword = token => {
  return Axios({
    url: API.FORGOT_PASSWORD_FIND(token),
    method: "get"
  });
};

export const resetForgotPassword = ({
  password,
  passwordConfirm,
  email,
  token
}) => {
  return Axios({
    url: API.FORGOT_PASSWORD_RESET,
    method: "post",
    data: {
      forgot_password: password,
      forgot_password_confirm: passwordConfirm,
      forgot_email: email,
      forgot_token: token
    }
  });
};

export const registerCustomer = ({
  firstName,
  middleName,
  lastName,
  contact,
  address,
  email,
  password,
  passwordConfirm
}) => {
  return Axios({
    url: API.REGISTER_CUSTOMER,
    method: "post",
    data: {
      reg_fname: firstName,
      reg_mname: middleName,
      reg_lname: lastName,
      reg_contact_number: contact,
      reg_address: address,
      reg_email: email,
      reg_password: password,
      reg_password_confirm: passwordConfirm
    }
  });
};

export const registerPartner = (
  {
    restoName,
    address,
    firstName,
    middleName,
    lastName,
    contact,
    email,
    permit1,
    permit2,
    permit3
  },
  setState
) => {
  let data = new FormData();
  data.append("reg_restaurant_name", restoName);
  data.append("reg_address", address);
  data.append("reg_fname", firstName);
  data.append("reg_mname", middleName);
  data.append("reg_lname", lastName);
  data.append("reg_contact_number", contact);
  data.append("reg_email", email);
  data.append("reg_permit_1", imageType(permit1));
  if (permit2) data.append("reg_permit_2", imageType(permit2));
  if (permit3) data.append("reg_permit_3", imageType(permit3));

  return Axios({
    url: API.REGISTER_PARTNER,
    method: "post",
    data,
    onUploadProgress: progressEvent => {
      setState({
        progress:
          Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          ).toString() + "%"
      });
    }
  });
};

export const getMenuList = query => {
  return Axios({
    url: API.OWNER_MENU_SEARCH(query),
    method: "get"
  });
};

export const getMenuDetail = id => {
  return Axios({
    url: API.OWNER_MENU_SELECT(id),
    method: "get"
  });
};

export const getMenuPicker = () => {
  return Axios({
    url: API.OWNER_MENU_PICKER,
    method: "get"
  });
};

export const getMenuEdit = id => {
  return Axios({
    url: API.OWNER_MENU_EDIT(id),
    method: "get"
  });
};

export const deleteMenu = id => {
  return Axios({
    url: API.OWNER_MENU_SELECT(id),
    method: "delete"
  });
};

export const postMenu = (
  { name, description, price, cookTime, category, tags, picture, id },
  setState
) => {
  let data = new FormData();
  let stringTag = tags.toString();

  if (picture) data.append("menu_image", imageType(picture));
  data.append("menu_name", name);
  data.append("menu_description", description);
  data.append("menu_price", price);
  data.append("menu_cooking_time", cookTime);
  data.append("menu_category", category);
  data.append("menu_tag", stringTag);
  return Axios({
    url: id ? API.OWNER_MENU_SELECT(id) : API.OWNER_MENU,
    method: "post",
    data,
    onUploadProgress: progressEvent => {
      setState({
        progress:
          Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          ).toString() + "%"
      });
    }
  });
};

export const getCategoryList = () => {
  return Axios({
    url: API.OWNER_CATEGORY,
    method: "get"
  });
};

export const getDeletedCategoryList = () => {
  return Axios({
    url: API.OWNER_CATEGORY_DELETED,
    method: "get"
  });
};
export const deleteCategory = id => {
  return Axios({
    url: API.OWNER_CATEGORY_SELECT(id),
    method: "delete"
  });
};

export const postCategory = ({ category, id }) => {
  return Axios({
    url: id ? API.OWNER_CATEGORY_SELECT(id) : API.OWNER_CATEGORY,
    method: "post",
    data: {
      category_name: category
    }
  });
};

export const restoreCategory = id => {
  return Axios({
    url: API.OWNER_CATEGORY_RESTORE(id),
    method: "post"
  });
};

export const postRestoInfo = (
  { flatRate, eta, openTime, closeTime, picture },
  setState
) => {
  let data = new FormData();
  if (picture) data.append("image_name", imageType(picture));
  data.append("flat_rate", flatRate);
  data.append("eta", eta);
  data.append("open_time", openTime);
  data.append("close_time", closeTime);
  return Axios({
    url: API.OWNER_RESTO_INFO,
    method: "post",
    data,
    onUploadProgress: progressEvent => {
      setState({
        progress:
          Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          ).toString() + "%"
      });
    }
  });
};

export const getOwnerOrder = () => {
  return Axios({
    url: API.OWNER_ORDER,
    method: "get"
  });
};

export const getOwnerOrderDetail = id => {
  return Axios({
    url: API.OWNER_ORDER_SELECT(id),
    method: "get"
  });
};

export const acceptOwnerOrder = id => {
  return Axios({
    url: API.OWNER_ORDER_ACCEPT(id),
    method: "get"
  });
};

export const rejectOwnerOrder = id => {
  return Axios({
    url: API.OWNER_ORDER_REJECT(id),
    method: "get"
  });
};

export const deliverOwnerOrder = id => {
  return Axios({
    url: API.OWNER_ORDER_DELIVER(id),
    method: "get"
  });
};

export const cancelOwnerOrder = id => {
  return Axios({
    url: API.OWNER_ORDER_CANCEL(id),
    method: "get"
  });
};

export const completeOwnerOrder = id => {
  return Axios({
    url: API.OWNER_ORDER_COMPLETE(id),
    method: "get"
  });
};

export const getOwnerOrderTotal = () => {
  return Axios({
    url: API.OWNER_ORDER_TOTAL,
    method: "get"
  });
};

export const getOwnerOrderSales = () => {
  return Axios({
    url: API.OWNER_ORDER_SALES,
    method: "get"
  });
};

export const getOwnerSalesMenu = search => {
  return Axios({
    url: API.OWNER_SALES_MENU(search),
    method: "get"
  });
};

export const getOwnerReportList = () => {
  return Axios({
    url: API.OWNER_REPORT,
    method: "get"
  });
};

export const getOwnerReportDetail = code => {
  return Axios({
    url: API.OWNER_REPORT_SELECT(code),
    method: "get"
  });
};

export const postOwnerReport = ({
  reason,
  orderId,
  customerId,
  reportImg1,
  reportImg2,
  reportImg3
}) => {
  let data = new FormData();
  data.append("report_reason", reason);
  data.append("sub_order_id", orderId);
  data.append("customer_id", customerId);
  if (reportImg1) data.append("report_proof1", imageType(reportImg1));
  if (reportImg2) data.append("report_proof2", imageType(reportImg2));
  if (reportImg3) data.append("report_proof3", imageType(reportImg3));

  return Axios({
    url: API.OWNER_REPORT,
    method: "post",
    data
  });
};

export const getOwnerLogList = () => {
  return Axios({
    url: API.OWNER_LOGS,
    method: "get"
  });
};

export const getAdminTagList = filter => {
  return Axios({
    url: API.ADMIN_TAG_FILTER(filter),
    method: "get"
  });
};

export const approveTag = id => {
  return Axios({
    url: API.ADMIN_TAG_APPROVE(id),
    method: "get"
  });
};

export const rejectTag = id => {
  return Axios({
    url: API.ADMIN_TAG_REJECT(id),
    method: "get"
  });
};

export const getAdminApplyList = filter => {
  return Axios({
    url: API.ADMIN_PARTNERSHIP_FILTER(filter),
    method: "get"
  });
};

export const getApplyDetail = id => {
  return Axios({
    url: API.ADMIN_PARTNERSHIP_SELECT(id),
    method: "get"
  });
};

export const approveApply = id => {
  return Axios({
    url: API.ADMIN_PARTNERSHIP_APPROVE(id),
    method: "get"
  });
};

export const rejectApply = id => {
  return Axios({
    url: API.ADMIN_PARTNERSHIP_REJECT(id),
    method: "get"
  });
};

export const getAdminResto = () => {
  return Axios({
    url: API.ADMIN_RESTAURANT,
    method: "get"
  });
};

export const getAdminRestoDetail = id => {
  return Axios({
    url: API.ADMIN_RESTAURANT_SELECT(id),
    method: "get"
  });
};

export const getAdminMenu = () => {
  return Axios({
    url: API.ADMIN_MENU,
    method: "get"
  });
};

export const getAdminMenuDetail = id => {
  return Axios({
    url: API.ADMIN_MENU_SELECT(id),
    method: "get"
  });
};

export const getAdminCustomer = () => {
  return Axios({
    url: API.ADMIN_CUSTOMER,
    method: "get"
  });
};

export const getAdminCustomerDetail = id => {
  return Axios({
    url: API.ADMIN_CUSTOMER_SELECT(id),
    method: "get"
  });
};

export const getAdminRestoSales = search => {
  return Axios({
    url: API.ADMIN_RESTO_SALES_SEARCH(search),
    method: "get"
  });
};

export const getAdminMenuSales = search => {
  return Axios({
    url: API.ADMIN_MENU_SALES_SEARCH(search),
    method: "get"
  });
};

export const getAdminReportList = () => {
  return Axios({
    url: API.ADMIN_REPORT,
    method: "get"
  });
};

export const getAdminReportDetail = code => {
  return Axios({
    url: API.ADMIN_REPORT_SELECT(code),
    method: "get"
  });
};

export const investigateAdminReport = code => {
  return Axios({
    url: API.ADMIN_REPORT_INVESTIGATE(code),
    method: "get"
  });
};

export const closeAdminReport = (code, comment) => {
  return Axios({
    url: API.ADMIN_REPORT_CLOSE(code),
    method: "post",
    data: {
      report_code: code,
      report_comment: comment
    }
  });
};

export const getLogList = () => {
  return Axios({
    url: API.ADMIN_LOGS,
    method: "get"
  });
};

export const getRestaurantList = () => {
  return Axios({
    url: API.CUSTOMER_RESTAURANT,
    method: "post"
  });
};
export const getRestaurantMenu = slug => {
  return Axios({
    url: API.CUSTOMER_RESTAURANT_SELECT(slug),
    method: "get"
  });
};

export const getFavoriteResto = () => {
  return Axios({
    url: API.CUSTOMER_RESTAURANT_FAVORITE,
    method: "get"
  });
};

export const postFavoriteResto = slug => {
  return Axios({
    url: API.CUSTOMER_RESTAURANT_FAVORITE,
    method: "post",
    data: { restaurant_slug: slug }
  });
};

export const deleteFavoriteResto = slug => {
  return Axios({
    url: API.CUSTOMER_RESTAURANT_FAVORITE_SELECT(slug),
    method: "delete"
  });
};

export const getRatingResto = () => {
  return Axios({
    url: API.CUSTOMER_RESTAURANT_RATING,
    method: "get"
  });
};

export const postRatingResto = (slug, rating) => {
  return Axios({
    url: API.CUSTOMER_RESTAURANT_RATING,
    method: "post",
    data: {
      restaurant_slug: slug,
      rating
    }
  });
};

export const getCart = () => {
  return Axios({
    url: API.CUSTOMER_CART,
    method: "get"
  });
};

export const postCart = ({ quantity, menuSlug }) => {
  return Axios({
    url: API.CUSTOMER_CART,
    method: "post",
    data: {
      quantity,
      menu_slug: menuSlug
    }
  });
};

export const updateCart = ({ quantity, cartId }) => {
  return Axios({
    url: API.CUSTOMER_CART_SELECT(cartId),
    method: "post",
    data: {
      quantity,
      cart_id: cartId
    }
  });
};

export const deleteCart = ({ cartId }) => {
  return Axios({
    url: API.CUSTOMER_CART_SELECT(cartId),
    method: "delete"
  });
};

export const destroyCart = () => {
  return Axios({
    url: API.CUSTOMER_CART_EMPTY,
    method: "get"
  });
};

export const getCheckout = () => {
  return Axios({
    url: API.CHECKOUT,
    method: "get"
  });
};

export const postCheckout = change => {
  return Axios({
    url: API.CHECKOUT,
    method: "post",
    data: change
  });
};

export const getOrderHistory = () => {
  return Axios({
    url: API.ORDER_HISTORY,
    method: "get"
  });
};

export const getOrderDetail = code => {
  return Axios({
    url: API.ORDER_SELECT(code),
    method: "get"
  });
};

export const getProfile = accessLevel => {
  return Axios({
    url:
      accessLevel == "3"
        ? API.ADMIN_PROFILE
        : accessLevel == "2"
        ? API.OWNER_PROFILE
        : API.CUSTOMER_PROFILE,
    method: "get"
  });
};

export const postProfile = (
  accessLevel,
  {
    firstName,
    middleName,
    lastName,
    contact,
    address,
    flatRate,
    eta,
    openTime,
    closeTime,
    picture
  },
  setState
) => {
  let data = new FormData();

  if (firstName) {
    data.append("reg_fname", firstName);
    data.append("fname", firstName);
  }
  if (middleName) {
    data.append("reg_mname", middleName);
    data.append("mname", middleName);
  }
  if (lastName) {
    data.append("reg_lname", lastName);
    data.append("lname", lastName);
  }
  if (address) {
    data.append("address", address);
    data.append("reg_address", address);
  }
  if (contact) {
    data.append("contact_number", contact);
    data.append("reg_contact_number", contact);
  }
  if (flatRate) data.append("flat_rate", flatRate);
  if (eta) data.append("eta", eta);
  if (openTime) data.append("open_time", openTime);
  if (closeTime) data.append("close_time", closeTime);
  if (picture) data.append("image_name", imageType(picture));

  return Axios({
    url:
      accessLevel == "3"
        ? API.ADMIN_PROFILE
        : accessLevel == "2"
        ? API.OWNER_PROFILE
        : API.CUSTOMER_PROFILE,
    method: "post",
    data
  });
};

export const updateUserPassword = ({ password, passwordConfirm }) => {
  return Axios({
    url: API.USER_PASSWORD,
    method: "post",
    data: {
      user_password: password,
      user_password1: passwordConfirm
    }
  });
};

const imageType = url => {
  let uriParts = url.split(".");
  let fileType = uriParts[uriParts.length - 1];
  return {
    uri: url,
    name: "temp." + fileType,
    type: "image/" + fileType
  };
};

export const errorHandler = error => {
  console.log(error.config);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of
    switch (error.response.status) {
      case 401:
      case 422:
      case 429:
        return error.response.data.message;
      case 500:
        return "internal server error";
      default:
        return `error ${error.response.status}`;
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    }
  } else if (error.request) {
    console.log(error.request);
    return "No Response";
  } else {
    return `Error ${error.message}`;
  }
};
