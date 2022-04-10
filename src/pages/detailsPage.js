import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteItem, getItemById } from "../services/data.js";

const detailsTemplate = (item, isOwner, isLogged, onDelete) => html`
    <section id="details-page">
        <h1 class="title">Post Details</h1>

        <div id="container">
            <div id="details">
                <div class="image-wrapper">
                    <img src=${item.imageUrl} alt="Material Image" class="post-image">
                </div>
                <div class="info">
                    <h2 class="title post-title">${item.title}</h2>
                    <p class="post-description">Description: ${item.description}</p>
                    <p class="post-address">Address: ${item.address}</p>
                    <p class="post-number">Phone number: ${item.phone}</p>
                    <p class="donate-Item">Donate Materials: 0</p>

                    <!--Edit and Delete are only for creator-->
                    ${isOwner ? html`
                        <div class="btns">
                            <a href="/edit/${item._id}" class="edit-btn btn">Edit</a>
                            <a @click=${onDelete} class="delete-btn btn">Delete</a>
                    ` : ''}

                    <!--Bonus - Only for logged-in users ( not authors )-->
                    ${isLogged ? html`<a href="/donate" class="donate-btn btn">Donate</a>` : ''}
                </div>
            </div>
        </div>
        </div>
    </section>
`;

export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    let itemId = ctx.params.id;
    const item = await getItemById(itemId);
    const isOwner = userId === item._ownerId;
    const isLogged = userId !== null;

    // console.log(itemId);
    // console.log(item._id);
    console.log(isOwner);
    console.log(isLogged);

    async function onDelete() {
        const confirm = window.confirm('Are you sure?')
        if (confirm) {
            await deleteItem(itemId);
            ctx.page.redirect('/')
        }
    }

    ctx.setUserNavigation();
    ctx.render(detailsTemplate(item, isOwner, isLogged, onDelete));
}
