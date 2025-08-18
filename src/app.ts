import { useLaunch } from "@tarojs/taro";
import type { ParentProps } from "solid-js";

import "./app.css";
import "./app.scss";

function App({ children }: ParentProps) {
  useLaunch(() => {
    console.log("App launched.");
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
