import { Button } from "@/components/ui/button";

interface HowItWorksProps {
  onSubmitRequest: () => void;
}

export default function HowItWorks({ onSubmitRequest }: HowItWorksProps) {
  return (
    <section className="max-w-[900px] mx-auto my-10 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-[24px] font-semibold text-[#004d80] mb-6">Как это работает</h2>
      <ol className="list-decimal list-inside space-y-3 mb-6 text-[16px] text-[#333]">
        <li>Заполняете короткую заявку.</li>
        <li>Наш ассистент подбирает варианты по вашему запросу.</li>
        <li>Выбираете подходящую квартиру и связываетесь с хозяином.</li>
      </ol>
      <Button 
        onClick={onSubmitRequest}
        size="lg"
        className="text-[18px] px-7 py-6 rounded-lg bg-[#0078d7] hover:bg-[#005fa3] text-white transition-colors"
        data-testid="button-submit-request"
      >
        Оставить заявку
      </Button>
    </section>
  );
}
