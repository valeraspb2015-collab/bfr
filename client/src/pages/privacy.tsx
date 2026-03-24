import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8" data-testid="link-back-home">
          <ArrowLeft className="w-4 h-4" />
          Вернуться на главную
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Политика конфиденциальности</h1>
        
        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">Дата последнего обновления: 25 января 2025 г.</p>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных 
              пользователей сервиса «БФР» (Best flat rent — Лучшая аренда квартир). Используя наш сервис, вы соглашаетесь с условиями 
              данной политики.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Какие данные мы собираем</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Контактная информация: имя, номер телефона, адрес электронной почты</li>
              <li>Данные заявок: даты поездки, количество гостей, предпочтения по жилью</li>
              <li>Техническая информация: IP-адрес, тип браузера, данные об устройстве</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Цели обработки данных</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Подбор подходящих вариантов жилья по вашему запросу</li>
              <li>Связь с вами для уточнения деталей бронирования</li>
              <li>Передача ваших контактов владельцам квартир (с вашего согласия)</li>
              <li>Улучшение качества сервиса</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Защита данных</h2>
            <p>
              Мы принимаем необходимые меры для защиты ваших персональных данных от несанкционированного 
              доступа, изменения или уничтожения. Данные передаются только проверенным владельцам квартир 
              в рамках выполнения вашего запроса.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Ваши права</h2>
            <p>
              Вы имеете право запросить информацию о ваших персональных данных, их изменение или удаление. 
              Для этого свяжитесь с нами через Telegram или WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Контакты</h2>
            <p>
              По вопросам, связанным с обработкой персональных данных, обращайтесь:<br />
              Telegram: <a href="https://t.me/bfrreplit_bot" className="text-blue-600 hover:underline">@bfrreplit_bot</a><br />
              WhatsApp: <a href="https://wa.me/79899865887" className="text-blue-600 hover:underline">+7 989 986-58-87</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
