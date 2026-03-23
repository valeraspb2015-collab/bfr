import { Handshake, Users, Briefcase, TrendingDown } from "lucide-react";

export default function CooperationSection() {
  return (
    <section id="cooperation" className="py-20 px-4 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mb-5">
            <Handshake className="w-7 h-7 text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-3 tracking-tight">
            Сотрудничество
          </h2>
          <p className="text-slate-400 text-lg">
            Приглашаем к взаимовыгодному сотрудничеству
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Users,
              iconColor: "text-violet-400",
              bg: "bg-violet-500/10 border-violet-500/20",
              title: "Администраторы сообществ",
              desc: "Администраторов групп и сообществ владельцев квартир городов РФ",
            },
            {
              icon: Briefcase,
              iconColor: "text-emerald-400",
              bg: "bg-emerald-500/10 border-emerald-500/20",
              title: "Предприниматели",
              desc: "Предпринимателей, оказывающих услуги гостям или хозяевам",
            },
            {
              icon: TrendingDown,
              iconColor: "text-amber-400",
              bg: "bg-amber-500/10 border-amber-500/20",
              title: "Единомышленники",
              desc: "Всех, кого интересует развитие альтернативы интернет-площадкам бронирования",
            },
          ].map(({ icon: Icon, iconColor, bg, title, desc }) => (
            <div
              key={title}
              className="bg-[#13131a] border border-white/[0.07] rounded-xl p-6 hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className={`w-11 h-11 ${bg} border rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <h3 className="font-semibold text-slate-100 mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://t.me/bfrreplit_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-[0_0_24px_rgba(99,102,241,0.3)]"
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
