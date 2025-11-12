import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Phone } from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import type { ApartmentRequest } from "@shared/schema";

interface AdminPanelProps {
  onBack: () => void;
}

type RequestStatus = "new" | "in_progress" | "completed";

const statusLabels: Record<RequestStatus, string> = {
  new: "Новая",
  in_progress: "В работе",
  completed: "Завершена"
};

const statusColors: Record<RequestStatus, string> = {
  new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  in_progress: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
};

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [filter, setFilter] = useState<"all" | RequestStatus>("all");

  const { data: requests = [], isLoading } = useQuery<ApartmentRequest[]>({
    queryKey: ['/api/apartment-requests'],
  });

  const filteredRequests = filter === "all" 
    ? requests 
    : requests.filter(req => req.status === filter);

  const handleReplyWhatsApp = (request: ApartmentRequest) => {
    const phone = request.phone.replace(/\D/g, '');
    const message = `Здравствуйте, ${request.name}! Это БФР. 

По вашей заявке на квартиру:
📍 Район: ${request.location}
💰 Бюджет: ${request.budget} ₽/сутки
🛏 Комнат: ${request.rooms}
📅 Заезд: ${request.moveInDate}
📅 Выезд: ${request.moveOutDate}

Готовы предложить варианты. Когда удобно обсудить?`;
    
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleReplyTelegram = (request: ApartmentRequest) => {
    const phone = request.phone.replace(/\D/g, '');
    const telegramUrl = `https://t.me/+${phone}`;
    window.open(telegramUrl, '_blank');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            data-testid="button-back-admin"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
          <h1 className="text-[24px] font-semibold text-[#004d80]">Панель администратора</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-semibold text-foreground">
            Заявки от гостей ({requests.length})
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Фильтр:</span>
            <Select value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
              <SelectTrigger className="w-[180px]" data-testid="select-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все заявки</SelectItem>
                <SelectItem value="new">Новые</SelectItem>
                <SelectItem value="in_progress">В работе</SelectItem>
                <SelectItem value="completed">Завершенные</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Загрузка заявок...</p>
          </Card>
        ) : filteredRequests.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              {requests.length === 0 
                ? "Пока нет заявок от гостей" 
                : "Нет заявок с выбранным фильтром"}
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="p-6" data-testid={`card-request-${request.id}`}>
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-xs text-muted-foreground">
                        ID: {request.id.slice(0, 8)}
                      </span>
                      <Badge className={`${statusColors[request.status as RequestStatus]} text-xs no-default-hover-elevate no-default-active-elevate`}>
                        {statusLabels[request.status as RequestStatus]}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(request.createdAt.toString())}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Гость: </span>
                        <span className="font-medium text-foreground">{request.name}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Телефон: </span>
                        <a 
                          href={`tel:${request.phone}`}
                          className="font-medium text-foreground hover:text-primary"
                        >
                          {request.phone}
                        </a>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Район: </span>
                        <span className="font-medium text-foreground">{request.location}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Бюджет: </span>
                        <span className="font-medium text-foreground">{request.budget} ₽/сутки</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Комнат: </span>
                        <span className="font-medium text-foreground">{request.rooms}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Даты: </span>
                        <span className="font-medium text-foreground">
                          {request.moveInDate} — {request.moveOutDate}
                        </span>
                      </div>
                      {request.additionalInfo && (
                        <div className="md:col-span-2">
                          <span className="text-muted-foreground">Доп. информация: </span>
                          <span className="font-medium text-foreground">{request.additionalInfo}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:flex-col lg:min-w-[140px]">
                    <Button 
                      variant="default"
                      size="sm"
                      onClick={() => handleReplyWhatsApp(request)}
                      className="flex-1 lg:flex-none bg-[#25D366] hover:bg-[#20ba59]"
                      data-testid={`button-whatsapp-${request.id}`}
                    >
                      <SiWhatsapp className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button 
                      variant="default"
                      size="sm"
                      onClick={() => handleReplyTelegram(request)}
                      className="flex-1 lg:flex-none bg-[#0088cc] hover:bg-[#0077b5]"
                      data-testid={`button-telegram-${request.id}`}
                    >
                      <SiTelegram className="w-4 h-4 mr-2" />
                      Telegram
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const phone = request.phone.replace(/\D/g, '');
                        window.location.href = `tel:${phone}`;
                      }}
                      className="flex-1 lg:flex-none"
                      data-testid={`button-call-${request.id}`}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Позвонить
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
