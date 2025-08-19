export default defineAppConfig({
  pages: ["pages/index/index",
    "pages/appoint/index",
    "pages/manage/index",
    "pages/settings/index",
    "pages/about/index",
    "pages/agreement/index",
    "pages/history/index",
    "pages/userInfo/index",
    "pages/help/index"
  ],
  tabBar: {
    color: "#7A7E83",
    selectedColor: "#cfdef3",
    backgroundColor: "#fff",
    borderStyle: "white",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "assets/icon/placeholder.png",
        selectedIconPath: "assets/icon/placeholder.png",
        text: "首页",
      },
      {
        pagePath: "pages/appoint/index",
        iconPath: "assets/icon/placeholder.png",
        selectedIconPath: "assets/icon/placeholder.png",
        text: "预约",
      },
      {
        pagePath: "pages/manage/index",
        iconPath: "assets/icon/placeholder.png",
        selectedIconPath: "assets/icon/placeholder.png",
        text: "管理",
      },
      {
        pagePath: "pages/settings/index",
        iconPath: "assets/icon/placeholder.png",
        selectedIconPath: "assets/icon/placeholder.png",
        text: "设置",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
