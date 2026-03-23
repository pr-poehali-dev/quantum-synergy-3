import { useState } from "react"
import Icon from "@/components/ui/icon"

const initiatives = [
  {
    id: 1,
    title: "Ремонт качели во дворе дома 15",
    type: "fundraising",
    address: "ул. Льва Толстого, 15",
    collected: 5000,
    goal: 10000,
    volunteers: { current: 3, needed: 5 },
    author: "Анна К.",
    time: "2 часа назад",
  },
  {
    id: 2,
    title: "Высадка деревьев в сквере Мира",
    type: "volunteers",
    address: "Сквер Мира",
    collected: 0,
    goal: 0,
    volunteers: { current: 8, needed: 20 },
    author: "Игорь С.",
    time: "5 часов назад",
  },
  {
    id: 3,
    title: "Субботник у школы №47",
    type: "event",
    address: "ул. Пречистенка, 32",
    collected: 0,
    goal: 0,
    volunteers: { current: 15, needed: 30 },
    author: "Совет дома",
    time: "вчера",
  },
  {
    id: 4,
    title: "Замена освещения в подъезде №3",
    type: "fundraising",
    address: "Хамовнический вал, 10",
    collected: 12000,
    goal: 15000,
    volunteers: { current: 0, needed: 0 },
    author: "Марина В.",
    time: "вчера",
  },
  {
    id: 5,
    title: "Открытие детской площадки",
    type: "event",
    address: "Комсомольский пр., 22",
    collected: 0,
    goal: 0,
    volunteers: { current: 0, needed: 0 },
    author: "Управа района",
    time: "2 дня назад",
  },
]

const typeConfig = {
  fundraising: { color: "bg-red-500", label: "Сбор средств", icon: "CircleDollarSign" },
  volunteers: { color: "bg-green-500", label: "Волонтёры", icon: "Users" },
  event: { color: "bg-blue-500", label: "Мероприятие", icon: "CalendarDays" },
}

const mapPins = [
  { id: 1, type: "fundraising", x: 38, y: 42 },
  { id: 2, type: "volunteers", x: 62, y: 30 },
  { id: 3, type: "event", x: 55, y: 60 },
  { id: 4, type: "fundraising", x: 25, y: 68 },
  { id: 5, type: "event", x: 75, y: 52 },
]

const levels = [
  { level: 1, name: "Наблюдатель", minPoints: 0, color: "text-slate-400", bg: "bg-slate-500/20" },
  { level: 2, name: "Участник", minPoints: 100, color: "text-green-400", bg: "bg-green-500/20" },
  { level: 3, name: "Активист", minPoints: 300, color: "text-blue-400", bg: "bg-blue-500/20" },
  { level: 4, name: "Организатор", minPoints: 700, color: "text-violet-400", bg: "bg-violet-500/20" },
  { level: 5, name: "Лидер района", minPoints: 1500, color: "text-amber-400", bg: "bg-amber-500/20" },
]

const userHistory = [
  { id: 1, title: "Субботник у школы №47", type: "event", role: "Волонтёр", points: 50, date: "20 мар" },
  { id: 2, title: "Ремонт качели во дворе дома 15", type: "fundraising", role: "Спонсор", points: 80, date: "15 мар" },
  { id: 3, title: "Высадка деревьев в сквере Мира", type: "volunteers", role: "Волонтёр", points: 50, date: "10 мар" },
  { id: 4, title: "Замена освещения в подъезде №3", type: "fundraising", role: "Организатор", points: 120, date: "5 мар" },
  { id: 5, title: "Уборка набережной", type: "volunteers", role: "Волонтёр", points: 50, date: "28 фев" },
]

