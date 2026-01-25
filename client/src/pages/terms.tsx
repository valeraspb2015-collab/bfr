import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8" data-testid="link-back-home">
          <ArrowLeft className="w-4 h-4" />
          Вернуться на главную
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Условия использования</h1>
        
        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">Дата последнего обновления: 25 января 2025 г.</p>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Общие положения</h2>
            <p>
              Сервис «БФР» (Booking For Rent) — это сообщество, которое помогает гостям найти жильё напрямую 
              от владельцев квартир без посредников и комиссий. Используя наш сервис, вы принимаете настоящие условия.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Роль БФР</h2>
            <p>
              БФР выступает исключительно как посредник для установления контакта между гостями и владельцами 
              квартир. Мы не являемся стороной договора аренды и не несём ответственности за:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Качество и состояние объектов размещения</li>
              <li>Выполнение обязательств владельцами квартир</li>
              <li>Финансовые расчёты между гостями и владельцами</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Бронирование</h2>
            <p>
              Все условия бронирования, включая стоимость, даты, правила заселения и отмены, согласовываются 
              напрямую между гостем и владельцем квартиры. Рекомендуем фиксировать договорённости в переписке.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Оплата</h2>
            <p>
              Оплата производится напрямую владельцу квартиры. БФР не взимает комиссию с гостей. 
              Условия предоплаты и возврата средств оговариваются с владельцем индивидуально.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Рекомендации для гостей</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Уточняйте реальные фотографии объекта до оплаты</li>
              <li>Запрашивайте документы, подтверждающие право собственности</li>
              <li>Фиксируйте все договорённости в переписке</li>
              <li>При возникновении сомнений — обращайтесь к администраторам БФР</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Для владельцев</h2>
            <p>
              Присоединяясь к сообществу БФР, владельцы квартир обязуются предоставлять достоверную информацию 
              о своих объектах и соблюдать договорённости с гостями.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Контакты</h2>
            <p>
              По любым вопросам обращайтесь:<br />
              Telegram: <a href="https://t.me/bfrreplit_bot" className="text-blue-600 hover:underline">@bfrreplit_bot</a><br />
              WhatsApp: <a href="https://wa.me/79899865887" className="text-blue-600 hover:underline">+7 989 986-58-87</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
