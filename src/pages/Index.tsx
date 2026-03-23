import { useState } from "react"
import Icon from "@/components/ui/icon"

type IconName = string

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

export default function Index() {
  const [activeTab, setActiveTab] = useState<"map" | "feed">("map")
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

        <div className="flex items-center gap-1">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white text-sm font-bold">
              АК
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-amber-900 border-2 border-background">
              4
            </div>
          </div>
        </div>
      </div>

      {/* Вкладки */}
      <div className="relative z-10 flex bg-background border-b border-border">
        <button
          onClick={() => setActiveTab("map")}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors ${
            activeTab === "map" ? "text-violet-400 border-b-2 border-violet-500" : "text-foreground/50"
          }`}
        >
          <Icon name="Map" size={15} />
          Карта
        </button>
        <button
          onClick={() => setActiveTab("feed")}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors ${
            activeTab === "feed" ? "text-violet-400 border-b-2 border-violet-500" : "text-foreground/50"
          }`}
        >
          <Icon name="LayoutList" size={15} />
          Лента
        </button>
      </div>

      {/* Основной контент */}
      <div className="relative flex-1 overflow-hidden">

        {/* КАРТА */}
        {activeTab === "map" && (
          <div className="relative h-full w-full">
            {/* Имитация карты */}
            <div className="absolute inset-0 bg-[#1a2332]">
              {/* Улицы */}
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
              {/* Река */}
              <div className="absolute" style={{ left: "5%", top: "78%", width: "90%", height: "12%", background: "linear-gradient(180deg, #1e3a5f 0%, #162d4a 100%)", borderRadius: "40%", opacity: 0.7 }} />
              <div className="absolute text-[10px] text-blue-300/50 font-medium" style={{ left: "40%", top: "82%" }}>
                р. Москва
              </div>

              {/* Метка центра */}
              <div className="absolute flex items-center justify-center" style={{ left: "48%", top: "47%", transform: "translate(-50%, -50%)" }}>
                <div className="h-3 w-3 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                </div>
              </div>

              {/* Пины инициатив */}
              {mapPins.map((pin) => {
                const config = typeConfig[pin.type as keyof typeof typeConfig]
                const initiative = initiatives.find(i => i.id === pin.id)
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

              {/* Попап при нажатии на пин */}
              {selectedPin && (() => {
                const pin = mapPins.find(p => p.id === selectedPin)!
                const initiative = initiatives.find(i => i.id === selectedPin)!
                const config = typeConfig[initiative.type as keyof typeof typeConfig]
                return (
                  <div
                    className="absolute z-20 w-56 rounded-2xl bg-card border border-border p-3 shadow-2xl"
                    style={{
                      left: `${Math.min(Math.max(pin.x, 20), 75)}%`,
                      top: `${Math.max(pin.y - 35, 5)}%`,
                      transform: "translateX(-50%)"
                    }}
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
                          <div
                            className="h-full rounded-full bg-red-500"
                            style={{ width: `${(initiative.collected / initiative.goal) * 100}%` }}
                          />
                        </div>
                        <p className="mt-1 text-[10px] text-foreground/60">
                          {initiative.collected.toLocaleString()} / {initiative.goal.toLocaleString()} ₽
                        </p>
                      </div>
                    )}
                    <button className="w-full rounded-lg bg-violet-600 py-1.5 text-xs font-semibold text-white">
                      Поддержать
                    </button>
                  </div>
                )
              })()}

              {/* Легенда */}
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
        {activeTab === "feed" && (
          <div className="h-full overflow-y-auto pb-24 pt-2">
            <div className="px-4 pb-2 flex items-center gap-2 overflow-x-auto">
              {["Все", "Рядом", "Сбор средств", "Волонтёры", "Мероприятия"].map((filter) => (
                <button
                  key={filter}
                  className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    filter === "Все"
                      ? "bg-violet-600 text-white"
                      : "bg-secondary text-foreground/70"
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
                          <div
                            className="h-full rounded-full bg-red-500 transition-all"
                            style={{ width: `${progress}%` }}
                          />
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

      {/* Плавающая кнопка "Предложить инициативу" */}
      <button
        onClick={() => setShowNewInitiative(true)}
        className="absolute bottom-6 right-4 z-20 flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3.5 shadow-2xl shadow-violet-900/50 active:scale-95 transition-transform"
      >
        <Icon name="Plus" size={20} className="text-white" />
        <span className="text-sm font-bold text-white">Предложить инициативу</span>
      </button>

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
                    className={`flex flex-1 flex-col items-center gap-1 rounded-xl border border-border py-2.5 text-[11px] font-medium transition-colors ${val.color} bg-opacity-10 text-foreground/70`}
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