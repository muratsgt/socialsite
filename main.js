import { getPosts, getComments, getUsers, sendEntry } from "./modules/apiService.js";
import { PostCard } from "./modules/PostCard.js";
import { postData } from "./modules/helper.js";

let postList = [];
let userList = [];
let commentList = [];

const postsArea = document.getElementById("posts");
const sendButton = document.getElementById("postSubmit");
const contentInput = document.getElementById("postInput");
const titleInput = document.getElementById("titleInput");
const upButton = document.getElementById("goUp");

// event listener for button
sendButton.onclick = addEntry;

// event listener for input areas
titleInput.onkeyup = checkInputs;
contentInput.onkeyup = checkInputs;

// up button window top
upButton.onclick = () => window.scrollTo({
    top: 0,
    behavior: 'smooth',
})

// fetch all data from api server
Promise.all([getPosts(), getUsers(), getComments()])
    .then((values) => {
        postList = [...values[0]];
        userList = [...values[1]];
        commentList = [...values[2]];
        displayPosts();
        console.log('userList', userList);
    }).catch(error => {
        const errorElement = document.createElement("div");
        errorElement.innerText = "Ups! Something went wrong.";
        postsArea.appendChild(errorElement);
        console.log(error);
    });

// renders the post cards on the screen
function displayPosts() {
    postsArea.innerHTML = '';
    postList.forEach((post) => {
        const postObj = postData(post, userList, commentList);
        postsArea.appendChild(PostCard(postObj));
    })
}

// checks input area to enable send button
function checkInputs() {
    if (titleInput.value && contentInput.value) {
        sendButton.removeAttribute("disabled");
    } else {
        sendButton.setAttribute("disabled", "");
    }
}

// post a new entry
function addEntry() {
    // to prevent unwanted clicks
    sendButton.setAttribute("disabled", "");

    // sends post request to the api server
    sendEntry(titleInput.value, contentInput.value)
        .then(data => {
            postList.unshift(data);
            const postObj = postData(data, userList, commentList);
            postsArea.prepend(PostCard(postObj));
            titleInput.value = "";
            contentInput.value = "";
        })
        .catch(error => {
            console.log('error: ', error);
            sendButton.removeAttribute("disabled");
        })
}

