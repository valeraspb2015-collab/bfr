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
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRequests(prev => {
        const newRequests = [...prev.slice(1), generateMockRequest(Date.now())];
        return newRequests;
      });
      setTick(t => t + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-3 overflow-hidden">
      <div className="flex items-center">
        <div className="bg-white/20 px-4 py-1.5 rounded-r-full mr-4 flex-shrink-0">
          <span className="text-white text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Новые заявки
          </span>
        </div>
        
        <div className="flex animate-marquee gap-6">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-4 border border-white/20"
            >
              <span className="text-white font-medium text-sm">{request.name}</span>
              <div className="flex items-center gap-1 text-blue-100 text-xs">
                <MapPin className="w-3 h-3" />
                {request.location}
              </div>
              <div className="flex items-center gap-1 text-blue-100 text-xs">
                <Users className="w-3 h-3" />
                {request.rooms}
              </div>
              <div className="flex items-center gap-1 text-blue-100 text-xs">
                <Calendar className="w-3 h-3" />
                {request.dates}
              </div>
              <div className="flex items-center gap-1 text-green-300 text-xs font-medium">
                <Banknote className="w-3 h-3" />
                {request.budget}
              </div>
            </div>
          ))}
          {requests.map((request) => (
            <div
              key={`dup-${request.id}`}
              className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-4 border border-white/20"
            >
              <span className="text-white font-medium text-sm">{request.name}</span>
              <div className="flex items-center gap-1 text-blue-100 text-xs">
                <MapPin className="w-3 h-3" />
                {request.location}
              </div>
              <div className="flex items-center gap-1 text-blue-100 text-xs">
                <Users className="w-3 h-3" />
                {request.rooms}
              </div>
              <div className="flex items-center gap-1 text-blue-100 text-xs">
                <Calendar className="w-3 h-3" />
                {request.dates}
              </div>
              <div className="flex items-center gap-1 text-green-300 text-xs font-medium">
                <Banknote className="w-3 h-3" />
                {request.budget}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
