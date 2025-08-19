import { Image, Text, View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import Taro from "@tarojs/taro";
// import "./index.scss"; // 样式已迁移至 Tailwind CSS，不再需要此文件

// 导入图标资源 (请确保您在assets/icon目录下有这些图标)
import UserIcon from "@/assets/icon/placeholder.png";
import HistoryIcon from "@/assets/icon/placeholder.png";
import HelpIcon from "@/assets/icon/placeholder.png";
import InfoIcon from "@/assets/icon/placeholder.png";
import AgreementIcon from "@/assets/icon/placeholder.png";
import ChevronRight from "@/assets/icon/placeholder.png";
import AvatarPlaceholder from "@/assets/icon/placeholder.png"; // 用户头像占位符

export default function Manage() {
  useLoad(() => {
    console.log("用户管理页面加载.");
  });

  // 模拟用户信息
  const userInfo = {
    name: "开发者",
    avatar: AvatarPlaceholder,
  };

  // 列表项数据
  const menuItems = [
    {
      icon: UserIcon,
      label: "个人信息",
      onClick: () => Taro.navigateTo({ url: "/pages/userInfo/index" }),
    },
    {
      icon: HistoryIcon,
      label: "预约记录",
      onClick: () => Taro.navigateTo({ url: "/pages/history/index" }),
    },
    {
      icon: HelpIcon,
      label: "使用帮助",
      onClick: () => Taro.navigateTo({ url: "/pages/help/index" }),
    },
  ];

  const aboutItems = [
    {
      icon: InfoIcon,
      label: "关于部门1",
      onClick: () => Taro.navigateTo({ url: "/pages/about/index" }),
    },
    {
      icon: InfoIcon,
      label: "关于部门2",
      onClick: () => Taro.navigateTo({ url: "/pages/about/index" }),
    },
    {
      icon: AgreementIcon,
      label: "服务协议",
      onClick: () => Taro.navigateTo({ url: "/pages/agreement/index" }),
    },
  ];

  const renderMenuItem = (item) => (
    <View class="flex items-center p-[32rpx] relative transition-colors duration-200 cursor-pointer active:bg-[#f2f3f5] last:border-b-0 border-b border-solid border-transparent border-b-[#ebedf0]" onClick={item.onClick}>
      <Image class="w-[48rpx] h-[48rpx] mr-[32rpx]" src={item.icon} mode="aspectFit" />
      <Text class="flex-1 text-[30rpx] text-[#323233]">{item.label}</Text>
      <Image class="w-[32rpx] h-[32rpx] opacity-50" src={ChevronRight} mode="aspectFit" />
    </View>
  );

  return (
    <View class="min-h-screen bg-[#f7f8fa] pb-[32rpx]">
      {/* 用户信息头部 */}
      <View class="flex items-center py-[60rpx] px-[40rpx] bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] mb-[32rpx]">
        <Image class="w-[120rpx] h-[120rpx] rounded-full border-[4rpx] border-white shadow-[0_4rpx_12rpx_rgba(0,0,0,0.1)] mr-[32rpx]" src={userInfo.avatar} />
        <Text class="text-[40rpx] font-semibold text-[#2b5876]">{userInfo.name}</Text>
      </View>

      {/* 功能列表 */}
      <View class="bg-white rounded-[16rpx] mx-[32rpx] mb-[32rpx] overflow-hidden shadow-[0_4rpx_16rpx_rgba(0,0,0,0.04)]">
        {menuItems.map(renderMenuItem)}
      </View>

      {/* 关于列表 */}
      <View class="bg-white rounded-[16rpx] mx-[32rpx] mb-[32rpx] overflow-hidden shadow-[0_4rpx_16rpx_rgba(0,0,0,0.04)]">
        {aboutItems.map(renderMenuItem)}
      </View>
    </View>
  );
}
