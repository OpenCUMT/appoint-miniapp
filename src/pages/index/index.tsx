import { Image, Swiper, SwiperItem, Text, View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import PlaceholderIcon from "@/assets/icon/placeholder.png";
import {departments} from '@/store/user';
import { createSignal } from 'solid-js';

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  const imageList = [PlaceholderIcon];
  const statsData = [
    { value: 12, label: "本月部门1预约" },
    { value: 8, label: "本月部门1结单" },
    { value: 56, label: "本月部门2预约" },
    { value: 48, label: "本月部门2结单" },
  ];



  return (
    <View class="flex flex-col items-center justify-start min-h-screen py-[32rpx] box-border bg-gradient-to-br from-[#e0eafc] to-[#cfdef3]">
      {/* 轮播图 */}
      <Swiper class="w-[90%] h-[320rpx] rounded-[20rpx] shadow-[0_8rpx_24rpx_rgba(0,0,0,0.08)] mb-[32rpx] bg-white aspect-video" indicatorDots autoplay circular interval={5000}>
        {imageList.map((item, index) => {
          return (
            <SwiperItem item-id={index}>
              <Image class="w-full h-full rounded-[20rpx] object-cover shadow-[0_4rpx_16rpx_rgba(0,0,0,0.06)]" src={item} mode="aspectFill" />
            </SwiperItem>
          );
        })}
      </Swiper>

      {/* 欢迎语 */}
      <View class="w-[90%] mb-[32rpx] px-[20rpx] py-[24rpx] bg-white/80 rounded-[16rpx] shadow-[0_4rpx_16rpx_rgba(0,0,0,0.04)] text-left">
        <View>
          <Text class="text-[44rpx] font-bold text-[#2b5876] mb-[8rpx]">下午好, 开发者</Text>
        </View>
        <View>
          <Text class="text-[28rpx] text-[#555]">美好的一天从这里开始</Text>
        </View>
      </View>

       {/* 常用功能 */}
      <View class="w-[90%] min-h-[260rpx] rounded-[18rpx] bg-gradient-to-r from-[#f6d365] to-[#fda085] shadow-[0_8rpx_24rpx_rgba(253,160,133,0.08)] flex flex-col py-[24rpx] mb-[32rpx]">
        <Text class="text-[36rpx] text-white font-semibold m-0 mb-[20rpx] ml-[24rpx] tracking-[2rpx]">常用功能</Text>
        <View class="flex flex-row items-center justify-around w-full px-[12rpx]">
          {departments().map(dept => (
            <View
              class="w-[140rpx] h-[140rpx] flex flex-col items-center justify-around bg-white/70 rounded-[16rpx] shadow-[0_2rpx_8rpx_rgba(0,0,0,0.04)] transition-all duration-200 cursor-pointer active:bg-[#f0f0f0] active:shadow-[0_4rpx_16rpx_rgba(0,0,0,0.08)] active:scale-95"
              onClick={() => {
                console.log(`${dept}预约 clicked`);
              }}
            >
              <Image class="w-[72rpx] h-[72rpx] mb-[8rpx]" src={PlaceholderIcon} />
              <Text class="text-[26rpx] text-[#333] text-center font-medium tracking-[1px]">{dept}预约</Text>
            </View>
          ))}
          {/* 可以根据需要保留或移除“我的”按钮 */}
          <View
            class="w-[140rpx] h-[140rpx] flex flex-col items-center justify-around bg-white/70 rounded-[16rpx] shadow-[0_2rpx_8rpx_rgba(0,0,0,0.04)] transition-all duration-200 cursor-pointer active:bg-[#f0f0f0] active:shadow-[0_4rpx_16rpx_rgba(0,0,0,0.08)] active:scale-95"
            onClick={() => {
              console.log("我的 clicked");
            }}
          >
            <Image class="w-[72rpx] h-[72rpx] mb-[8rpx]" src={PlaceholderIcon} />
            <Text class="text-[26rpx] text-[#333] text-center font-medium tracking-[1px]">我的</Text>
          </View>
        </View>
      </View>

      {/* 进度条示例 */}
      <View class="flex flex-col items-start w-[90%]">
        <Text class="text-[28rpx] text-[#333] p-[10rpx]">
        当日预约名额剩余：
        </Text>
      <Text class="text-[24rpx] text-[#606266] leading-normal mt-[8rpx] text-center">
        今日预约5人，还可预约5人
      </Text>
      </View>

      {/*统计栏组件*/}
      <View class="w-[90%] bg-white p-[32rpx_16rpx] box-border mt-[32rpx] rounded-[18rpx]">
        <Text class="text-[30rpx] font-semibold tracking-[2rpx] p-[10rpx] mb-[50rpx] text-[#2b5876]">数据一览</Text>
        <View class="flex justify-around items-center w-full">
          {statsData.map(item => (
            <View class="flex flex-col items-center text-center">
              <Text class="text-[40rpx] font-bold text-[#2b5876] mb-[8rpx]">{item.value}</Text>
              <Text class="text-[24rpx] text-[#666]">{item.label}</Text>
            </View>
          ))}
        </View>
      </View>




    </View>
  );
}
