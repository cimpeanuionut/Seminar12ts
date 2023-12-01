import Contact from "./views/Contact";
import Employee from "./views/Employee";
import Home from "./views/Home";
import NotFound from "./views/NotFound";

export const routes = Object.freeze([
    {
        path:"/",
        component: Home,
        name: "Home"
    },
    {
        path:"/Contact",
        component: Contact,
        name: "Contact"
    },
    {
        path:"/Employee",
        component: Employee,
        name: "Employee"
    },
    {
        path:"*",
        component: NotFound,
        name: null
    }
]);