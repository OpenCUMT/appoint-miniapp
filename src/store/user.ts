import { createSignal } from "solid-js";
import Taro from "@tarojs/taro";

// 用户信息类型定义
export interface UserInfo {
  token: string;
  name: string;
  avatar: string;
  studentId: string;
  department: string;
  isAdmin: boolean;
  //不止，还要加
}

// 默认用户信息
const getDefaultUserInfo = (): UserInfo => ({
  token: "",
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

export {setUserInfo, userInfo, departments, setDepartments};
