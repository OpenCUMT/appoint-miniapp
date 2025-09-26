import { View, Text, Input, Button, Textarea } from "@tarojs/components";
import { useLoad, useDidShow } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import { createEffect, createSignal, For } from "solid-js";
import { userInfo, } from "@/utils/user";
import request from "@/services/request";
import CalendarModal from "./CalendarModal";

// 定义表单字段的类型接口
interface FormField {
  id: string;
  type: "text" | "number" | "picker" | "date" | "time" | "select" | "textarea" | "images"; // 扩展类型
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // select 专用
  validation?: { maxLength?: number } | null;
  max?: number; // images 专用
  maxSizeMB?: number; // images 专用
}

export default function Index() {
  // 使用 signal 存储动态表单的配置
  const [formFields, setFormFields] = createSignal<FormField[]>([]);
  // 存储表单的标题
  const [formTitle, setFormTitle] = createSignal("加载中...");
  // 使用 signal 存储用户输入的数据
  const [formData, setFormData] = createSignal<Record<string, string | string[]>>({});

  const [calendarVisible, setCalendarVisible] = createSignal(false);
  const [calendarTargetField, setCalendarTargetField] = createSignal<string | null>(null);
  const [calendarYear, setCalendarYear] = createSignal(new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = createSignal(new Date().getMonth() + 1);
  const [disabledDates, setDisabledDates] = createSignal<Set<string>>(new Set());

  const openCalendar = (fieldId: string) => {
    console.log("打开日历，目标字段:", fieldId);
    setCalendarTargetField(fieldId);
    const cur = formData()[fieldId] as string;
    const d = cur ? new Date(cur) : new Date();
    setCalendarYear(d.getFullYear());
    setCalendarMonth(d.getMonth() + 1);
    setCalendarVisible(true);
  };

  createEffect(() => {
    const department = userInfo().department;
    if (department) {
      setFormTitle(department);
    } else {
      setFormTitle("加载中...");
    }
  });
  // 默认回退的 components（你提供的后端样例）
  const defaultComponents: FormField[] = [
    { id: "name", label: "姓名", type: "text", required: true, placeholder: "请输入您的姓名" },
    {
      id: "contact",
      label: "联系方式",
      type: "text",
      required: true,
      placeholder: "请输入联系方式",
      validation: { maxLength: 11 },
    },
    { id: "date", label: "预约日期", type: "date", required: true },
    { id: "time", label: "预约时间", type: "time", required: true },
    { id: "repairType", label: "维修类型", type: "select", required: true, options: ["硬件", "软件", "网络"] },
    { id: "remark", label: "备注", type: "textarea", required: false, placeholder: "若有补充信息，请在此填写" },
    { id: "images", label: "图片", type: "images", max: 1, maxSizeMB: 3 },
  ];

  // 抽取请求逻辑，供 useLoad / useDidShow 共用
  const fetchForm = async () => {
    console.log("fetchForm: 请求表单结构...");
    try {
      const resp = await request({ url: "/appointment/components", method: "GET" });
      console.log("fetchForm: 后端原始响应 ->", resp);

      // 兼容后端不同结构：
      // - { code:0, data: { formTitle, fields: [...] } }
      // - { code:0, data: { components: [...] } }
      // - 直接返回数组
      let components: FormField[] | undefined;
      // 响应可能是一个带 code/data 的对象，也可能拦截器已剥离
      const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;
      if (isObject(resp)) {
        // 优先识别后端业务格式
        const maybe = resp as Record<string, unknown>;
        if (typeof maybe["code"] === "number" && maybe["code"] === 0 && maybe["data"]) {
          const d = maybe["data"];
          if (Array.isArray(d)) components = d as FormField[];
          else if (isObject(d)) {
            const dd = d as Record<string, unknown>;
            if (Array.isArray(dd["fields"])) components = dd["fields"] as unknown as FormField[];
            else if (Array.isArray(dd["components"])) components = dd["components"] as unknown as FormField[];
            if (typeof dd["formTitle"] === "string") setFormTitle(dd["formTitle"] as string);
          }
        } else if (Array.isArray(maybe)) {
          components = maybe as FormField[];
        } else {
          // 有时拦截器会直接把 data 返回
          if (isObject(maybe) && Array.isArray((maybe as Record<string, unknown>)["fields"]))
            components = (maybe as Record<string, unknown>)["fields"] as unknown as FormField[];
          else if (isObject(maybe) && Array.isArray((maybe as Record<string, unknown>)["components"]))
            components = (maybe as Record<string, unknown>)["components"] as unknown as FormField[];
        }
      }

      if (!components || components.length === 0) {
        console.warn("fetchForm: 未从后端获取到 components，使用默认回退值");
        components = defaultComponents;
      }

      setFormFields(components);
      // 初始化 formData：images -> [], 其它 -> ''
      const initialData: Record<string, string | string[]> = {};
      components.forEach((f) => {
        initialData[f.id] = f.type === "images" ? [] : "";
      });
      setFormData(initialData);
    } catch (err) {
      console.error("fetchForm: 请求失败 ->", err);
      setFormTitle("加载失败");
      setFormFields(defaultComponents);
      const initialData: Record<string, string | string[]> = {};
      defaultComponents.forEach((f) => {
        initialData[f.id] = f.type === "images" ? [] : "";
      });
      setFormData(initialData);
    }
  };

  // 页面首次加载与每次显示都刷新表单
  useLoad(() => {
    fetchForm();
  });
  useDidShow(() => {
    fetchForm();
  });

  // 处理输入变化
  const handleInputChange = (fieldId: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
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
    //我的预约不知道为什么没有渲染出来
    <View class="flex flex-col items-center p-5 bg-white min-h-screen">
      {/* 顶部导航 */}
      <View class="w-full text-right pr-2.5 mb-5">
        <Text class="text-sm text-gray-500" onClick={goToMyAppointment}>
          我的预约
        </Text>
      </View>

      {/* Logo */}
      <View class="mt-5 mb-10">
        <Text class="text-5xl font-bold">{formTitle()}</Text>
      </View>

      {/* 动态表单区域 */}
      <View class="w-full flex flex-col gap-4">
        <For each={formFields()}>
          {(field) => (
            <View class="w-full">
              <Text class="block text-sm text-gray-800 mb-1.5">
                {field.label}
                {field.required && <Text class=" ml-0.5">*</Text>}
              </Text>

              {field.type === "textarea" ? (
                <Textarea
                  class="w-full h-24 border rounded-lg px-2.5 text-base box-border"
                  placeholder={field.placeholder}
                  value={(formData()[field.id] as string) || ""}
                  onInput={(e) => handleInputChange(field.id, e.detail.value)}
                />
              ) : field.type === "select" ? (
                <Button
                  class="w-full h-11 text-left rounded-lg"
                  onClick={async () => {
                    const items = field.options || [];
                    try {
                      const res = (await Taro.showActionSheet({ itemList: items })) as { tapIndex?: number };
                      if (res.tapIndex !== undefined) {
                        handleInputChange(field.id, items[res.tapIndex]);
                      }
                    } catch (err) {
                      console.error("showActionSheet error", err);
                    }
                  }}
                >
                  {(formData()[field.id] as string) || "请选择"}
                </Button>
              ) : field.type === "date" ?(
                <View
                  onClick={()=>{
                    console.log("点击日期");
                      openCalendar(field.id);
                  }}
                  class="w-full h-11 border rounded-lg px-2.5 text-base box-border flex items-center">
                  <Text class="text-gray-500">
                    {(formData()[field.id] as string) || "请点此选择日期"}
                  </Text>
                </View>
              )
              : field.type === "images" ? (
                <Button
                  class="w-full h-11 rounded-lg"
                  onClick={async () => {
                    try {
                      const r = (await Taro.chooseImage({ count: field.max || 1 })) as { tempFilePaths?: string[] };
                      const paths = r.tempFilePaths || [];
                      const prev = (formData()[field.id] as string[]) || [];
                      handleInputChange(field.id, prev.concat(paths));
                    } catch (err) {
                      console.error("chooseImage error", err);
                    }
                  }}
                >
                  上传图片
                </Button>
              ) : (
                // 默认使用 Input
                <Input
                  class="w-full h-11 border  rounded-lg px-2.5 text-base box-border"
                  type={field.type === "number" ? "number" : "text"}
                  placeholder={field.placeholder}
                  value={(formData()[field.id] as string) || ""}
                  onInput={(e) => handleInputChange(field.id, e.detail.value)}
                />
              )}
            </View>
          )}
        </For>
      </View>
      {/* 日历弹窗 */}
      <CalendarModal
        visible={calendarVisible()}
        year={calendarYear()}
        month={calendarMonth()}
        value={calendarTargetField() ? (formData()[calendarTargetField()!] as string) : ""}
        onClose={() => setCalendarVisible(false)}
        onConfirm={(dateStr) => {
          if (calendarTargetField()) {
            handleInputChange(calendarTargetField()!, dateStr);
          }
          setCalendarVisible(false);
        }}
        disabledDates={disabledDates()}
      >
      </CalendarModal>
      {/* 提交按钮 */}
      <View class="w-full mt-10">
        <Button class=" text-black rounded-lg" onClick={handleSubmit}>
          立即预约
        </Button>
      </View>
    </View>
  );
}
