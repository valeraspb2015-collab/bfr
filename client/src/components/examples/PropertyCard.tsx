import PropertyCard from '../PropertyCard';
import apartment1 from '@assets/generated_images/Modern_one_bedroom_apartment_1767c55a.png';

export default function PropertyCardExample() {
  return (
    <div className="max-w-sm">
      <PropertyCard
        id="1"
        image={apartment1}
        address="Москва, ул. Тверская, д. 15"
        price={45000}
        rooms={2}
        status="available"
      />
    </div>
  );
}
