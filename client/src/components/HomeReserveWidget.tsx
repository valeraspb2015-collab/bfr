import { useEffect } from "react";

declare global {
  interface Window {
    homereserve?: {
      initWidgetList: (config: { token: string }) => void;
      initWidgetSearch: (config: { token: string }) => void;
    };
  }
}

export default function HomeReserveWidget() {
  useEffect(() => {
    const initWidgets = () => {
      if (window.homereserve) {
        window.homereserve.initWidgetList({ token: "vPqBfHl4Xy" });
        window.homereserve.initWidgetSearch({ token: "vPqBfHl4Xy" });
      }
    };

    if (window.homereserve) {
      initWidgets();
    } else {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://homereserve.ru/widget.js";
      script.onload = initWidgets;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Некоторые квартиры для тех, кто привык к традиционным методам подбора
          </h2>
          <div id="hr-widget"></div>
        </div>
      </section>
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div id="hr-widget"></div>
        </div>
      </section>
    </>
  );
}
