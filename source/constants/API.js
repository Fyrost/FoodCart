export const BASE_URL = `http://pinoyfoodcart.com/api/`;

export const LOGIN = `login`;
export const LOGOUT = `logout`;

export const USER_VERIFY = `email/resend`;

export const FORGOT_PASSWORD_CREATE = `password/create`;
export const FORGOT_PASSWORD_FIND = token => `password/find/${token}`;
export const FORGOT_PASSWORD_RESET = `password/reset`;

export const REGISTER_CUSTOMER = `register/customer`;
export const REGISTER_PARTNER = `partner`; ///change

export const OWNER_MENU = `owner/menu`;
export const OWNER_RESTO_INFO = `owner/info`;
export const OWNER_MENU_SELECT = id => `owner/menu/${id}`;
export const OWNER_MENU_PICKER = `owner/menu/create`;
export const OWNER_MENU_EDIT = id => `owner/menu/${id}/edit`;
export const OWNER_MENU_SEARCH = query => `owner/menu?search=${query}`;
export const OWNER_CATEGORY = `owner/category`;
export const OWNER_CATEGORY_SELECT = id => `owner/category/${id}`;
export const OWNER_CATEGORY_DELETED = `owner/get/deletedCategory`;
export const OWNER_CATEGORY_RESTORE = id => `owner/category/${id}/restore`;
export const OWNER_ORDER = `owner/order`;
export const OWNER_ORDER_SELECT = id => `owner/order/${id}`;
export const OWNER_ORDER_ACCEPT = id => `owner/order/${id}/accept`;
export const OWNER_ORDER_REJECT = id => `owner/order/${id}/reject`;
export const OWNER_ORDER_DELIVER = id => `owner/order/${id}/deliver`;
export const OWNER_ORDER_CANCEL = id => `owner/order/${id}/cancel`;
export const OWNER_ORDER_COMPLETE = id => `owner/order/${id}/complete`;
export const OWNER_ORDER_TOTAL = `owner/chart/order/total`;
export const OWNER_ORDER_SALES = `owner/chart/order/sales`;
export const OWNER_SALES_MENU = query => `owner/sales/menu?search=${query}`
export const OWNER_REPORT = `owner/report`
export const OWNER_REPORT_SELECT = code => `owner/report/${code}`
export const OWNER_PROFILE = `owner/profile`;

export const ADMIN_TAG_FILTER = filter => `admin/tag?filter=${filter}`;
export const ADMIN_TAG_APPROVE = id => `admin/tag/${id}/accept`;
export const ADMIN_TAG_REJECT = id => `admin/tag/${id}/reject`;
export const ADMIN_PARTNERSHIP_FILTER = filter =>
  `admin/partnership?filter=${filter}`;
export const ADMIN_PARTNERSHIP_SELECT = id => `admin/partnership/${id}`;
export const ADMIN_PARTNERSHIP_APPROVE = id => `admin/partnership/${id}/accept`;
export const ADMIN_PARTNERSHIP_REJECT = id => `admin/partnership/${id}/reject`;
export const ADMIN_RESTAURANT = `admin/restaurant`;
export const ADMIN_RESTAURANT_SELECT = id => `admin/restaurant/${id}`;
export const ADMIN_MENU = `admin/menu`;
export const ADMIN_MENU_SELECT = id => `admin/menu/${id}`;
export const ADMIN_CUSTOMER = `admin/customer`;
export const ADMIN_CUSTOMER_SELECT = id => `admin/customer/${id}`;
export const ADMIN_RESTO_SALES_SEARCH = query =>
  `admin/sales/restaurant?search=${query}`;
export const ADMIN_MENU_SALES_SEARCH = query =>
  `admin/sales/menu?search=${query}`;
export const ADMIN_REPORT = `admin/report`
export const ADMIN_REPORT_SELECT = code => `admin/report/${code}`
export const ADMIN_REPORT_INVESTIGATE = code => `admin/report/${code}/investigate`
export const ADMIN_REPORT_CLOSE = code => `admin/report/${code}/close`
export const ADMIN_PROFILE = `admin/profile`;

export const CUSTOMER_RESTAURANT = `restaurant`;
export const CUSTOMER_RESTAURANT_SELECT = slug => `restaurant/${slug}`;
export const CUSTOMER_RESTAURANT_FAVORITE = `guest/favorite`;
export const CUSTOMER_RESTAURANT_FAVORITE_SELECT = slug =>
  `guest/favorite/${slug}`;
export const CUSTOMER_RESTAURANT_RATING = `guest/rating`;
export const CUSTOMER_CART = `guest/cart`;
export const CUSTOMER_CART_EMPTY = `guest/cart/empty`;
export const CUSTOMER_CART_SELECT = id => `guest/cart/${id}`;
export const CUSTOMER_PROFILE = `profile`;

export const CHECKOUT = `checkout`;

export const ORDER_HISTORY = `order/history`;
export const ORDER_SELECT = code => `order/${code}`;

export const USER_PASSWORD = `user/update`;
