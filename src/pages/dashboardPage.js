import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItems } from "../services/data.js";

const dashboardTemplate = (allItems) => html`
    <section id="dashboard-page">
        <h1 class="title">All Posts</h1>

        <!-- Display a div with information about every post (if any)-->
        
        ${allItems.length === 0 
            ? html` <h1 class="title no-posts-title">No posts yet!</h1>` 
            : html`<div class="all-posts">
            ${allItems.map(itemTemplate)}
            </div>`}
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

export async function homePage(ctx) {
    // get the data
    const allItems = await getItems();

    // refresh the nav with valid
    ctx.setUserNavigation();
    // display the page
    ctx.render(dashboardTemplate(allItems));
}
