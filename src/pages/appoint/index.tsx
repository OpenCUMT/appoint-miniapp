import { View,Text} from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { createSignal } from 'solid-js';


export default function Index() {

  const [currentDepartment , setDepartment] = createSignal('奔腾');

  const departmentChange = () => {
    if (currentDepartment() === '奔腾'){
      setDepartment('IT服务部');
    } else{
      setDepartment('奔腾');
    }
  };

  return (
    <View class="text-bold ">

      <View class="absolute top-20 right-0 text-[#FF0000]">
        <Text>我的预约</Text>
      </View>

      <View class="flex justify-center">
        <View class=" mt-50 w-full h-9 relative text-center tracking-widest">
          <View class="absolute top-0 right-0 icon-[lucide--arrow-right-left] w-5 h-5 text-[#FF0000] " onTap={departmentChange} />
          <Text class="text-2xl text-[#FF0000]">{currentDepartment()}</Text>
        </View>
      </View>

      <View class="flex justify-center">
        <View class="m-10 border-4 border-red-500">
          <Text>newapoint</Text>
        </View>
      </View>

    </View>
  );
}
