import { Text,View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";


export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View class="text-bold">
      <Text>微信绑定/解绑</Text>
    </View>
  );
}
