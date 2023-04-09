import { API_BASE_URL } from "../app-config";
import { React, useState } from "react";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken) {
    headers.append("Authorization", "Bearer " + accessToken);
  }
  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };
  console.log(options);
  if (request) {
    options.body = JSON.stringify(request);
  }
  // if (request && options.method === "GET") {
  //   options.url =
  //     API_BASE_URL +
  //     api +
  //     new URLSearchParams({
  //       email: email,
  //     });
  // }
  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch((error) => {
      console.log("Oops!");
      console.log(error.status);
      console.log("Oops!");
      if (error.status === 403) {
        console.log("로그인 화면 전");
        window.location.href = "/login";
        console.log("로그인 화면 후");
      }
      return Promise.reject(error);
    });
}
export function callGet(api, method, query) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken) {
    headers.append("Authorization", "Bearer " + accessToken);
  }
  let options = {
    headers: headers,
    url:
      API_BASE_URL +
      api +
      new URLSearchParams({
        email: query,
      }),
    method: method,
  };

  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch((error) => {
      console.log("Oops!");
      console.log(error.status);
      console.log("Oops!");
      // if (error.status === 403) {
      //   console.log("로그인 화면 전");
      //   window.location.href = "/login";
      //   console.log("로그인 화면 후");
      // }
      return Promise.reject(error);
    });
}

export function signin(userDTO) {
  // const [user,setUser]=useState({});
  return call("/auth/signin", "POST", userDTO).then((response) => {
    if (response.token) {
      localStorage.setItem("ACCESS_TOKEN", response.token);
      localStorage.setItem("email", response.email);
      window.location.href = "/";
      // SaveMail(userDTO.email);
    }
  });
}
export function updateuserinfo(userDTO) {
  // const [user,setUser]=useState({});
  console.log(userDTO);
  return call("/auth/update", "PUT", userDTO)
    .then((response) => {
      if (response.id) {
        console.log("user updated");
        // localStorage.setItem("ACCESS_TOKEN", response.token);
        // localStorage.setItem("email", response.email);
        // window.location.href = "/";
        // SaveMail(userDTO.email);
      }
    })
    .catch((error) => {
      console.log("Oops!");
      console.log(error.status);
      console.log("Oops!");
      // if (error.status === 403) {
      //   console.log("로그인 화면 전");
      //   window.location.href = "/login";
      //   console.log("로그인 화면 후");
      // }
      return Promise.reject(error);
    });
}
// export function SaveMail(email) {
//   // const [user,setUser]=useState({});
//   console.log("saveemail 실행");
//   // const [user, setUser] = useState({});
//   // var email = email;
//   // console.log("Retrieving user...", email);
//   return callGet("/auth/profile?", "GET", email).then((response) => {
//     if (response.id) {
//       console.log(response);
//       return response;
//     } else {
//       console.log("오류 발생");
//     }
//   });
// }
export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO)
    .then((response) => {
      if (response.id) {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.log("Oops!");
      console.log(error.status);
      console.log("Oops!");
      if (error.status === 403) {
        window.location.href = "/auth/signup";
      }
      return Promise.reject(error);
    });
}
export function signout() {
  localStorage.setItem("ACCESS_TOKEN", null);
  localStorage.setItem("email", null);
  window.location.href = "/";
}
