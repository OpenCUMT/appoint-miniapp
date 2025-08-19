import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";


export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View >
      服务协议
    </View>
  );
}
