import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";


export default function Index() {
  //假设用用户id向后端请求了预约记录数据，并渲染在页面上
  //记录数据的格式为姓名·维修类型·预约时间·是否完成·详情
  const records = [
    {
      id: 1,
      name: "张三",
      type: "电脑维修",
      time: "2023-10-01 10:00",
      status: "已完成",
      details: "更换硬盘"
    },
    {
      id: 2,
      name: "李四",
      type: "手机维修",
      time: "2023-10-02 14:00",
      status: "未完成",
      details: "屏幕更换"
    },
    {
      id: 3,
      name: "王五",
      type: "网络问题",
      time: "2023-10-03 09:30",
      status: "已完成",
      details: "无法连接校园网"
    }
  ];

  useLoad(() => {
    // 在这里可以放置从后端获取数据的真实逻辑
    console.log("Page loaded.");
  });

  return (
    <View class="flex flex-col items-center min-h-screen py-[32rpx] box-border bg-gradient-to-br from-[#e0eafc] to-[#cfdef3]">
      {records.map((record) => (
        <View key={record.id} class="w-[90%] bg-white/90 rounded-[18rpx] shadow-[0_8rpx_24rpx_rgba(0,0,0,0.08)] p-[24rpx] mb-[24rpx]">
          <View class="flex flex-row justify-between items-center mb-[16rpx] pb-[16rpx] border-b border-gray-200">
            <Text class="text-[32rpx] font-semibold text-[#2b5876]">{record.type}</Text>
            <Text class={`text-[28rpx] font-medium ${record.status === '已完成' ? 'text-green-500' : 'text-orange-500'}`}>
              {record.status}
            </Text>
          </View>
          <View class="flex flex-col gap-y-2 text-[28rpx] text-[#555]">
            <View>
              <Text class="font-medium text-gray-600 w-[140rpx] inline-block">维修单号:</Text>
              <Text>{record.id}</Text>
            </View>
            <View>
              <Text class="font-medium text-gray-600 w-[140rpx] inline-block">姓名:</Text>
              <Text>{record.name}</Text>
            </View>
            <View>
              <Text class="font-medium text-gray-600 w-[140rpx] inline-block">预约时间:</Text>
              <Text>{record.time}</Text>
            </View>
            <View>
              <Text class="font-medium text-gray-600 w-[140rpx] inline-block">详情:</Text>
              <Text>{record.details}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
