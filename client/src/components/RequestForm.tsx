import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

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
}

export default function RequestForm({ onBack, onSubmit }: RequestFormProps) {
  const [formData, setFormData] = useState<RequestFormData>({
    name: "",
    phone: "",
    location: "",
    budget: "",
    rooms: "",
    moveInDate: "",
    moveOutDate: "",
    additionalInfo: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onSubmit?.(formData);
  };

  const handleChange = (field: keyof RequestFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
          <h1 className="text-[28px] font-semibold text-[#004d80] mb-2">Заявка на подбор квартиры</h1>
          <p className="text-[15px] text-muted-foreground mb-6">
            Заполните форму, и мы подберём варианты в течение 10 минут
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
                onChange={(e) => handleChange('name', e.target.value)}
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
                onChange={(e) => handleChange('phone', e.target.value)}
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
                onChange={(e) => handleChange('location', e.target.value)}
                required
                data-testid="input-location"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-[15px] text-foreground/80">
                  Бюджет (₽/сутки) *
                </Label>
                <Select value={formData.budget} onValueChange={(value) => handleChange('budget', value)} required>
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
                <Select value={formData.rooms} onValueChange={(value) => handleChange('rooms', value)} required>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="moveInDate" className="text-[15px] text-foreground/80">
                  Дата заезда *
                </Label>
                <Input
                  id="moveInDate"
                  type="date"
                  value={formData.moveInDate}
                  onChange={(e) => handleChange('moveInDate', e.target.value)}
                  required
                  data-testid="input-move-in-date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="moveOutDate" className="text-[15px] text-foreground/80">
                  Дата выезда *
                </Label>
                <Input
                  id="moveOutDate"
                  type="date"
                  value={formData.moveOutDate}
                  onChange={(e) => handleChange('moveOutDate', e.target.value)}
                  required
                  data-testid="input-move-out-date"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo" className="text-[15px] text-foreground/80">
                Дополнительная информация
              </Label>
              <Textarea
                id="additionalInfo"
                placeholder="Особые пожелания, наличие домашних животных, и т.д."
                value={formData.additionalInfo}
                onChange={(e) => handleChange('additionalInfo', e.target.value)}
                rows={4}
                data-testid="textarea-additional-info"
              />
            </div>

            <Button 
              type="submit"
              size="lg"
              className="w-full text-[18px] px-7 py-6 rounded-lg bg-[#0078d7] hover:bg-[#005fa3] text-white"
              data-testid="button-submit-form"
            >
              Отправить заявку
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
