export const BASE_URL = `http://pinoyfoodcart.com/api/`;

export const LOGIN = `login`;
export const LOGOUT = `logout`;

export const USER_VERIFY = `email/resend`;

export const FORGOT_PASSWORD_CREATE = `password/create`;
export const FORGOT_PASSWORD_FIND = token => `password/find/${token}`;
export const FORGOT_PASSWORD_RESET = `password/reset`;

export const REGISTER_CUSTOMER = `register/customer`;
export const REGISTER_PARTNER = `partner`; ///change

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
export const ADMIN_MENU = ({ tag, filter }) =>
  `admin/menu?tag=${tag}&filter=${filter}`;
export const ADMIN_MENU_SELECT = id => `admin/menu/${id}`;
export const ADMIN_CUSTOMER = `admin/customer`;
export const ADMIN_CUSTOMER_SELECT = id => `admin/customer/${id}`;
export const ADMIN_RESTO_SALES_SEARCH = query =>
  `admin/sales/restaurant?search=${query}`;
export const ADMIN_MENU_SALES_SEARCH = query =>
  `admin/sales/menu?search=${query}`;
export const ADMIN_ORDER = status => `admin/order?status=${status}`;
export const ADMIN_ORDER_SELECT = id => `admin/order/${id}`;
export const ADMIN_BLOCK = `admin/ban`;
export const ADMIN_BLOCK_SELECT = id => `admin/ban/${id}`;
export const ADMIN_BLOCK_LIFT = id => `admin/ban/${id}/lift`;
export const ADMIN_REPORT = filter => `admin/report?filter=${filter}`;
export const ADMIN_REPORT_SELECT = code => `admin/report/${code}`;
export const ADMIN_REPORT_INVESTIGATE = code =>
  `admin/report/${code}/investigate`;
export const ADMIN_REPORT_CLOSE = code => `admin/report/${code}/close`;
export const ADMIN_LOGS = `admin/logs`;
export const ADMIN_LOGS_TABLE = `admin/logs/table`;
export const ADMIN_REQUEST = filter => `admin/request?filter=${filter}`;
export const ADMIN_REQUEST_ACCEPT = id => `admin/request/${id}/accept`;
export const ADMIN_REQUEST_REJECT = id => `admin/request/${id}/reject`;
export const ADMIN_USERS = `admin/users`;
export const ADMIN_PROFILE = `admin/profile`;
export const ADMIN_NOTIFICATION_PARTNER = `admin/notification/partnership`;
export const ADMIN_NOTIFICATION_TAGS = `admin/notification/tags`;
export const ADMIN_NOTIFICATION_REPORTS = `admin/notification/reports`;
export const ADMIN_NOTIFICATION_REQUESTS = `admin/notification/requests`;

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
export const OWNER_ORDER = status => `owner/order?status=${status}`;
export const OWNER_ORDER_SELECT = id => `owner/order/${id}`;
export const OWNER_ORDER_ACCEPT = id => `owner/order/${id}/accept`;
export const OWNER_ORDER_REJECT = id => `owner/order/${id}/reject`;
export const OWNER_ORDER_DELIVER = id => `owner/order/${id}/deliver`;
export const OWNER_ORDER_CANCEL = id => `owner/order/${id}/cancel`;
export const OWNER_ORDER_COMPLETE = id => `owner/order/${id}/complete`;
export const OWNER_ORDER_TOTAL = `owner/chart/order/total`;
export const OWNER_ORDER_SALES = `owner/chart/order/sales`;
export const OWNER_SALES_MENU = query => `owner/sales/menu?search=${query}`;
export const OWNER_REPORT = `owner/report`;
export const OWNER_REPORT_SELECT = code => `owner/report/${code}`;
export const OWNER_LOGS = `owner/logs`;
export const OWNER_PROFILE = `owner/profile`;
export const OWNER_NOTIFICATION_ORDERS = `owner/notification/orders`;

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
export const CUSTOMER_NOTIFICATION_CART = `guest/notification/cart`;
export const CUSTOMER_HOME = `home1`;

export const CHECKOUT = `checkout`;

export const ORDER_HISTORY = status => `order/history?status=${status}`;
export const ORDER_SELECT = code => `order/${code}`;
export const ORDER_COMPLETE = subOrderId =>
  `guest/order/${subOrderId}/complete`;

export const USER_PASSWORD = `user/update`;
export const USER_REQUEST = `request`;
