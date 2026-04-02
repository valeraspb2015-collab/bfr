import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, CalendarIcon, Send, MessageCircle, Smartphone } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

interface RequestFormProps {
  onBack: () => void;
  onSubmit?: (data: RequestFormData) => void;
}

export interface RequestFormData {
  name: string;
  phone: string;
  location: string;
  budget: string;
  rooms: string;
  moveInDate: string;
  moveOutDate: string;
  additionalInfo: string;
  messengerType: string;
  messengerContact: string;
}

type MessengerType = "telegram" | "whatsapp" | "max";

const messengerOptions: { id: MessengerType; label: string; icon: React.ReactNode; placeholder: string; hint: string }[] = [
  {
    id: "telegram",
    label: "Telegram",
    icon: <Send className="w-4 h-4" />,
    placeholder: "@username или +7 999 123-45-67",
    hint: "Укажите @username или номер телефона",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: <MessageCircle className="w-4 h-4" />,
    placeholder: "+7 999 123-45-67",
    hint: "Укажите номер телефона",
  },
  {
    id: "max",
    label: "Макс",
    icon: <Smartphone className="w-4 h-4" />,
    placeholder: "Номер телефона или ссылка",
    hint: "Укажите номер телефона или ссылку на профиль",
  },
];

export default function RequestForm({ onBack, onSubmit }: RequestFormProps) {
  const [formData, setFormData] = useState<RequestFormData>({
    name: "",
    phone: "",
    location: "",
    budget: "",
    rooms: "",
    moveInDate: "",
    moveOutDate: "",
    additionalInfo: "",
    messengerType: "",
    messengerContact: "",
  });

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedMessenger, setSelectedMessenger] = useState<MessengerType | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dateRange?.from || !dateRange?.to) return;
    if (!selectedMessenger || !formData.messengerContact.trim()) return;

    const submissionData = {
      ...formData,
      moveInDate: format(dateRange.from, "yyyy-MM-dd"),
      moveOutDate: format(dateRange.to, "yyyy-MM-dd"),
      messengerType: selectedMessenger,
    };

    console.log("Form submitted:", submissionData);
    onSubmit?.(submissionData);
  };

  const handleChange = (field: keyof RequestFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMessengerSelect = (type: MessengerType) => {
    setSelectedMessenger(type);
    setFormData(prev => ({ ...prev, messengerType: type, messengerContact: "" }));
  };

  const activeMessenger = messengerOptions.find(m => m.id === selectedMessenger);

  const isFormValid =
    !!dateRange?.from &&
    !!dateRange?.to &&
    !!selectedMessenger &&
    !!formData.messengerContact.trim();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        <Card className="p-8">
          <h1 className="text-[28px] font-semibold mb-2" style={{ color: "#1c1917" }}>
            Оставьте заявку — хозяева сами предложат варианты
          </h1>
          <p className="text-[15px] mb-6" style={{ color: "#6b6560" }}>
            Ваша заявка уйдёт в сети хозяев в мессенджерах. Бронник AI отберёт 5 лучших откликов и пришлёт их вам — обычно в течение 10–30 минут
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[15px] text-foreground/80">
                Ваше имя *
              </Label>
              <Input
                id="name"
                placeholder="Иван Иванов"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                data-testid="input-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[15px] text-foreground/80">
                Номер телефона *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
                data-testid="input-phone"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-[15px] text-foreground/80">
                Желаемый район/город *
              </Label>
              <Input
                id="location"
                placeholder="Москва, центр"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                required
                data-testid="input-location"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-[15px] text-foreground/80">
                  Бюджет (₽/сутки) *
                </Label>
                <Select value={formData.budget} onValueChange={(value) => handleChange("budget", value)} required>
                  <SelectTrigger id="budget" data-testid="select-budget">
                    <SelectValue placeholder="Выберите бюджет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="до 3000">до 3 000 ₽</SelectItem>
                    <SelectItem value="3000-5000">3 000 - 5 000 ₽</SelectItem>
                    <SelectItem value="5000-10000">5 000 - 10 000 ₽</SelectItem>
                    <SelectItem value="10000+">10 000+ ₽</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rooms" className="text-[15px] text-foreground/80">
                  Количество комнат *
                </Label>
                <Select value={formData.rooms} onValueChange={(value) => handleChange("rooms", value)} required>
                  <SelectTrigger id="rooms" data-testid="select-rooms">
                    <SelectValue placeholder="Выберите" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="studio">Студия</SelectItem>
                    <SelectItem value="1">1 комната</SelectItem>
                    <SelectItem value="2">2 комнаты</SelectItem>
                    <SelectItem value="3">3 комнаты</SelectItem>
                    <SelectItem value="4+">4+ комнат</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[15px] text-foreground/80">
                Дата заезда и выезда *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                    data-testid="button-date-range"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd MMM yyyy", { locale: ru })} -{" "}
                          {format(dateRange.to, "dd MMM yyyy", { locale: ru })}
                        </>
                      ) : (
                        format(dateRange.from, "dd MMM yyyy", { locale: ru })
                      )
                    ) : (
                      <span>Выберите даты заезда и выезда</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    locale={ru}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    data-testid="calendar-date-range"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-3">
              <Label className="text-[15px] text-foreground/80">
                Куда прислать предложения? *
              </Label>
              <p className="text-[13px] text-muted-foreground -mt-1">
                Выберите мессенджер и укажите контакт — хозяева пришлют вам варианты напрямую
              </p>

              <div className="flex flex-wrap gap-2" data-testid="messenger-selector">
                {messengerOptions.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleMessengerSelect(m.id)}
                    data-testid={`button-messenger-${m.id}`}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-md border text-[14px] font-medium transition-colors",
                      selectedMessenger === m.id
                        ? "bg-[#6366f1] border-[#6366f1] text-white"
                        : "bg-transparent border-border text-foreground/70 hover-elevate"
                    )}
                  >
                    {m.icon}
                    {m.label}
                  </button>
                ))}
              </div>

              {selectedMessenger && (
                <div className="space-y-1">
                  <Input
                    placeholder={activeMessenger?.placeholder}
                    value={formData.messengerContact}
                    onChange={(e) => handleChange("messengerContact", e.target.value)}
                    required
                    data-testid="input-messenger-contact"
                  />
                  <p className="text-[12px] text-muted-foreground pl-1">
                    {activeMessenger?.hint}
                  </p>
                </div>
              )}

              {!selectedMessenger && (
                <p className="text-[12px] text-amber-500 pl-1">
                  Выберите мессенджер для получения предложений
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo" className="text-[15px] text-foreground/80">
                Дополнительная информация
              </Label>
              <Textarea
                id="additionalInfo"
                placeholder="Особые пожелания, наличие домашних животных, и т.д."
                value={formData.additionalInfo}
                onChange={(e) => handleChange("additionalInfo", e.target.value)}
                rows={4}
                data-testid="textarea-additional-info"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full text-[18px] px-7 py-6 rounded-xl text-white"
              style={{
                background: "#0d7377",
                boxShadow: "0 4px 20px rgba(13,115,119,0.2)",
              }}
              data-testid="button-submit-form"
              disabled={!isFormValid}
            >
              Отправить заявку хозяевам
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
