//const api_url = "https://yotam-social-media.herokuapp.com/"
const api_url = "https://yotam-social-media.herokuapp.com/"

const form = document.getElementById('signup-form');
const registerStatusP = document.getElementById('register-status');


form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name').toString().trim();
    const password = formData.get('password').toString();
    const password2 = formData.get("password-auth").toString();
    const user = {
        name,
        password,
        password2
    }
    // send register data to server
    fetch(api_url + "register",{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
            'content-type': 'application/json'
        }
        //get response if user is valid
    }).then(response => response.json()).then(status =>{
        if(status.success){
            form.reset();
            registerStatusP.style.color = "green";
            registerStatusP.textContent = status.message;
            setTimeout(()=>{
                window.location.href = "./login.html";
            },1000); 
        }
        else{
            registerStatusP.textContent = status.message;
            registerStatusP.style.color = "red";
        }
        
    });
});