import React, { useState, useEffect } from "react";
import httpService from "./services/HttpService";
import "./styles.css";

export default function App() {
  const [data, setData] = useState({});
  const { get } = httpService();

  useEffect(() => {
    get("https://jsonplaceholder.typicode.com/todos/1").then((data) => {
      setData(data);
    });
  }, []);

  console.log(data);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
