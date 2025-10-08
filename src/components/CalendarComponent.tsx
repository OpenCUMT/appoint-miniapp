import { createSignal, Show, createEffect, onMount } from 'solid-js';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';

interface CalendarDay {
  day: number;
  status: 'available' | 'busy' | 'full';
  slots?: number;
}

interface CalendarComponentProps {
  onDateSelect?: (date: string) => void;
  onClose?: () => void;
}

export const CalendarComponent = (props: CalendarComponentProps) => {
  const systemInfo = Taro.getSystemInfoSync();
  const safeTop = systemInfo.safeArea?.top ?? 0;
  const safeBottom = systemInfo.screenHeight - (systemInfo.safeArea?.bottom ?? systemInfo.screenHeight);

  const [isClosing, setIsClosing] = createSignal(false);
  const [isAnimating, setIsAnimating] = createSignal(false);
  const [isVisible, setIsVisible] = createSignal(false);

  // 状态管理
  const [currentMonth, setCurrentMonth] = createSignal(new Date());

  // 组件挂载时触发进入动画
  onMount(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(true);
    }, 50);
  });

  // 生成日历数据
  const generateCalendarDays = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // 获取当月第一天和最后一天
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // 获取上个月最后几天
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    // 计算第一周前的空白天数
    const firstWeekday = firstDayOfMonth.getDay();
    const prevMonthDays: CalendarDay[] = [];
    for (let i = firstWeekday - 1; i >= 0; i--) {
      prevMonthDays.push({
        day: prevMonthLastDay - i,
        status: 'available',
        slots: Math.floor(Math.random() * 10) + 1
      });
    }

    // 当月天数
    const currentMonthDays: CalendarDay[] = [];
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      // 随机生成状态：available(60%), busy(25%), full(15%)
      const rand = Math.random();
      let status: 'available' | 'busy' | 'full' = 'available';

      if (rand < 0.15) {
        status = 'full';
      } else if (rand < 0.4) {
        status = 'busy';
      }

      currentMonthDays.push({
        day,
        status,
        slots: status === 'available' ? Math.floor(Math.random() * 10) + 1 : undefined
      });
    }

    // 下个月前几天的空白天数
    const nextMonthDays: CalendarDay[] = [];
    const totalCells = 42; // 6行 × 7天
    const remainingCells = totalCells - prevMonthDays.length - currentMonthDays.length;

    for (let day = 1; day <= remainingCells; day++) {
      nextMonthDays.push({
        day,
        status: 'available',
        slots: Math.floor(Math.random() * 10) + 1
      });
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  // 切换月份
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth().getFullYear(), currentMonth().getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth().getFullYear(), currentMonth().getMonth() + 1, 1));
  };

  // 处理日期点击 - 直接选择并关闭
  const handleDayClick = (day: CalendarDay) => {
    if (day.status === 'available') {
      const year = currentMonth().getFullYear();
      const month = currentMonth().getMonth();
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`;

      // 添加点击动画效果
      setIsClosing(true);

      // 延迟执行选择和关闭，让动画有时间播放
      setTimeout(() => {
        if (props.onDateSelect) {
          props.onDateSelect(dateStr);
        }
      }, 200);
    }
  };


  // 渲染日历
  const renderCalendar = () => {
    const days = generateCalendarDays(currentMonth());
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

    return (
      <View
        class={`calendar-container bg-white h-full w-full overflow-hidden flex flex-col transition-all duration-300 transform ${
          isVisible() ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        } ${isClosing() ? 'translate-y-full opacity-0 scale-95' : ''}`}
      >
        {/* 日历头部 */}
        <View
          class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-6 flex justify-between items-center"
          style={{ 'padding-top': `${safeTop + 24}px`, 'padding-bottom': '24px' }}
        >
          <Button
            onClick={handlePrevMonth}
            class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-xl font-light hover:bg-opacity-30 transition-all"
          >
            ‹
          </Button>
          <Text class="text-2xl font-semibold text-white">{currentMonth().getFullYear()}年{currentMonth().getMonth() + 1}月</Text>
          <Button
            onClick={handleNextMonth}
            class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-xl font-light hover:bg-opacity-30 transition-all"
          >
            ›
          </Button>
        </View>

        {/* 星期标题 */}
        <View class="grid grid-cols-7 text-center py-4 bg-gray-50 border-b border-gray-100">
          {weekdays.map((day, index) => (
            <Text class={`text-base font-medium ${index === 0 || index === 6 ? 'text-red-500' : 'text-gray-700'}`}>{day}</Text>
          ))}
        </View>

        {/* 日历格子 */}
        <View class="grid grid-cols-7 gap-1 bg-gray-50 p-2 flex-1">
          {days.map((day, index) => {
            const isCurrentMonth = index >= 7 && index < days.length - 7;
            const isToday = day.day === new Date().getDate() && isCurrentMonth &&
                           currentMonth().getMonth() === new Date().getMonth() &&
                           currentMonth().getFullYear() === new Date().getFullYear();

            return (
              <View
                class={`w-full h-full flex flex-col items-center justify-center rounded-lg transition-all duration-300 ${
                  !isCurrentMonth ? 'opacity-40' : ''
                } ${
                  day.status === 'full' ? 'bg-red-100 text-red-600 border border-red-200' :
                  day.status === 'busy' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                  'bg-white text-gray-800 border border-gray-200 hover:border-blue-300 hover:shadow-md'
                } ${
                  day.status === 'available' ? 'cursor-pointer active:scale-95 active:shadow-sm' : ''
                } ${
                  isToday ? 'ring-2 ring-blue-500 ring-offset-1 shadow-sm' : ''
                } ${
                  isVisible() ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{
                  'animation-delay': `${index * 30}ms`,
                  'animation-fill-mode': 'both',
                  'min-height': '0',
                  'min-width': '0'
                }}
                onClick={() => handleDayClick(day)}
              >
                <Text class={`text-sm font-medium transition-colors duration-200 ${isToday ? 'text-blue-600 font-bold' : ''}`}>{day.day}</Text>
                {day.slots !== undefined && (
                  <Text class={`text-xs mt-0.5 transition-colors duration-200 ${day.status === 'available' ? 'text-green-600' : 'text-gray-500'}`}>
                    {day.slots}名额
                  </Text>
                )}
              </View>
            );
          })}
        </View>

      </View>
    );
  };

  return (
    <Show when={true}>
      {renderCalendar()}
    </Show>
  );
};
