import { deleteProductImage } from './products/delete-product-image';

// PRODUCTS

export { getPaginatedProductsWithImages } from "./products/product-pagination";
export { getProductBySlug } from "./products/get-product-by-slug";
export { getStockBySlug } from "./products/get-stock-by-slug";
export { createUpdateProducts } from "./products/create-update-products";
export { deleteProductImage } from "./products/delete-product-image";

// AUTHENTICATION

export { authenticate } from "./auth/login";
export { logout } from "./auth/logout";
export { registerUser } from "./auth/register";

// COUNTRIES - ADDRESS

export { getCountries } from "./country/get-countries";
export { setUserAddress } from "./address/set-user-address";
export { deleteUserAddress } from "./address/delete-user-address";
export { getUserAddress } from "./address/get-user-address";

// ORDERS

export { placeOrder } from "./order/place-order";
export { getOrderById } from "./order/get-order-by-id";
export { gerOrdersByUser } from "./order/get-orders-by-user";
export { getPaginatedOrders } from "./order/get-paginated-orders";

// PAYMENTS

export { setTransactionId } from "./payments/set-transaction-id";
export { paypalCheckPayment } from "./payments/paypal-payment";

// USERS

export { ChangeUserRole } from "./users/change-user-role";

// CATEGORIES

export { getCategories } from "./category/get-categories";