import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";


export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View >
      hello world
    </View>
  );
}
