/** تسميات وألوان كل أنواع أحداث المباراة القادمة من "في الجول" أو المستنتجة من التعليق. */

export const EVENT_LABEL: Record<string, string> = {
  goal: "هدف",
  "own-goal": "هدف عكسي",
  penalty: "هدف من ضربة جزاء",
  "penalty-goal": "هدف من ضربة جزاء",
  "missed-penalty": "ضربة جزاء ضائعة",
  "penalty-awarded": "ركلة جزاء",
  "penalty-saved": "تصدي لركلة جزاء",
  "yellow-card": "بطاقة صفراء",
  "second-yellow": "صفراء ثانية",
  "red-card": "بطاقة حمراء",
  substitution: "تبديل",
  injury: "إصابة",
  corner: "ركلة ركنية",
  offside: "تسلل",
  freekick: "ركلة حرة",
  shot: "تسديدة",
  save: "تصدي",
  woodwork: "القائم / العارضة",
  var: "تقنية الفيديو",
  chance: "فرصة خطيرة",
  "kick-off": "بداية المباراة",
  "half-time": "نهاية الشوط الأول",
  "full-time": "نهاية المباراة",
  lineup: "التشكيل الرسمي",
};

export const eventLabel = (type: string) => EVENT_LABEL[type] ?? type;

export function eventEmoji(type: string): string {
  if (/own-goal/.test(type)) return "🥅";
  if (/goal|^penalty$/.test(type)) return "⚽";
  if (/missed-penalty|penalty-saved/.test(type)) return "❌";
  if (/penalty-awarded/.test(type)) return "🎯";
  if (/red/.test(type)) return "🟥";
  if (/yellow/.test(type)) return "🟨";
  if (/substitution/.test(type)) return "🔁";
  if (/injury/.test(type)) return "🚑";
  if (/corner/.test(type)) return "🚩";
  if (/offside/.test(type)) return "🚫";
  if (/save/.test(type)) return "🧤";
  if (/woodwork/.test(type)) return "🪵";
  if (/var/.test(type)) return "📺";
  if (/freekick/.test(type)) return "🦶";
  if (/shot|chance/.test(type)) return "💥";
  if (/lineup/.test(type)) return "📋";
  return "•";
}

export function eventTone(type: string): string {
  if (/own-goal/.test(type)) return "border-destructive/40 bg-destructive/10 text-destructive";
  if (/goal|^penalty$/.test(type)) return "border-primary/40 bg-primary/10 text-primary";
  if (/red/.test(type)) return "border-live/40 bg-live/10 text-live";
  if (/yellow/.test(type)) return "border-gold/40 bg-gold/10 text-gold";
  if (/penalty-awarded|var/.test(type)) return "border-gold/40 bg-gold/10 text-gold";
  return "border-border/70 bg-secondary/50 text-muted-foreground";
}
