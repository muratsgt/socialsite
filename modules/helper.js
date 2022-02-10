/**
 *
 * @param {Object} post
 * @param {Array} allComments
 * @returns comments array for that post
 */
function findComments(post, allComments) {
    return allComments.filter(comment => comment.postId === post.id)
}

/**
 *
 * @param {Object} post
 * @param {Object} users
 * @returns user of that post
 */
function findUser(post, users) {
    return users.find(user => user.id === post.userId)
}

export function postData(post, users, allComments) {
    const user = findUser(post, users);
    const comments = findComments(post, allComments);
    return {post, user, comments};
}