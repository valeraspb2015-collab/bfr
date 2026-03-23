import { useEffect, useState } from "react";
import { MapPin, Users, Calendar, Banknote } from "lucide-react";

interface MockRequest {
  id: number;
  name: string;
  location: string;
  rooms: string;
  dates: string;
  budget: string;
}

const russianCities = [
  "Санкт-Петербург", "Москва", "Казань", "Сочи", "Калининград",
  "Нижний Новгород", "Екатеринбург", "Новосибирск", "Краснодар", "Ростов-на-Дону",
  "Владивосток", "Самара", "Уфа", "Красноярск", "Воронеж"
];

const russianNames = [
  "Анна", "Мария", "Елена", "Ольга", "Наталья", "Ирина", "Татьяна", "Светлана",
  "Александр", "Дмитрий", "Сергей", "Андрей", "Михаил", "Иван", "Алексей", "Николай"
];

const roomOptions = ["Студия", "1-комн.", "2-комн.", "3-комн."];

function generateMockRequest(id: number): MockRequest {
  const name = russianNames[Math.floor(Math.random() * russianNames.length)];
  const city = russianCities[Math.floor(Math.random() * russianCities.length)];
  const rooms = roomOptions[Math.floor(Math.random() * roomOptions.length)];
  const startDay = Math.floor(Math.random() * 20) + 1;
  const duration = Math.floor(Math.random() * 7) + 2;
  const month = Math.floor(Math.random() * 3) + 1;
  const monthNames = ["февраля", "марта", "апреля"];
  const dates = `${startDay}-${startDay + duration} ${monthNames[month - 1]}`;
  const budgets = ["2500-3500₽", "3000-4000₽", "4000-5000₽", "5000-7000₽", "до 6000₽"];
  const budget = budgets[Math.floor(Math.random() * budgets.length)];
  return { id, name, location: city, rooms, dates, budget };
}

function generateInitialRequests(): MockRequest[] {
  return Array.from({ length: 8 }, (_, i) => generateMockRequest(i));
}

export default function LiveRequestsTicker() {
  const [requests, setRequests] = useState<MockRequest[]>(generateInitialRequests);

  useEffect(() => {
    const interval = setInterval(() => {
      setRequests(prev => [...prev.slice(1), generateMockRequest(Date.now())]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const Card = ({ request }: { request: MockRequest }) => (
    <div className="flex-shrink-0 bg-white/[0.04] rounded-lg px-4 py-2 flex items-center gap-4 border border-white/[0.07]">
      <span className="text-slate-200 font-medium text-sm">{request.name}</span>
      <div className="flex items-center gap-1 text-slate-400 text-xs">
        <MapPin className="w-3 h-3" />
        {request.location}
      </div>
      <div className="flex items-center gap-1 text-slate-400 text-xs">
        <Users className="w-3 h-3" />
        {request.rooms}
      </div>
      <div className="flex items-center gap-1 text-slate-400 text-xs">
        <Calendar className="w-3 h-3" />
        {request.dates}
      </div>
      <div className="flex items-center gap-1 text-indigo-400 text-xs font-medium">
        <Banknote className="w-3 h-3" />
        {request.budget}
      </div>
    </div>
  );

  return (
    <section
      className="py-3 overflow-hidden border-t border-b border-white/[0.06]"
      style={{ background: "linear-gradient(90deg, #13131a, #1a1a24, #13131a)" }}
    >
      <div className="flex items-center">
        <div className="px-4 py-1.5 rounded-r-full mr-4 flex-shrink-0 bg-indigo-500/10 border-r border-indigo-500/20">
          <span className="text-indigo-300 text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Новые заявки
          </span>
        </div>
        <div className="flex animate-marquee gap-6">
          {requests.map((r) => <Card key={r.id} request={r} />)}
          {requests.map((r) => <Card key={`dup-${r.id}`} request={r} />)}
        </div>
      </div>
    </section>
  );
}
