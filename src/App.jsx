import React from "react";

function App() {
  return <div>{}</div>;
}

if (!localStorage.getItem("globalAds")) {
  localStorage.setItem("globalAds", JSON.stringify([]));
}

export default App;
