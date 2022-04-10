import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { logout as apiLogout } from './services/data.js';

// Elements
// const navbarElement = document.getElementById("navigation");
const appElement = document.querySelector('main');

// Logout
document.getElementById('logoutBtn').addEventListener('click', logout)

//Call function to start app with proper nav. call after every pageView!
setUserNavigation();

/**
 *  routing table
 */
page("/home", "/");
page("/index.html", "/");
// page('/', decorateContext, guestUsersOnly, homePage);
// page('/login', decorateContext, loginPage);
// page('/register', decorateContext, registerPage);
// page('/catalog', decorateContext, catalogPage);
// page('/create', decorateContext,loggedUsersOnly, createPage);
// page('/details/:id', decorateContext, detailsPage);
// page('/edit/:id', decorateContext,loggedUsersOnly , editPage);
// page('/profile', decorateContext, profilePage);

// page.start();


/**
 * Declare functions
 */
// middleware to check for user authentication(later stage) and render the element in appElement(main)
function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, appElement)
    // every module now will have access to setUser.. throughout the context
    ctx.setUserNavigation = setUserNavigation;
    // call next render
    next();
}

// Display proper navigation
function setUserNavigation() {
    const username = sessionStorage.getItem('username');

    if (username !== null) {
        document.querySelector('div.profile > a').textContent = `Welcome ${username}`;
        document.querySelector('.profile').style.display = '';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.profile').style.display = 'none';
        document.querySelector('.guest').style.display = '';
    }
}
async function logout() {
    await apiLogout();
    setUserNavigation();
    page.redirect('/');
}
// AuthGuard()
function guestUsersOnly(ctx, next) {
    const token = sessionStorage.getItem('authToken');
    // when in home page before render check if logged redirect to catalog
    if (token !== null) {
        return ctx.page.redirect('/catalog');
    }
    // call next render
    next();
}
// AuthGuard()
function loggedUsersOnly(ctx, next) {
    const token = sessionStorage.getItem('authToken');
    // when in home page before render check if logged redirect to catalog
    if (token === null) {
        return ctx.page.redirect('/');
    }
    // call next render
    next();
}
