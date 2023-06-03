const apiUser = 'http://localhost:5000/login'
function start (){
  var onclickLogin = document.getElementById('onclick1') 
  var onclickRegister = document.getElementById('onclick2') 
  singupbutton()
  onclickLogin.onclick = () =>  login()
  onclickRegister.onclick = () => register()
 
}
start()

function login() {

  const username = document.querySelector('.name__login').value
  const password = document.querySelector('.pass__login').value

  if ( username==='' || password ==='' )
        {
             alert(' mời nhập vào đầy đủ các ô trống')
        }
  else {
  fetch(apiUser)
    .then(response => response.json())
    .then(users => 
        {
      const user = users.find(user => user.username === username && user.password === password)
        console.log(users)

      if (user) 
        {
            alert('Đăng nhập thành công!')
            window.location.href = "https://github.com/hovetu/baitap"
           
        } 
      
      else 
        {
            alert('Sai ten dang nhập hoặc tài khoản')
        }
    })
    .catch(error => console.log('Lỗi:', error))
}
}

function register() {

  const username = document.querySelector('.name__register').value;
  const password = document.querySelector('.pass__register').value;

  const newUser = {
    username: username,
    password: password
   }
 if (username ==='' || password==='')
   {
     alert('Mời bạn nhập vào đầy đủ các ô trống')
   }
 else if (username.length >10 || password.length > 10)
   {
     alert('Tên tài khoản hoặc mật khẩu vượt quá ký tự cho phép')
   }
 else
     {
  var raw = JSON.stringify(newUser);
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
  fetch(apiUser, {
    method: 'POST',
    headers: myHeaders,
    body: raw
  })
    .then(response => response.json())
    .then(data => {

      alert('Đăng ký thành công!')
      singupbutton()
    })
    .catch(error => console.log('Lỗi đăng ký:', error))
  }
}
function singupbutton()
    {
const signUpButton = document.getElementById('signUp')
        const signInButton = document.getElementById('signIn')
        const container = document.getElementById('container')

        signUpButton.addEventListener('click', () => {
            container.classList.add('right-panel-active')
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active')
        });

    }


