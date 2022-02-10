/**
 * @returns array of the post objects
 */
export async function getPosts() {
    return fetcher('https://jsonplaceholder.typicode.com/posts');
}

/**
 * @returns array of the user objects
 */
export async function getUsers() {
    return fetcher('https://jsonplaceholder.typicode.com/users');
}

/**
 * @returns array of the comment objects
 */
export async function getComments() {
    return fetcher('https://jsonplaceholder.typicode.com/comments');
}


async function fetcher(apiUrl) {
    const response = await fetch(apiUrl, {
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    });
    const data = await response.json();
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return data;
}


/**
 * @returns post object when succesful
 */
export async function sendEntry(title, body) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: body,
            userId: 9,  // default user, since there is no login function
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    const data = await response.json();
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return data;
}