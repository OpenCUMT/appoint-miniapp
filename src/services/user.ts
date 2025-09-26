import request from "./request";

//获取并刷新用户信息
export const fetchUserData = async ()=>{
  try{
    const response = await request({
      url: '/user/info',
      method: 'GET',
    });
    console.log('用户信息:', response);
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
}

