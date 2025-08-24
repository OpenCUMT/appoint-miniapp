import { Text,View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";


export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View >
      <Text>第三方信息共享清单</Text>
    </View>
  );
}
