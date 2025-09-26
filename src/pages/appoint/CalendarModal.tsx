import { View, Text, Button } from "@tarojs/components";
import { createSignal, createEffect } from "solid-js";

type Props = {
  visible: boolean;
  year: number;
  month: number; // 1-12
  value?: string; // 'YYYY-MM-DD'
  onClose: () => void;
  onConfirm: (dateStr: string) => void;
  disabledDates?: Set<string>;
};

export default function CalendarModal(props: Props) {
  const [curYear, setCurYear] = createSignal(props.year);
  const [curMonth, setCurMonth] = createSignal(props.month);
  const [sel, setSel] = createSignal(props.value || "");

  createEffect(() => {
    if (props.visible) {
      setCurYear(props.year);
      setCurMonth(props.month);
      setSel(props.value || "");
    }
  });

  const getMonthGrid = (y: number, m: number) => {
    const first = new Date(y, m - 1, 1);
    const firstWeekday = first.getDay(); // 0-6
    const days = new Date(y, m, 0).getDate();
    const grid: (number | null)[] = [];
    for (let i = 0; i < firstWeekday; i++) grid.push(null);
    for (let d = 1; d <= days; d++) grid.push(d);
    return grid;
  };

  const onPrev = () => {
    let y = curYear(), mm = curMonth() - 1;
    if (mm < 1) { mm = 12; y -= 1; }
    setCurYear(y); setCurMonth(mm);
  };
  const onNext = () => {
    let y = curYear(), mm = curMonth() + 1;
    if (mm > 12) { mm = 1; y += 1; }
    setCurYear(y); setCurMonth(mm);
  };

  const pad = (n: number) => String(n).padStart(2, "0");
  const format = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;

  if (!props.visible) return null;

  const grid = getMonthGrid(curYear(), curMonth());

  return (
    <View class="fixed inset-0 bg-black/40 flex items-end">
      <View class="w-full bg-white rounded-t-xl p-4">
        <View class="flex items-center justify-between mb-3">
          <Button onClick={onPrev}>上月</Button>
          <Text class="text-lg font-semibold">{curYear()}年{curMonth()}月</Text>
          <Button onClick={onNext}>下月</Button>
        </View>

        <View class="grid grid-cols-7 gap-1 text-center text-sm text-gray-600 mb-2">
          <Text>日</Text><Text>一</Text><Text>二</Text><Text>三</Text><Text>四</Text><Text>五</Text><Text>六</Text>
        </View>

        <View class="grid grid-cols-7 gap-1">
          {grid.map((day) => {
            if (day === null) {
              return <View class="h-10" />;
            }
            const dateStr = format(curYear(), curMonth(), day);
            const disabled = props.disabledDates?.has(dateStr) ?? false;
            const isSel = sel() === dateStr;
            return (
              <Button
                disabled={disabled}
                class={`h-10 rounded ${disabled ? "text-gray-300 bg-white" : isSel ? "bg-red-500 text-white" : "bg-white"}`}
                onClick={() => { if (!disabled) setSel(dateStr); }}
              >
                <Text>{day}</Text>
              </Button>
            );
          })}
        </View>

        <View class="flex gap-2 mt-4">
          <Button class="flex-1" onClick={props.onClose}>取消</Button>
          <Button class="flex-1 bg-red-600 text-white" onClick={() => { props.onConfirm(sel() || format(curYear(), curMonth(), 1)); }}>
            确认选择
          </Button>
        </View>
      </View>
    </View>
  );
}
