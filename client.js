console.log('aawa')
const api_url = window.location.hostname == 'localhost' ? "http://localhost:5000/posts" : 'https://yotam-social-media.herokuapp.com/posts';
const form = document.getElementById('post-form');
const postsDiv = document.getElementById('all-posts');

// load all posts from database
showAllPosts();

// send post to back-end
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const body = formData.get('body');
    const post = {
        name,
        body
    };
    // send data
    fetch(api_url,{
        method:'POST',
        body:JSON.stringify(post),
        headers:{
            'content-type': 'application/json'
        }
    }).then(response => response.json()).then(createdPost =>{
        console.log(createdPost);
        form.reset();
        showAllPosts();
    });
});
// request all posts from API
function showAllPosts(){
    postsDiv.innerHTML = '';
    fetch(api_url)
        .then(response => response.json())
        .then(allPosts =>{
            allPosts.reverse();
            allPosts.forEach(currentPost => {
                createPost(currentPost);
            });
        });
}
//build the post in HTML
function createPost(post){
    const div = document.createElement("div");
    const username = document.createElement("h3");
    username.textContent = post.name;
    const body = document.createElement("p");
    body.textContent = post.content;
    const date = document.createElement("small");
    date.textContent = post.day + " " + post.hour;
    div.appendChild(username);
    div.appendChild(body);
    div.appendChild(date);
    postsDiv.appendChild(div);
}