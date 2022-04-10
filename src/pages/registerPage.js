import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../services/data.js";

const registerTemplate = () => html`
<section id="register-page" class="auth">
            <form id="register">
                <h1 class="title">Register</h1>

                <article class="input-group">
                    <label for="register-email">Email: </label>
                    <input type="email" id="register-email" name="email">
                </article>

                <article class="input-group">
                    <label for="register-password">Password: </label>
                    <input type="password" id="register-password" name="password">
                </article>

                <article class="input-group">
                    <label for="repeat-password">Repeat Password: </label>
                    <input type="password" id="repeat-password" name="repeatPassword">
                </article>

                <input type="submit" class="btn submit-btn" value="Register">
            </form>
        </section>
`;

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    // Event listener
    async function onSubmit(event) {
        // use to allow for us to process the request not leave to default
        event.preventDefault();
        // process form data from event of the listener. createForm and get controls email/pass
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPass = formData.get('repeatPass');

        let isNotUsername = email === '';
        let isNotPassword = password === '';
        let isNotRepeatPass = repeatPass === '';

        if (isNotUsername || isNotPassword || isNotRepeatPass) {
            return alert('all fields are required!');
        }
        if (password !== repeatPass) {
            return alert('not matching password!');
        }

        const result =  await register(email, password)

        // refresh the nav with valid
        ctx.setUserNavigation();

        // redirect
        ctx.page.redirect('/dashboard');
    }
}
