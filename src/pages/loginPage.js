import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../services/data.js";

const loginTemplate = (onSubmit) => html`
    <section id="login-page" class="auth">
        <form @submit=${onSubmit} id="login">
            <h1 class="title">Login</h1>

            <article class="input-group">
                <label for="login-email">Email: </label>
                <input type="email" id="login-email" name="email">
            </article>

            <article class="input-group">
                <label for="password">Password: </label>
                <input type="password" id="password" name="password">
            </article>

            <input type="submit" class="btn submit-btn" value="Log In">
        </form>
    </section>
`;

export async function loginPage(ctx) {
    // refresh the nav with valid
    ctx.setUserNavigation();

    ctx.render(loginTemplate(onSubmit));

    // Event listener
    async function onSubmit(event) {
        // use to allow for us to process the request not leave to default
        event.preventDefault();
        // process form data from event of the listener. createForm and get controls email/pass
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        console.log(formData);

        // if empty fields
        if(!email || !password) {
            return alert('please fill all empty fields')
        }

        // login with the user/pass
        await login(email, password);
        const token = sessionStorage.getItem('authToken')
        if (token === null) {
            window.alert('Cannot login. Try with correct username amd password.');
        }

        // redirect
        ctx.page.redirect('/');
    }
}
