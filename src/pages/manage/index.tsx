import { Text, View, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import PlaceholderIcon from "@/assets/icon/placeholder.png"; // 假设图标路径

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  // 用户功能
  const userFunctions = [
    { name: "服务预约", path: "/pages/appoint/index" },
    { name: "服务记录", path: "/pages/history/index" }, // 假设查询页面路径
    { name: "加入我们", path: "/pages/joinUs/index" },   // 假设加入我们页面路径
  ];

  // 部门成员功能
  const memberFunctions = [
    { name: "查询预约", path: "/pages/queryForStaff/index" }, // 假设路径
    { name: "查看值班表", path: "/pages/dutyRoster/index" }, // 假设路径
  ];

  // 部长功能
  const adminFunctions = [
    { name: "修改值班", path: "/pages/manage/schedule-edit/index" }, // 假设路径
  ];

  const handleNavigate = (path: string) => {
    if (path) {
      Taro.navigateTo({ url: path });
    } else {
      console.log("路径未定义");
    }
  };

  const FunctionBlock = ({ title, functions }) => (
    <View class="w-[90%] bg-white/90 rounded-[18rpx] shadow-[0_8rpx_24rpx_rgba(0,0,0,0.08)] flex flex-col py-[24rpx] mb-[32rpx]">
      <Text class="text-[36rpx] text-[#2b5876] font-semibold m-0 mb-[20rpx] ml-[24rpx] tracking-[2rpx]">
        {title}
      </Text>
      <View class="flex flex-row flex-wrap items-center justify-start w-full px-[12rpx] gap-y-4">
        {functions.map((func) => (
          <View
            key={func.name}
            class="w-[33.33%] flex flex-col items-center"
            onClick={() => handleNavigate(func.path)}
          >
            <View class="w-[140rpx] h-[140rpx] flex flex-col items-center justify-center bg-white/70 rounded-[16rpx] shadow-[0_2rpx_8rpx_rgba(0,0,0,0.04)] transition-all duration-200 cursor-pointer active:bg-[#f0f0f0] active:shadow-[0_4rpx_16rpx_rgba(0,0,0,0.08)] active:scale-95">
              <Image class="w-[72rpx] h-[72rpx] mb-[8rpx]" src={PlaceholderIcon} />
              <Text class="text-[26rpx] text-[#333] text-center font-medium tracking-[1px]">
                {func.name}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View class="flex flex-col items-center justify-start min-h-screen py-[32rpx] box-border bg-gradient-to-br from-[#e0eafc] to-[#cfdef3]">
      <FunctionBlock title="用户" functions={userFunctions} />
      <FunctionBlock title="部门成员" functions={memberFunctions} />
      <FunctionBlock title="部长" functions={adminFunctions} />
    </View>
  );
}
