// comments area div
const commentArea = (comments) => {
    // main container for comments component
    const container = document.createElement('div');
    container.className = 'commentsContainer';

    // comments button, to show
    const commentTogle = document.createElement('div');
    commentTogle.className = 'commentTogle';
    container.appendChild(commentTogle);

    if (comments.length < 1) {
        commentTogle.innerHTML = 'no comments yet'
    } else {
        commentTogle.innerHTML = 'show comments'

        // container for comments
        const commentsList = document.createElement('div');
        commentsList.className = 'commentsList';
        container.appendChild(commentsList);

        // comments button function
        commentTogle.onclick = () => {
            if (commentsList.getAttribute("visible")) {
                commentsList.removeAttribute("visible")
            } else {
                commentsList.setAttribute("visible", "true");
            }
        }

        // add commentboxes to the commentlist area
        comments.forEach(comment => {
            commentsList.appendChild(commentDiv(comment))
        })
    }

    return container;
}

// comment box for every comment
function commentDiv(comment) {
    const divElement = document.createElement('div');
    divElement.className = 'commentBox';
    divElement.innerHTML = `
    <div class="commentHead">
        <img src="images/user_icon.png" height=15px>
        <h5>${comment?.email}</h5>
    </div>
    <h4>${comment?.name}</h4>
    <p>${comment?.body}</p>
    `
    return divElement;
}

/**
 *
 * @param {Object} postObj
 * @returns post element
 */
export function PostCard({ post, user, comments }) {
    const postBox = document.createElement('div');
    postBox.className = 'post';
    postBox.innerHTML = `
    <div class="user">
        <img src="images/user_icon.png" height=20px>
        <h5>${user?.name}</h5>
        <span>${user?.email}</span>
    </div>
    <h4>${post?.title}</h4>
    <p>${post?.body}</p>
    `;
    postBox.appendChild(commentArea(comments));
    return postBox;
}