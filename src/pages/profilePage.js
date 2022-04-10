import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItemProfile } from "../services/data.js";

const profileTemplate = (items, isAnyItem) => html`
    <section id="my-posts-page">
        <h1 class="title">My Posts</h1>

        ${!isAnyItem
            ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>`
            : html`
                <div class="my-posts">
                    ${items.map(itemTemplate)}
                </div>`}
        <!-- Display a div with information about every post (if any)-->
        <!-- Display an h1 if there are no posts -->

    </section>
`;

const itemTemplate = (item) => html`
    <div class="post">
        <h2 class="post-title">${item.title}</h2>
        <img class="post-image" src=${item.imageUrl} alt="Material Image">
        <div class="btn-wrapper">
            <a href="/details/${item._id}" class="details-btn btn">Details</a>
        </div>
    </div>
`;

export async function profilePage(ctx) {
    const items = await getItemProfile();
    const isAnyItem = items.length !== 0;
    ctx.setUserNavigation();
    ctx.render(profileTemplate(items, isAnyItem))
}
