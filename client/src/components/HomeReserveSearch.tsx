import { useEffect } from "react";

export default function HomeReserveSearch() {
  useEffect(() => {
    const initSearch = () => {
      if (window.homereserve) {
        window.homereserve.initWidgetSearch({ token: "vPqBfHl4Xy", container: "#hr-widget-search" });
      }
    };

    if (window.homereserve) {
      initSearch();
    } else {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://homereserve.ru/widget.js";
      script.onload = initSearch;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div id="hr-widget-search"></div>
      </div>
    </section>
  );
}
