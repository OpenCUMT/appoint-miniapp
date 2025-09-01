// 导出用户相关方法
import {setUserInfo, userInfo, departments, setDepartments} from "../store/user";
import Taro from "@tarojs/taro";
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
export { userInfo, departments,setUserInfo };


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
