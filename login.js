//const api_url = "https://yotam-social-media.herokuapp.com/"
const api_url = "https://yotam-social-media.herokuapp.com/"
loginStatusP = document.getElementById('login-status');
const form = document.getElementById('login-form');
form.addEventListener('submit',(event)=>{
    console.log("sent")
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const password = formData.get('password');
    const user = {
        name,
        password
    }
    fetch(api_url + "login",{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
            'content-type': 'application/json'
        }
    }).then(response => response.json()).then(status =>{
        if(status.success){
            sessionStorage.setItem("username",status.username);
            form.reset();
            loginStatusP.style.color = "green";
            loginStatusP.textContent = status.message;
            setTimeout(()=>{
                window.location.href = "./index.html";
            },1000); 
        }
        else{
            loginStatusP.textContent = status.message;
            loginStatusP.style.color = "red";
        }
    }); 
});
