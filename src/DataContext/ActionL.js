import { useState, useEffect } from "react";
export const ActionL = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function activeLogin() {
      setUser(JSON.parse(sessionStorage.getItem("user")));
    }

    activeLogin();
  }, [sessionStorage.getItem("user")]);
  const login = (user) => {
    async function handleLogin() {
      await fetch("http://localhost/damh-project-1/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success == 1) {
            sessionStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            console.log("Đăng nhập thành công");
          } else console.log("Đăng nhập thất bại");
        })
        .catch((err) => {
          console.log("err:", err);
        });
    }
    handleLogin();
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };
  const search = (values) => {
    let result;
    async function handleScores() {
      await fetch("http://localhost/damh-project-1/api/search.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          result = data;
        })
        .catch((err) => {
          console.log("err:", err);
        });
    }

    handleScores();

    return result;
  };
  return { login, logout, user, search };
};
