import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Eye, MessageSquare, CheckCircle } from "lucide-react";

interface AdminPanelProps {
  onBack: () => void;
}

type RequestStatus = "new" | "in_progress" | "completed";

interface Request {
  id: string;
  tenantName: string;
  phone: string;
  location: string;
  budget: string;
  rooms: string;
  status: RequestStatus;
  date: string;
}

const mockRequests: Request[] = [
  { id: "REQ001", tenantName: "Анна Иванова", phone: "+7 (999) 111-11-11", location: "Москва, центр", budget: "50 000 ₽", rooms: "2", status: "new", date: "2025-11-01" },
  { id: "REQ002", tenantName: "Петр Сидоров", phone: "+7 (999) 222-22-22", location: "СПб, Невский р-н", budget: "40 000 ₽", rooms: "1", status: "in_progress", date: "2025-11-01" },
  { id: "REQ003", tenantName: "Мария Козлова", phone: "+7 (999) 333-33-33", location: "Москва, Юго-Запад", budget: "70 000 ₽", rooms: "3", status: "completed", date: "2025-10-31" },
];

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
  const [requests, setRequests] = useState<Request[]>(mockRequests);

  const filteredRequests = filter === "all" 
    ? requests 
    : requests.filter(req => req.status === filter);

  const handleStatusChange = (id: string, newStatus: RequestStatus) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
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
          <h2 className="text-[20px] font-semibold text-foreground">Заявки арендаторов</h2>
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

        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="p-6" data-testid={`card-request-${request.id}`}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-muted-foreground">{request.id}</span>
                    <Badge className={`${statusColors[request.status]} text-xs no-default-hover-elevate no-default-active-elevate`}>
                      {statusLabels[request.status]}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Имя: </span>
                      <span className="font-medium text-foreground">{request.tenantName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Телефон: </span>
                      <span className="font-medium text-foreground">{request.phone}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Район: </span>
                      <span className="font-medium text-foreground">{request.location}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Бюджет: </span>
                      <span className="font-medium text-foreground">{request.budget}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Комнат: </span>
                      <span className="font-medium text-foreground">{request.rooms}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Дата: </span>
                      <span className="font-medium text-foreground">{new Date(request.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 lg:flex-col">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => console.log('View details:', request.id)}
                    data-testid={`button-view-${request.id}`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Детали
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => console.log('Contact:', request.id)}
                    data-testid={`button-contact-${request.id}`}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Связаться
                  </Button>
                  {request.status !== "completed" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStatusChange(request.id, "completed")}
                      data-testid={`button-complete-${request.id}`}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Завершить
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Нет заявок с выбранным фильтром</p>
          </Card>
        )}
      </div>
    </div>
  );
}
