function Login() {
  return (
    <div>
      <h2>Đăng nhập</h2>
      <form>
        <input type="email" placeholder="Email" required /><br /><br />
        <input type="password" placeholder="Mật khẩu" required /><br /><br />
        <button>Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;
