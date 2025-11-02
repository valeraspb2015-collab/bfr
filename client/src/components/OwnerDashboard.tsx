import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Home, FileText, User, ArrowLeft } from "lucide-react";
import PropertyCard from "./PropertyCard";
import apartment1 from '@assets/generated_images/Modern_one_bedroom_apartment_1767c55a.png';
import apartment2 from '@assets/generated_images/Two_bedroom_apartment_kitchen_2274f1ef.png';
import apartment3 from '@assets/generated_images/Luxury_three_bedroom_apartment_b04abbf8.png';
import apartment4 from '@assets/generated_images/Cozy_studio_apartment_8a0fd6d7.png';

interface OwnerDashboardProps {
  onBack: () => void;
}

const mockProperties = [
  { id: "1", image: apartment1, address: "Москва, ул. Тверская, д. 15", price: 45000, rooms: 2, status: "available" as const },
  { id: "2", image: apartment2, address: "Санкт-Петербург, Невский пр., д. 28", price: 55000, rooms: 2, status: "available" as const },
  { id: "3", image: apartment3, address: "Москва, Кутузовский пр., д. 12", price: 85000, rooms: 3, status: "rented" as const },
  { id: "4", image: apartment4, address: "Екатеринбург, ул. Ленина, д. 7", price: 25000, rooms: 1, status: "available" as const },
];

export default function OwnerDashboard({ onBack }: OwnerDashboardProps) {
  const [activeTab, setActiveTab] = useState<"properties" | "requests" | "profile">("properties");

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              data-testid="button-back-dashboard"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            <h1 className="text-[24px] font-semibold text-[#004d80]">Кабинет владельца</h1>
          </div>
          <Button 
            size="default"
            className="bg-[#0078d7] hover:bg-[#005fa3] text-white"
            data-testid="button-add-property"
            onClick={() => console.log('Add property clicked')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить квартиру
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 border-b">
          <Button
            variant={activeTab === "properties" ? "default" : "ghost"}
            onClick={() => setActiveTab("properties")}
            className={activeTab === "properties" ? "bg-[#0078d7] hover:bg-[#005fa3]" : ""}
            data-testid="tab-properties"
          >
            <Home className="w-4 h-4 mr-2" />
            Мои объявления
          </Button>
          <Button
            variant={activeTab === "requests" ? "default" : "ghost"}
            onClick={() => setActiveTab("requests")}
            className={activeTab === "requests" ? "bg-[#0078d7] hover:bg-[#005fa3]" : ""}
            data-testid="tab-requests"
          >
            <FileText className="w-4 h-4 mr-2" />
            Заявки
          </Button>
          <Button
            variant={activeTab === "profile" ? "default" : "ghost"}
            onClick={() => setActiveTab("profile")}
            className={activeTab === "profile" ? "bg-[#0078d7] hover:bg-[#005fa3]" : ""}
            data-testid="tab-profile"
          >
            <User className="w-4 h-4 mr-2" />
            Профиль
          </Button>
        </div>

        {activeTab === "properties" && (
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-4">Ваши квартиры</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-[20px] font-semibold text-foreground mb-4">Входящие заявки</h2>
            <p className="text-muted-foreground">У вас пока нет новых заявок</p>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-[20px] font-semibold text-foreground mb-4">Профиль владельца</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Имя</p>
                <p className="text-foreground font-medium">Иван Петров</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Телефон</p>
                <p className="text-foreground font-medium">+7 (999) 123-45-67</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground font-medium">ivan@example.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
