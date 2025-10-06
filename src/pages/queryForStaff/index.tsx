import {Text, View} from "@tarojs/components";

export default function Index(){
  console.log("queryForStaff page");
  //模拟今日预约数据
  const todayAppointments = [
    {
      id:'1',
      name: "张三",
      connect: "123456789",
      date: "2023-10-01",
      time: "10:00",
      type: "电脑维修",
      details: "更换硬盘",
      commitTime: "2023-09-30 14:00",
      status: "未完成"
    },
    {
      id:'2',
      name: "李四",
      connect: "987654321",
      date: "2023-10-01",
      time: "14:00",
      type: "手机维修",
      details: "屏幕更换",
      commitTime: "2023-09-30 15:30",
      status: "已完成"
    },
    {
      id:'3',
      name: "王五",
      connect: "555666777",
      date: "2023-10-01",
      time: "09:30",
      type: "网络问题",
      details: "无法连接校园网",
      commitTime: "2023-09-30 16:00",
      status: "未完成"
    }
  ]

  return (
    <View class='p-5 bg-gray-100 min-h-screen'>
      <View class='mb-5 p-4 bg-white rounded-lg shadow-sm'>
        <Text class='text-base text-gray-800'>
          以下是今日的预约列表，请及时处理。
        </Text>
      </View>

      {todayAppointments.map(item => (
        <View key={item.id} class='bg-white rounded-lg p-4 mb-4 shadow-md'>
          <View class='flex flex-row mb-2 text-sm'>
            <Text class='w-20 text-gray-500 flex-shrink-0'>姓名：</Text>
            <Text class='text-gray-800 flex-grow'>{item.name}</Text>
          </View>
          <View class='flex flex-row mb-2 text-sm'>
            <Text class='w-20 text-gray-500 flex-shrink-0'>联系方式：</Text>
            <Text class='text-gray-800 flex-grow'>{item.connect}</Text>
          </View>
          <View class='flex flex-row mb-2 text-sm'>
            <Text class='w-20 text-gray-500 flex-shrink-0'>预约时间：</Text>
            <Text class='text-gray-800 flex-grow'>{item.date} {item.time}</Text>
          </View>
          <View class='flex flex-row mb-2 text-sm'>
            <Text class='w-20 text-gray-500 flex-shrink-0'>问题类型：</Text>
            <Text class='text-gray-800 flex-grow'>{item.type}</Text>
          </View>
          <View class='flex flex-row mb-2 text-sm'>
            <Text class='w-20 text-gray-500 flex-shrink-0'>问题详情：</Text>
            <Text class='text-gray-800 flex-grow'>{item.details}</Text>
          </View>
          <View class='flex flex-row mb-2 text-sm'>
            <Text class='w-20 text-gray-500 flex-shrink-0'>提交时间：</Text>
            <Text class='text-gray-800 flex-grow'>{item.commitTime}</Text>
          </View>
          <View class='flex flex-row items-center text-sm'>
            <Text class='w-20 text-gray-500 flex-shrink-0'>状态：</Text>
            <Text class={`font-bold ${item.status === '未完成' ? 'text-red-500' : 'text-green-500'}`}>
              {item.status}
            </Text>
          </View>
        </View>
      ))}
    </View>
  )
}
