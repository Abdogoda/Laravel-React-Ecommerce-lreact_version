import { Navigate, createBrowserRouter } from "react-router-dom";
import FrontEndLayout from "../layouts/frontend/FrontEndLayout";
import BackEndLayout from "../layouts/backend/BackEndLayout";
import Home from "../pages/frontend/Home";
import Dashborad from "../pages/backend/Dashborad";
import Profile from "../pages/backend/Profile";
import Category from "../pages/backend/Categories/Category";
import Login from "../pages/frontend/Auth/Login";
import Register from "../pages/frontend/Auth/Register";
import { useStateContext } from "../context/AuthContext";
import swal from "sweetalert";
import AddCategory from "../pages/backend/Categories/AddCategory";
import Product from "../pages/backend/Products/Product";
import AddProduct from "../pages/backend/Products/AddProduct";
import Contact from "../pages/frontend/Contact";
import About from "../pages/frontend/About";
import ViewProduct from "../pages/frontend/collections/ViewProduct";
import ViewSingleProduct from "../pages/frontend/collections/ViewSingleProduct";
import Cart from "../pages/frontend/Cart";
import Checkout from "../pages/frontend/Checkout";
import UserProfile from "../pages/frontend/Profile";
import Thanks from "../pages/frontend/Thanks";
import Order from "../pages/backend/Orders/Order";
import ViewOrder from "../pages/backend/Orders/ViewOrder";
import Products from "../pages/frontend/collections/Products";

const UserAuth = ({ children }) => {
 const { token, username } = useStateContext();
 if (token !== "" && username !== "") {
  return children;
 } else {
  swal("Unauthorized", "You Have To Login First!", "error");
  return <Navigate to="/login" />;
 }
};

const routes = createBrowserRouter([
 {
  path: "/",
  element: <FrontEndLayout />,
  children: [
   {
    path: "/",
    name: "Home",
    element: <Home />,
   },
   {
    path: "/about",
    name: "About",
    element: <About />,
   },
   {
    path: "/contact",
    name: "Contact",
    element: <Contact />,
   },
   {
    path: "/shop",
    name: "Shop",
    element: <Products />,
   },
   {
    path: "/collections/:categorySlug",
    name: "Category Products",
    element: <ViewProduct />,
   },
   {
    path: "/collections/:categorySlug/:productSlug",
    name: "Product",
    element: <ViewSingleProduct />,
   },
   {
    path: "/cart",
    name: "Cart",
    element: (
     <UserAuth>
      <Cart />
     </UserAuth>
    ),
   },
   {
    path: "/checkout",
    name: "Checkout",
    element: (
     <UserAuth>
      <Checkout />
     </UserAuth>
    ),
   },
   {
    path: "/thanks",
    name: "Thank You",
    element: (
     <UserAuth>
      <Thanks />
     </UserAuth>
    ),
   },
   {
    path: "/profile",
    name: "Profile",
    element: (
     <UserAuth>
      <UserProfile />
     </UserAuth>
    ),
   },
  ],
 },
 {
  path: "/admin",
  element: (
   <UserAuth>
    <BackEndLayout />
   </UserAuth>
  ),
  children: [
   {
    path: "/admin/dashboard",
    name: "Dashborad",
    element: <Dashborad />,
   },
   {
    path: "/admin/profile",
    name: "Profile",
    element: <Profile />,
   },
   {
    path: "/admin/category",
    name: "Categories",
    element: <Category />,
   },
   {
    path: "/admin/category/add",
    name: "Add Category",
    element: <AddCategory />,
   },
   {
    path: "/admin/category/:categoryId",
    name: "Edit Category",
    element: <AddCategory />,
   },
   {
    path: "/admin/products",
    name: "Products",
    element: <Product />,
   },
   {
    path: "/admin/products/:search",
    name: "Products Search",
    element: <Product />,
   },
   {
    path: "/admin/product/add",
    name: "Add Product",
    element: <AddProduct />,
   },
   {
    path: "/admin/product/:productId",
    name: "Edit Product",
    element: <AddProduct />,
   },
   {
    path: "/admin/orders",
    name: "Orders",
    element: <Order />,
   },
   {
    path: "/admin/orders/:id",
    name: "Order",
    element: <ViewOrder />,
   },
  ],
 },
 { path: "/login", name: "Login", element: <Login /> },
 { path: "/register", name: "Register", element: <Register /> },
]);

export default routes;
