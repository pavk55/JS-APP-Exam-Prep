import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItem, getItemById } from "../services/data.js";

const editTemplate = (item, onSubmit) => html`
    <section id="edit-page" class="auth">
        <form @submit=${onSubmit} id="edit">
            <h1 class="title">Edit Post</h1>

            <article class="input-group">
                <label for="title">Post Title</label>
                <input type="title" name="title" id="title" value="" .value=${item.title}>
            </article>

            <article class="input-group">
                <label for="description">Description of the needs </label>
                <input type="text" name="description" id="description" value="" .value=${item.description}>
            </article>

            <article class="input-group">
                <label for="imageUrl"> Needed materials image </label>
                <input type="text" name="imageUrl" id="imageUrl" value="" .value=${item.imageUrl}>
            </article>

            <article class="input-group">
                <label for="address">Address of the orphanage</label>
                <input type="text" name="address" id="address" value="" .value=${item.address}>
            </article>

            <article class="input-group">
                <label for="phone">Phone number of orphanage employee</label>
                <input type="text" name="phone" id="phone" value="" .value=${item.phone}>
            </article>

            <input type="submit" class="btn submit" value="Edit Post">
        </form>
    </section>
`;

export async function editPage(ctx) {
    async function onSubmit(event) {
        // use to allow for us to process the request not leave to default
        event.preventDefault();
        // process form data from event of the listener. createForm and get controls email/pass
        const formData = new FormData(event.target);

        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
        const address = formData.get('address');
        const phone = formData.get('phone');


        if (!title || !description || !imageUrl || !address || !phone) {
            return alert('all field are required');
        }
        await editItem(itemId, {
            title,
            description,
            imageUrl,
            address,
            phone
        })
        ctx.page.redirect('/details/' + itemId)
    }

    const itemId = ctx.params.id;
    const item = await getItemById(itemId);

    // refresh the nav with valid
    ctx.setUserNavigation();
    // display the page
    ctx.render(editTemplate(item, onSubmit));
}
