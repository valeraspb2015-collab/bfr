import { Handshake, Users, Briefcase, TrendingDown } from "lucide-react";

export default function CooperationSection() {
  return (
    <section id="cooperation" className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Handshake className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Сотрудничество</h2>
          <p className="text-lg text-gray-600">
            Приглашаем к взаимовыгодному сотрудничеству
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Администраторы сообществ</h3>
            <p className="text-gray-600 text-sm">
              Администраторов групп и сообществ владельцев квартир городов РФ
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Предприниматели</h3>
            <p className="text-gray-600 text-sm">
              Предпринимателей, оказывающих услуги гостям или хозяевам
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingDown className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Единомышленники</h3>
            <p className="text-gray-600 text-sm">
              Всех, кого интересует развитие альтернативы интернет-площадкам бронирования и снижение за счет этого стоимости аренды и услуг
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://t.me/bfrreplit_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            data-testid="button-cooperation-contact"
          >
            <Handshake className="w-5 h-5" />
            Связаться с нами
          </a>
        </div>
      </div>
    </section>
  );
}
