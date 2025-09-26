import { createSignal } from "solid-js";
import Taro from "@tarojs/taro";
import request from "@/services/request";

// 用户信息类型定义
export interface UserInfo {
  token: string;
  username: string;
  avatar: string;
  studentId: string;
  departmentId: number;
  isAdmin: boolean;
  //不止，还要加
}

// 默认用户信息
const getDefaultUserInfo = (): UserInfo => ({
  token: "",
  name: "开发者",
  avatar: "",
  studentId: "082333333",
  departmentId:1,
  isAdmin: true,
});

// 全局用户信息信号
const [userInfo, setUserInfo] = createSignal<UserInfo>(getDefaultUserInfo());

// 部门列表信号
const [departments, setDepartments] = createSignal([
  {id:1, name:"部门1"},
  {id:2, name:"部门2"},
  {id:3, name:"部门3"}
]);

//获取并刷新部门信息
export const fetchDepartments = async ()=>{
  const departmentsFromServer = await request({
    url:'/departments',
    method:'GET',
  });
  if(departmentsFromServer.data){
    setDepartments(departmentsFromServer.data);
  }else{
    Taro.showToast({
      title: '尚未登录或登录已过期',
      icon: 'none'
    });
  }
}

//获取并刷新用户信息
export const fetchUserData = async ()=>{
  const userDataFromServer =await request({
    url: '/user/info',
    method: 'GET',
  });
  if(userDataFromServer.data){
    setUserInfo({
      token: userInfo().token, // 保持现有 token 不变
      username: userDataFromServer.data.username,
      avatar: userDataFromServer.data.avatar,
      studentId: userDataFromServer.data.studentId,
      departmentId: userDataFromServer.data.department,
      isAdmin: userDataFromServer.data.isAdmin,
    });
  }else{
    Taro.showToast({
      title: '尚未登录或登录已过期',
      icon: 'none'
    });
  }
}

export {setUserInfo, userInfo, departments, setDepartments};
