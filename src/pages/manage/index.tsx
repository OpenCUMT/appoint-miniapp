import { Text, View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View class="text-[#066ecf] text-[100px]">
      <Text>Hello world!</Text>
    </View>
  );
}
