import { Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import request from "@/services/request";
import {setUserInfo,userInfo} from "@/store/user";
export default function loginWechat() {
  const handleGetUserProfile = async()=>{
    try{
      const loginRes = await Taro.login();
      if(loginRes.code){
        Taro.showLoading({ title: '登录中...' });

        const authRes = await request({
          url:'/login',
          method:'POST',
          data:{ code: loginRes.code }
        });
        if(authRes.data.token){
          console.log('获取到的 token:', authRes.data.token);
          Taro.setStorageSync('token', authRes.data.token);
          Taro.hideLoading();
          setUserInfo({
            ...userInfo(),
            token:authRes.data.token
          });
          console.log('当前用户信息:', userInfo());
          Taro.showToast({ title: '登录成功' });
          Taro.switchTab({ url: '/pages/index/index' });
        }else{
          Taro.hideLoading();
          Taro.showToast({ title: '登录失败，未获取到 token'});
        }
      }else{
        throw new Error('微信登录失败，未获取到 code'+loginRes.errMsg);
      }
    }catch(error){
      Taro.hideLoading();
      console.error('登录失败:', error);
      Taro.showToast({ title: '登录失败，请稍后重试', icon: 'none' });
    }
  }

  return (
    <Button onClick={handleGetUserProfile}>
      授权并登录
    </Button>
  );
}
