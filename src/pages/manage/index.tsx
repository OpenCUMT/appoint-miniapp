import { Text, View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { userInfo } from "@/store/user";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View class="text-[#066ecf] text-[100px]">
      <Text>{userInfo().department}</Text>
    </View>
  );
}
