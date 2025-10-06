import { from } from "solid-js";
import { View, Text,Image,Button } from "@tarojs/components";
import Taro from "@tarojs/taro";

export default function Index() {
  console.log("Page loaded.");
  return (
    <View class='p-5 bg-gray-100 min-h-screen'>
      <Text>值班表</Text>
      <Image src="https://example.com/your-image.jpg" />
      <Button onClick={() =>{
        Taro.switchTab({ url: '/pages/index/index' });
      }} >返回主页</Button>
    </View>
  )
}
