const handleLogout = async () => {
  const token = localStorage.getItem("token");

  await fetch("http://localhost:8000/api/logout", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/login");
};
