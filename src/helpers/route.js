import AccessDenied from "../components/accessDenied";
import NotFound from "../components/notFound";
import ProductDetail from "../views/user/productDetail";
import ProductList from "../views/user/productList";


const user = {
    ProductList:{path: '/', name: 'Product List', component: ProductList, exact: true, pageName:"Product List",adminLevel:0},
    ProductDetail:{path: '/ProductDetail/:id', name: 'Product Detail', component: ProductDetail, exact: true, pageName:"Product Detail",adminLevel:0},

}

const component = {
    notFound:{path: '/error/404', name: '404 Not Found', component: NotFound, exact: true, pageName:"404 Not Found",adminLevel:0},
    accessDenied:{path: '/error/400', name: 'ACCESS DENIED', component: AccessDenied, exact: true, pageName:"ACCESS DENIED",adminLevel:0},
}

const routeAll = {
    user,
    component
}

export default routeAll;