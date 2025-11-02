import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, RussianRuble } from "lucide-react";

interface PropertyCardProps {
  id: string;
  image: string;
  address: string;
  price: number;
  rooms: number;
  status?: "available" | "rented" | "pending";
}

const statusLabels = {
  available: "Доступна",
  rented: "Сдана",
  pending: "Ожидание"
};

const statusColors = {
  available: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  rented: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
};

export default function PropertyCard({ id, image, address, price, rooms, status = "available" }: PropertyCardProps) {
  return (
    <Card 
      className="overflow-hidden hover-elevate cursor-pointer transition-all"
      data-testid={`card-property-${id}`}
    >
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={address}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 flex-1">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-[15px] text-foreground font-medium leading-tight">{address}</p>
          </div>
          <Badge className={`${statusColors[status]} text-xs px-2 py-1 no-default-hover-elevate no-default-active-elevate`}>
            {statusLabels[status]}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[15px] text-muted-foreground">
            <Bed className="w-4 h-4" />
            <span>{rooms} комн.</span>
          </div>
          <div className="flex items-center gap-1 text-[18px] font-semibold text-[#0078d7]">
            <span>{price.toLocaleString('ru-RU')}</span>
            <RussianRuble className="w-4 h-4" />
            <span className="text-[14px] text-muted-foreground font-normal">/мес</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
