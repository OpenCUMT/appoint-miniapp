import { createSignal } from "solid-js";
import Taro from "@tarojs/taro";

// 用户信息类型定义
export interface UserInfo {
  name: string;
  avatar: string;
  studentId: string;
  department: string;
  isAdmin: boolean;
  //不止，还要加
}

// 默认用户信息
const getDefaultUserInfo = (): UserInfo => ({
  name: "开发者",
  avatar: "",
  studentId: "082333333",
  department: "部门1",
  isAdmin: true,
});

// 全局用户信息信号
const [userInfo, setUserInfo] = createSignal<UserInfo>(getDefaultUserInfo());

// 部门列表信号
const [departments, setDepartments] = createSignal<string[]>([
  "部门1",
  "部门2",
  "部门3"
]);

// 导出用户相关方法
export const userStore = {

  get userInfo() {
    return userInfo();
  },

  get departments() {
    return departments();
  },

  updateUserDepartment: (department: string) => {
    setUserInfo(prev => ({ ...prev, department }));
    // 这里可以调用后端API更新用户信息
    // api.updateUserInfo({ department });
  },
};
//可以通过userStore访问，也可以通过userInfo, departments直接访问
export { userInfo, departments };



//实现部门切换
export const setUserDepartment = () => {
  Taro.showActionSheet({
    itemList: userStore.departments,
    success: (res) => {
      if (res.tapIndex !== undefined) {
        const selectedDepartment = userStore.departments[res.tapIndex];
        //将选中的部门更新到全局store
        userStore.updateUserDepartment(selectedDepartment);
      }
    },
    fail: () => {
        Taro.showToast({ title: "已取消", icon: "none" });
    },
  });
};

