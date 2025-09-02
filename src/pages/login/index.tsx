import { Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
export default function loginWechat() {
  const handleGetUserProfile = () => {
    Taro.getUserProfile({
      desc: "用于完善会员资料",
      success: (res) => {
        console.log(res);
      }
    });
  };

  return (
    <Button onClick={handleGetUserProfile}>
      授权并登录
    </Button>
  );
}
