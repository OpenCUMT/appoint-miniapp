import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";


export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View class="text-bold">
      <span class="icon-[lucide--download] w-100 h-100 text-[#66ccff]" />
    </View>
  );
}