const userPoints = 850
const currentLevel = levels.find(l => l.level === 4)!
const nextLevel = levels.find(l => l.level === 5)!
const progressToNext = ((userPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100

function ProfileScreen() {
  return (
    <div className="h-full overflow-y-auto pb-24">
      {/* Шапка профиля */}
      <div className="relative overflow-hidden bg-gradient-to-b from-violet-900/40 to-transparent px-4 pt-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              АК
            </div>
            <div className={`absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full ${currentLevel.bg} border-2 border-background`}>
              <span className={`text-xs font-bold ${currentLevel.color}`}>{currentLevel.level}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-foreground">Александр Козлов</h2>
            <div className={`mt-0.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${currentLevel.bg} ${currentLevel.color}`}>
              <Icon name="Star" size={11} />
              {currentLevel.name}
            </div>
            <p className="mt-1.5 text-xs text-foreground/50 flex items-center gap-1">
              <Icon name="MapPin" size={11} />
              Москва, Хамовники
            </p>
          </div>
        </div>

        {/* Прогресс до следующего уровня */}
        <div className="mt-5 rounded-2xl bg-card border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-foreground/60">Очки активности</span>
            <span className="text-xs font-semibold text-foreground">{userPoints} / {nextLevel.minPoints}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-400 transition-all"
              style={{ width: `${progressToNext}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className={`text-[11px] font-medium ${currentLevel.color}`}>{currentLevel.name}</span>
            <span className="text-[11px] text-foreground/40">
              до «{nextLevel.name}» — {nextLevel.minPoints - userPoints} очков
            </span>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="px-4 mt-1">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Инициатив", value: "3", icon: "Lightbulb", color: "text-violet-400" },
            { label: "Участий", value: "12", icon: "CheckCircle", color: "text-green-400" },
            { label: "Взносов", value: "2 400 ₽", icon: "Heart", color: "text-red-400" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-card border border-border p-3 flex flex-col items-center gap-1.5">
              <Icon name={stat.icon} size={18} className={stat.color} />
              <span className="text-base font-bold text-foreground">{stat.value}</span>
              <span className="text-[10px] text-foreground/50 text-center leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Достижения */}
      <div className="px-4 mt-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Достижения</h3>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { icon: "Sprout", label: "Первый шаг", unlocked: true },
            { icon: "Flame", label: "Активист", unlocked: true },
            { icon: "TreePine", label: "Эколог", unlocked: true },
            { icon: "Trophy", label: "Топ района", unlocked: false },
            { icon: "Crown", label: "Легенда", unlocked: false },
          ].map((badge) => (
            <div
              key={badge.label}
              className={`flex-shrink-0 flex flex-col items-center gap-1.5 rounded-2xl p-3 border w-16 ${
                badge.unlocked
                  ? "bg-violet-600/15 border-violet-500/30"
                  : "bg-secondary border-border opacity-40"
              }`}
            >
              <Icon name={badge.icon} size={20} className={badge.unlocked ? "text-violet-400" : "text-foreground/30"} />
              <span className="text-[9px] text-center leading-tight text-foreground/60">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* История участия */}
      <div className="px-4 mt-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">История участия</h3>
        <div className="flex flex-col gap-2">
          {userHistory.map((item) => {
            const config = typeConfig[item.type as keyof typeof typeConfig]
            return (
              <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-card border border-border px-3 py-3">
                <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${config.color}`}>
                  <Icon name={config.icon} size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{item.title}</p>
                  <p className="text-[11px] text-foreground/50">{item.role} · {item.date}</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-violet-600/15 px-2 py-1">
                  <Icon name="Zap" size={10} className="text-violet-400" />
                  <span className="text-[11px] font-bold text-violet-400">+{item.points}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Index() {
  const [activeScreen, setActiveScreen] = useState<"map" | "feed" | "profile">("map")
  const [activeMapTab, setActiveMapTab] = useState<"map" | "feed">("map")
  const [selectedPin, setSelectedPin] = useState<number | null>(null)
  const [showNewInitiative, setShowNewInitiative] = useState(false)

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background font-sans" style={{ maxWidth: 430, margin: "0 auto" }}>

      {/* Верхняя панель */}
      <div className="relative z-10 flex items-center justify-between bg-background/90 px-4 py-3 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600">
            <Icon name="Leaf" size={18} className="text-white" />
          </div>
          <span className="text-base font-bold text-foreground tracking-tight">Инициатива</span>
        </div>

        <button className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs text-foreground/80">
          <Icon name="MapPin" size={13} className="text-violet-400" />
          Москва, Хамовники
          <Icon name="ChevronDown" size={12} className="text-foreground/50" />
        </button>

        <button onClick={() => setActiveScreen("profile")} className="flex items-center gap-1">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white text-sm font-bold">
              АК
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-amber-900 border-2 border-background">
              4
            </div>
          </div>
        </button>
      </div>

      {/* Вкладки (только не на профиле) */}
      {activeScreen !== "profile" && (
        <div className="relative z-10 flex bg-background border-b border-border">
          <button
            onClick={() => { setActiveScreen("map"); setActiveMapTab("map") }}
            className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors ${
              activeScreen === "map" && activeMapTab === "map" ? "text-violet-400 border-b-2 border-violet-500" : "text-foreground/50"
            }`}
          >
            <Icon name="Map" size={15} />
            Карта
          </button>
          <button
            onClick={() => { setActiveScreen("map"); setActiveMapTab("feed") }}
            className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors ${
              activeMapTab === "feed" && activeScreen !== "profile" ? "text-violet-400 border-b-2 border-violet-500" : "text-foreground/50"
            }`}
          >
            <Icon name="LayoutList" size={15} />
            Лента
          </button>
        </div>
      )}

      {/* Профиль — заголовок */}
      {activeScreen === "profile" && (
        <div className="relative z-10 flex items-center gap-2 bg-background border-b border-border px-4 py-3">
          <button onClick={() => setActiveScreen("map")} className="text-foreground/60">
            <Icon name="ChevronLeft" size={22} />
          </button>
          <span className="text-sm font-semibold text-foreground">Мой профиль</span>
        </div>
      )}

      {/* Основной контент */}
      <div className="relative flex-1 overflow-hidden">

        {/* ПРОФИЛЬ */}
        {activeScreen === "profile" && <ProfileScreen />}

        {/* КАРТА */}
        {activeScreen === "map" && activeMapTab === "map" && (
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-[#1a2332]">
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="0" y1="35" x2="100" y2="35" stroke="#3a4a6a" strokeWidth="1.5" />
                <line x1="0" y1="65" x2="100" y2="65" stroke="#3a4a6a" strokeWidth="1" />
                <line x1="30" y1="0" x2="30" y2="100" stroke="#3a4a6a" strokeWidth="1.5" />
                <line x1="70" y1="0" x2="70" y2="100" stroke="#3a4a6a" strokeWidth="1" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="#2a3a5a" strokeWidth="0.7" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="#2a3a5a" strokeWidth="0.7" />
                <rect x="32" y="37" width="16" height="11" fill="#243050" rx="1" />
                <rect x="52" y="37" width="16" height="11" fill="#243050" rx="1" />
                <rect x="32" y="52" width="10" height="11" fill="#243050" rx="1" />
                <rect x="44" y="52" width="24" height="11" fill="#243050" rx="1" />
                <rect x="5" y="37" width="22" height="26" fill="#243050" rx="1" />
                <rect x="72" y="37" width="22" height="26" fill="#243050" rx="1" />
              </svg>
              <div className="absolute" style={{ left: "5%", top: "78%", width: "90%", height: "12%", background: "linear-gradient(180deg, #1e3a5f 0%, #162d4a 100%)", borderRadius: "40%", opacity: 0.7 }} />
              <div className="absolute text-[10px] text-blue-300/50 font-medium" style={{ left: "40%", top: "82%" }}>р. Москва</div>

              <div className="absolute flex items-center justify-center" style={{ left: "48%", top: "47%", transform: "translate(-50%, -50%)" }}>
                <div className="h-3 w-3 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                </div>
              </div>

              {mapPins.map((pin) => {
                const config = typeConfig[pin.type as keyof typeof typeConfig]
                return (
                  <button
                    key={pin.id}
                    onClick={() => setSelectedPin(selectedPin === pin.id ? null : pin.id)}
                    className="absolute flex flex-col items-center transition-transform active:scale-110"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%, -100%)" }}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${config.color} shadow-lg border-2 border-white/30 ${selectedPin === pin.id ? "scale-125" : ""}`}>
                      <Icon name={config.icon} size={14} className="text-white" />
                    </div>
                    <div className="h-2 w-0.5 bg-white/50" />
                  </button>
                )
              })}

              {selectedPin && (() => {
                const pin = mapPins.find(p => p.id === selectedPin)!
                const initiative = initiatives.find(i => i.id === selectedPin)!
                const config = typeConfig[initiative.type as keyof typeof typeConfig]
                return (
                  <div
                    className="absolute z-20 w-56 rounded-2xl bg-card border border-border p-3 shadow-2xl"
                    style={{ left: `${Math.min(Math.max(pin.x, 20), 75)}%`, top: `${Math.max(pin.y - 35, 5)}%`, transform: "translateX(-50%)" }}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${config.color}`}>
                        <Icon name={config.icon} size={11} className="text-white" />
                      </div>
                      <p className="text-xs font-medium text-foreground leading-tight">{initiative.title}</p>
                    </div>
                    {initiative.goal > 0 && (
                      <div className="mb-2">
                        <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                          <div className="h-full rounded-full bg-red-500" style={{ width: `${(initiative.collected / initiative.goal) * 100}%` }} />
                        </div>
                        <p className="mt-1 text-[10px] text-foreground/60">{initiative.collected.toLocaleString()} / {initiative.goal.toLocaleString()} ₽</p>
                      </div>
                    )}
                    <button className="w-full rounded-lg bg-violet-600 py-1.5 text-xs font-semibold text-white">Поддержать</button>
                  </div>
                )
              })()}

              <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 rounded-xl bg-background/80 p-2.5 backdrop-blur-sm border border-border">
                {Object.entries(typeConfig).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <div className={`h-2.5 w-2.5 rounded-full ${val.color}`} />
                    <span className="text-[10px] text-foreground/70">{val.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ЛЕНТА */}
        {activeScreen === "map" && activeMapTab === "feed" && (
          <div className="h-full overflow-y-auto pb-24 pt-2">
            <div className="px-4 pb-2 flex items-center gap-2 overflow-x-auto">
              {["Все", "Рядом", "Сбор средств", "Волонтёры", "Мероприятия"].map((filter) => (
                <button
                  key={filter}
                  className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    filter === "Все" ? "bg-violet-600 text-white" : "bg-secondary text-foreground/70"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3 px-4 pt-2">
              {initiatives.map((item) => {
                const config = typeConfig[item.type as keyof typeof typeConfig]
                const progress = item.goal > 0 ? (item.collected / item.goal) * 100 : 0
                return (
                  <div key={item.id} className="rounded-2xl bg-card border border-border p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`flex h-6 w-6 items-center justify-center rounded-full ${config.color}`}>
                          <Icon name={config.icon} size={12} className="text-white" />
                        </div>
                        <span className="text-[11px] font-medium text-foreground/60">{config.label}</span>
                      </div>
                      <span className="text-[10px] text-foreground/40">{item.time}</span>
                    </div>
                    <h3 className="mb-1.5 text-sm font-semibold text-foreground leading-snug">{item.title}</h3>
                    <div className="mb-3 flex items-center gap-1 text-[11px] text-foreground/50">
                      <Icon name="MapPin" size={10} className="text-foreground/40" />
                      {item.address}
                    </div>
                    {item.goal > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-[11px] text-foreground/60 mb-1">
                          <span>Собрано {item.collected.toLocaleString()} ₽</span>
                          <span>из {item.goal.toLocaleString()} ₽</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                          <div className="h-full rounded-full bg-red-500 transition-all" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    )}
                    {item.volunteers.needed > 0 && (
                      <div className="mb-3 flex items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1.5">
                        <Icon name="Users" size={12} className="text-green-400" />
                        <span className="text-[11px] text-foreground/70">
                          Волонтёров: <span className="font-semibold text-foreground">{item.volunteers.current}</span> из {item.volunteers.needed}
                        </span>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-violet-600 py-2.5 text-xs font-semibold text-white">
                        <Icon name="Heart" size={13} />
                        Поддержать
                      </button>
                      <button className="flex items-center justify-center gap-1.5 rounded-xl bg-secondary px-4 py-2.5 text-xs font-medium text-foreground/70">
                        <Icon name="Share2" size={13} />
                        Поделиться
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Нижняя навигация */}
      <div className="relative z-10 flex items-center bg-background/95 border-t border-border backdrop-blur-md pb-safe">
        <button
          onClick={() => { setActiveScreen("map"); setActiveMapTab("map") }}
          className={`flex flex-1 flex-col items-center gap-1 py-3 transition-colors ${
            activeScreen === "map" && activeMapTab === "map" ? "text-violet-400" : "text-foreground/40"
          }`}
        >
          <Icon name="Map" size={20} />
          <span className="text-[10px] font-medium">Карта</span>
        </button>
        <button
          onClick={() => { setActiveScreen("map"); setActiveMapTab("feed") }}
          className={`flex flex-1 flex-col items-center gap-1 py-3 transition-colors ${
            activeScreen === "map" && activeMapTab === "feed" ? "text-violet-400" : "text-foreground/40"
          }`}
        >
          <Icon name="LayoutList" size={20} />
          <span className="text-[10px] font-medium">Лента</span>
        </button>

        {/* Центральная кнопка */}
        <button
          onClick={() => setShowNewInitiative(true)}
          className="relative -top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 shadow-xl shadow-violet-900/60 active:scale-95 transition-transform"
        >
          <Icon name="Plus" size={26} className="text-white" />
        </button>

        <button
          onClick={() => setActiveScreen("profile")}
          className={`flex flex-1 flex-col items-center gap-1 py-3 transition-colors ${
            activeScreen === "profile" ? "text-violet-400" : "text-foreground/40"
          }`}
        >
          <Icon name="Bell" size={20} />
          <span className="text-[10px] font-medium">Уведомления</span>
        </button>
        <button
          onClick={() => setActiveScreen("profile")}
          className={`flex flex-1 flex-col items-center gap-1 py-3 transition-colors ${
            activeScreen === "profile" ? "text-violet-400" : "text-foreground/40"
          }`}
        >
          <div className="relative">
            <Icon name="User" size={20} />
            {activeScreen === "profile" && (
              <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-violet-400" />
            )}
          </div>
          <span className="text-[10px] font-medium">Профиль</span>
        </button>
      </div>

      {/* Модалка новой инициативы */}
      {showNewInitiative && (
        <div className="absolute inset-0 z-30 flex items-end bg-black/60 backdrop-blur-sm">
          <div className="w-full rounded-t-3xl bg-card border-t border-border p-6 pb-10">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Новая инициатива</h2>
              <button onClick={() => setShowNewInitiative(false)} className="text-foreground/50">
                <Icon name="X" size={22} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Название инициативы..."
                className="w-full rounded-xl bg-secondary px-4 py-3 text-sm text-foreground placeholder-foreground/40 outline-none border border-border focus:border-violet-500"
              />
              <textarea
                placeholder="Опишите проблему или идею..."
                rows={3}
                className="w-full rounded-xl bg-secondary px-4 py-3 text-sm text-foreground placeholder-foreground/40 outline-none border border-border focus:border-violet-500 resize-none"
              />
              <div className="flex gap-2">
                {Object.entries(typeConfig).map(([key, val]) => (
                  <button
                    key={key}
                    className={`flex flex-1 flex-col items-center gap-1 rounded-xl border border-border py-2.5 text-[11px] font-medium transition-colors text-foreground/70`}
                  >
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full ${val.color}`}>
                      <Icon name={val.icon} size={14} className="text-white" />
                    </div>
                    {val.label}
                  </button>
                ))}
              </div>
              <button className="w-full rounded-xl bg-violet-600 py-3.5 text-sm font-bold text-white">
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
