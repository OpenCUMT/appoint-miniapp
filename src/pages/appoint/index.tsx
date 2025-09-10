import { View, Text, Input, Button } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { createEffect, createSignal, For } from 'solid-js';
import {userInfo} from '@/utils/user';

// 定义表单字段的类型接口
interface FormField {
  id: string;
  type: 'text' | 'number' | 'picker'; // 可扩展更多类型
  label: string;
  placeholder: string;
  required: boolean;
}

// 模拟后端返回的 JSON 数据
const mockApiResponse = {
  success: true,
  data: {
    formTitle: "部门1",
    fields: [
      {
        id: 'customerName',
        type: 'text',
        label: '您的姓名',
        placeholder: '请输入您的姓名',
        required: true,
      },
      {
        id: 'phoneNumber',
        type: 'number',
        label: '手机号码',
        placeholder: '请输入您的联系电话',
        required: true,
      },
    ]
  }
};

export default function Index() {
  // 使用 signal 存储动态表单的配置
  const [formFields, setFormFields] = createSignal<FormField[]>([]);
  // 存储表单的标题
  const [formTitle, setFormTitle] = createSignal("加载中...");
  // 使用 signal 存储用户输入的数据
  const [formData, setFormData] = createSignal<{ [key: string]: any }>({});
  createEffect(()=>{
        const department=userInfo().department;
        if(department){
          setFormTitle(department);
        }else{
          setFormTitle("加载中...");
        }
  });
  useLoad(() => {
    // 模拟异步请求获取表单结构
    console.log("页面加载，开始请求表单数据...");
    setTimeout(() => {
      const response = mockApiResponse;
      if (response.success) {
        setFormTitle(response.data.formTitle);
        setFormFields(response.data.fields);
        // 初始化 formData
        const initialData = {};
        response.data.fields.forEach(field => {
          initialData[field.id] = '';
        });
        setFormData(initialData);
      }
    }, 1000); // 模拟1秒网络延迟
  });

  // 处理输入变化
  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  // 提交表单
  const handleSubmit = () => {
    console.log("提交的表单数据:", formData());
    // 在这里可以添加数据校验和提交到后端的逻辑
  };

  // 跳转到“我的预约”
  const goToMyAppointment = () => {
    console.log("跳转到我的预约页面");
  };

  return (
    <View class='flex flex-col items-center p-5 bg-white min-h-screen'>
      {/* 顶部导航 */}
      <View class='w-full text-right pr-2.5 mb-5'>
        <Text class='text-sm text-gray-500' onClick={goToMyAppointment}>我的预约</Text>
      </View>

      {/* Logo */}
      <View class='mt-5 mb-10'>
        <Text class='text-5xl font-bold'>{formTitle()}</Text>
      </View>

      {/* 动态表单区域 */}
      <View class='w-full flex flex-col gap-4'>
        <For each={formFields()}>
          {(field) => (
            <View class='w-full'>
              <Text class='block text-sm text-gray-800 mb-1.5'>
                {field.label}
                {field.required && <Text class=' ml-0.5'>*</Text>}
              </Text>
              <Input
                class='w-full h-11 border  rounded-lg px-2.5 text-base box-border'
                type={field.type}
                placeholder={field.placeholder}
                value={formData()[field.id]}
                onInput={(e) => handleInputChange(field.id, e.detail.value)}
              />
            </View>
          )}
        </For>
      </View>

      {/* 提交按钮 */}
      <View class='w-full mt-10'>
        <Button
          class=' text-black rounded-lg'
          onClick={handleSubmit}
        >
          立即预约
        </Button>
      </View>
    </View>
  );
}
