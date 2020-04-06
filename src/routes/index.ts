import {Router} from "express";
import auth from "./auth.route";
import user from "./user.route";
import products from "./product.route";
import types from './types.route';
import lines from './productLine.route';
import ingredients from './ingredient.route';
import units from './unit.route';
import recipes from './recipe.route';
import menus from './menu.route';
import discounts from './discount.route';
import orders from './order.route';

const routes = Router();

routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/types", types);
routes.use("/products", products);
routes.use("/lines", lines);
routes.use("/ingredients", ingredients);
routes.use("/units", units);
routes.use("/recipes", recipes);
routes.use("/menus", menus);
routes.use("/discounts", discounts);
routes.use("/orders", orders);

export default routes;
