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

const monthNamesGenitive = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

function generateRandomDate(): string {
  const today = new Date();
  const daysOffset = Math.floor(Math.random() * 240) + 1;
  const start = new Date(today);
  start.setDate(today.getDate() + daysOffset);

  const duration = Math.floor(Math.random() * 7) + 2;
  const end = new Date(start);
  end.setDate(start.getDate() + duration);

  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = start.getMonth();
  const endMonth = end.getMonth();

  if (startMonth === endMonth) {
    return `${startDay}–${endDay} ${monthNamesGenitive[startMonth]}`;
  }
  return `${startDay} ${monthNamesGenitive[startMonth]} – ${endDay} ${monthNamesGenitive[endMonth]}`;
}

function generateMockRequest(id: number): MockRequest {
  const name = russianNames[Math.floor(Math.random() * russianNames.length)];
  const city = russianCities[Math.floor(Math.random() * russianCities.length)];
  const rooms = roomOptions[Math.floor(Math.random() * roomOptions.length)];
  const dates = generateRandomDate();
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

  const TickerCard = ({ request }: { request: MockRequest }) => (
    <div
      className="flex-shrink-0 rounded-xl px-4 py-2 flex items-center gap-4"
      style={{
        background: "#fff",
        border: "1px solid rgba(28,25,23,0.08)",
        boxShadow: "0 1px 4px rgba(28,25,23,0.05)",
      }}
    >
      <span className="font-medium text-sm" style={{ color: "#1c1917" }}>{request.name}</span>
      <div className="flex items-center gap-1 text-xs" style={{ color: "#6b6560" }}>
        <MapPin className="w-3 h-3" />
        {request.location}
      </div>
      <div className="flex items-center gap-1 text-xs" style={{ color: "#6b6560" }}>
        <Users className="w-3 h-3" />
        {request.rooms}
      </div>
      <div className="flex items-center gap-1 text-xs" style={{ color: "#6b6560" }}>
        <Calendar className="w-3 h-3" />
        {request.dates}
      </div>
      <div className="flex items-center gap-1 text-xs font-medium" style={{ color: "#c8622a" }}>
        <Banknote className="w-3 h-3" />
        {request.budget}
      </div>
    </div>
  );

  return (
    <section
      className="py-3 overflow-hidden"
      style={{
        background: "#f3ede3",
        borderTop: "1px solid rgba(28,25,23,0.08)",
        borderBottom: "1px solid rgba(28,25,23,0.08)",
      }}
    >
      <div className="flex items-center">
        <div
          className="px-4 py-1.5 rounded-r-full mr-4 flex-shrink-0"
          style={{
            background: "rgba(200,98,42,0.08)",
            borderRight: "1px solid rgba(200,98,42,0.2)",
          }}
        >
          <span className="text-sm font-medium flex items-center gap-2" style={{ color: "#c8622a" }}>
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#4a7c59" }}
            ></span>
            Новые заявки
          </span>
        </div>
        <div className="flex animate-marquee gap-4">
          {requests.map((r) => <TickerCard key={r.id} request={r} />)}
          {requests.map((r) => <TickerCard key={`dup-${r.id}`} request={r} />)}
        </div>
      </div>
    </section>
  );
}
