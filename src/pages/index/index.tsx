import { Image, Swiper, SwiperItem, Text, View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import PlaceholderIcon from "@/assets/icon/placeholder.png";
import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  const imageList = [PlaceholderIcon];

  return (
    <View class="index">
      {/* 轮播图 */}
      <Swiper class="home-swiper" indicatorDots autoplay circular interval={5000}>
        {imageList.map((item, index) => {
          return (
            <SwiperItem item-id={index}>
              <Image class="swiper-image" src={item} mode="aspectFill" />
            </SwiperItem>
          );
        })}
      </Swiper>

      {/* 欢迎语 */}
      <View class="welcome-section">
        <View>
          <Text class="welcome-title">下午好, 开发者</Text>
        </View>
        <View>
          <Text class="welcome-subtitle">美好的一天从这里开始</Text>
        </View>
      </View>

      {/* 常用功能 */}
      <View class="card common-functions">
        <Text class="section-title">常用功能</Text>
        <View class="functions-grid">
          <View
            class="function-button"
            onClick={() => {
              console.log("IT预约 clicked");
            }}
          >
            <Image class="function-icon" src={PlaceholderIcon} />
            <Text class="function-label">IT预约</Text>
          </View>
          <View
            class="function-button"
            onClick={() => {
              console.log("奔腾预约 clicked");
            }}
          >
            <Image class="function-icon" src={PlaceholderIcon} />
            <Text class="function-label">奔腾预约</Text>
          </View>
          <View
            class="function-button"
            onClick={() => {
              console.log("我的 clicked");
            }}
          >
            <Image class="function-icon" src={PlaceholderIcon} />
            <Text class="function-label">我的</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
