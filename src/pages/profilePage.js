import { html } from "../../node_modules/lit-html/lit-html.js";

const profileTemplate = () => html`
<section id="my-posts-page">
            <h1 class="title">My Posts</h1>

            <!-- Display a div with information about every post (if any)-->
            <div class="my-posts">
                <div class="post">
                    <h2 class="post-title">Clothes</h2>
                    <img class="post-image" src="./images/clothes.jpeg" alt="Material Image">
                    <div class="btn-wrapper">
                        <a href="#" class="details-btn btn">Details</a>
                    </div>
                </div>

                <div class="post">
                    <h2 class="post-title">Toys</h2>
                    <img class="post-image" src="./images/toys.jpeg" alt="Material Image">
                    <div class="btn-wrapper">
                        <a href="#" class="details-btn btn">Details</a>
                    </div>
                </div>
            </div>

            <!-- Display an h1 if there are no posts -->
            <h1 class="title no-posts-title">You have no posts yet!</h1>
        </section>
`;
