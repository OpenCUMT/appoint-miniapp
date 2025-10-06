import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { Text, Image, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View >
      <Text>
        加入QQ群查看详情：
      </Text>
      <Image src="https://example.com/your-image.jpg" />
      <Button onClick={() =>{
        Taro.switchTab({ url: '/pages/index/index' });
      }} >返回主页</Button>
    </View>
  );
}
