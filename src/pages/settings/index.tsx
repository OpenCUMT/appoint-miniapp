import { Image, Text, View, Button } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import { userInfo,setUserDepartment } from "@/services/user";

// 图标资源请替换为实际路径
import AvatarPlaceholder from "@/assets/icon/placeholder.png";
import ChevronRight from "@/assets/icon/placeholder.png";

export default function Settings() {
  useLoad(() => {
    console.log("设置页面加载.");
    // 这里可以加载用户信息
    // api.getUserInfo().then(data => userStore.setUserInfo(data));
  });

  // 按钮列表
  const menuItems = [
    {
      label: "机构账号绑定/解绑",
      onClick: () => Taro.navigateTo({ url: "/pages/bindInstitutionId/index" }),
    },
    {
      label: "微信绑定/解绑",
      onClick: () => Taro.navigateTo({ url: "/pages/bindWechat/index" }),
    },
    {
      label: "联系我们",
      onClick: () => Taro.navigateTo({ url: "/pages/contact/index" }),
    },
    {
      label: "隐私协议",
      onClick: () => Taro.navigateTo({ url: "/pages/privacy/index" }),
    },
    {
      label: "第三方信息共享清单",
      onClick: () => Taro.navigateTo({ url: "/pages/shareList/index" }),
    },
    {
      label: "退出登录",
      onClick: () => Taro.navigateTo({ url: "/pages/logout/index" }),
    },
  ];

  // 管理员专属
  const adminItem = {
    label: "我的角色",
    onClick: () => Taro.navigateTo({ url: "/pages/role/index" }),
  };

  return (
    <View class="min-h-screen pb-[32rpx]">
      {/* 用户信息区 */}
      <View class="flex flex-row items-center py-[48rpx] px-[40rpx] mb-[32rpx] rounded-b-[32rpx]">
        <Image
          class="w-[120rpx] h-[120rpx] rounded-full border-[4rpx] border-white shadow-[0_4rpx_12rpx_rgba(0,0,0,0.1)] mb-[16rpx]"
          src={userInfo().avatar || AvatarPlaceholder}
        />
        <View class="flex flex-col flex-1 ml-[32rpx]">
          {/*开发者与管理员*/}
          <View class="flex flex-row">
            <Text class="text-[36rpx] font-semibold mb-[8rpx]"
            onClick={() => {
              console.log("跳转到登录页面");
              Taro.navigateTo({ url: "/pages/login/index"} )
              }}>{userInfo().name}</Text>
            {userInfo().isAdmin && (
              <View class="mt-[8rpx] px-[20rpx] py-[8rpx] rounded-[24rpx] text-[24rpx] font-medium">
                管理员
              </View>
            )}
          </View>
          <Text class="text-[28rpx] mb-[8rpx]">学号：{userInfo().studentId}</Text>
          <View class="flex flex-row items-center">
            <Text class="text-[28rpx]">{userInfo().department}</Text>
            <Button
              class="ml-[16rpx] py-[8rpx] rounded-[24rpx] text-[24rpx] font-medium"
              onClick={setUserDepartment}
            >
              切换部门
            </Button>
          </View>
        </View>
      </View>

      {/* 功能区 */}
      <View class="flex flex-col gap-[24rpx] px-[32rpx]">
        {menuItems.map((item, idx) => (
          <View
            class="flex items-center px-[32rpx] py-[24rpx] bg-white rounded-[12rpx] border text-[30rpx] font-medium active:bg-[#f2f3f5] transition-colors duration-200"
            onClick={item.onClick}
          >
            <Text class="flex-1">{item.label}</Text>
            <Image class="w-[32rpx] h-[32rpx] opacity-50" src={ChevronRight} mode="aspectFit" />
          </View>
        ))}
        {userInfo().isAdmin && (
          <View
            class="flex items-center px-[32rpx] py-[24rpx] bg-white rounded-[12rpx] border text-[30rpx] font-medium active:bg-[#e6f7ff] transition-colors duration-200"
            onClick={adminItem.onClick}
          >
            <Text class="flex-1">{adminItem.label}</Text>
            <Image class="w-[32rpx] h-[32rpx] opacity-50" src={ChevronRight} mode="aspectFit" />
          </View>
        )}
      </View>
    </View>
  );
}
