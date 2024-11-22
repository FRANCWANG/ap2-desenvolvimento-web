const entrada = '123456'
console.log(hex_sha256(entrada))



document.getElementById('login-btn').addEventListener('click', () => {
  const password = document.getElementById('password').value;
  const hash = '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92';

  if (hash === hex_sha256(password)) {
    localStorage.setItem('authToken', 'authorized');
    window.location = 'main.html' ;
    alert("Senha correta");
  } else {
    alert('Senha incorreta!');
  }
});
