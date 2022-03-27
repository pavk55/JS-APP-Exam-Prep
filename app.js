import page from './node_modules/page/page.mjs'
import homePage from "./src/pages/home/homePage";
import { LitRenderer } from "./rendering/litRenderer";
import authService from "./services/authService";
import navPage from "./src/pages/nav/navPage";

//Example check
console.log('opa')
console.log('authService  0.41.58')

/**
 * 1. Get document elements to work with
 */
const navElement = document.getElementById('nav')
const appElement = document.getElementById('app')

/**
 * 2. Create some partially applied renderers with the doc elements
 */
let renderer = new LitRenderer();
let navRenderHandler = renderer.createRendererHandler(navElement);
let appRenderHandler = renderer.createRendererHandler(appElement);

/**
 * 3.Initialize pages and other compos
 */
homePage.initialize(page, appRenderHandler, authService);
navPage.initialize(page, navRenderHandler, authService);

/**
 * 4. routing
 */
// some default routes
page('/index.html', '/home')
page('/', '/home')

// set navigation to be globally init (always)
page(navPage.getView())
// call the other pages after that
page('/home', homePage.getView())


page.start();
