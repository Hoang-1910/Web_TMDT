import React, { useState } from "react";

function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const payload = {
            name: name,
            email: email,
            password: password,
        }
        try{
            const response = await fetch("http://127.0.0.1:8000/api/register-user", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
                if (response.ok) {
                setMessage("Đăng ký thành công!");
                console.log("Success:", data);
                // Optionally, redirect or clear form
            } else {
                setMessage(data.message || "Đăng ký thất bại!");
                console.error("Lỗi:", data);
            }
        } catch (error) {
            console.error("Lỗi mạng:", error);
            setMessage("Có lỗi xảy ra khi kết nối tới máy chủ.");
            }
    };
    
    return(
        <div>
      <h2>Đăng ký</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Họ tên"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br /><br />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Mật khẩu"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        <button type="submit">Đăng ký</button>
      </form>

      {/* {message && <p>{message}</p>} */}
    </div>
    );
}



export default Register;
