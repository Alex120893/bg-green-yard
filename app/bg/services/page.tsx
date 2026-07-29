"use client";

import Link from "next/link";
import { useState } from "react";
import { TabNav } from "@/components/TabNav";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<"services" | "portfolio">("services");

  const tabs = [
    { id: "services", label: "Наши услуги", icon: "🌿" },
    { id: "portfolio", label: "Портфолио", icon: "🖼️" },
  ];

  const services = [
    {
      id: 1,
      title: "Профилактика и защита от болести",
      description: "Комплексни програми за защита",
      details: [
        "Редовна проверка на растенията",
        "Превенция от вредители",
        "Обработка с органични препарати",
        "Консултация при проблеми",
      ],
      price: "На договаряне",
    },
    {
      id: 2,
      title: "Подрязване и формиране",
      description: "Художествено оформяне на растения",
      details: [
        "Обрязване на дървета",
        "Формиране на храстите",
        "Топиари дизайн",
        "Поддържане на желаната форма",
      ],
      price: "На договаряне",
    },
    {
      id: 3,
      title: "Газонни услуги",
      description: "Профилактика и ремонт на газон",
      details: [
        "Косене и поддържане",
        "Аерация и вертикутиране",
        "Засяване и възстановяване",
        "Борба със сорняци",
      ],
      price: "На договаряне",
    },
    {
      id: 4,
      title: "Озеленяване",
      description: "Дизайн и реализация на зелени площи",
      details: [
        "Планиране и дизайн",
        "Избор на подходящи растения",
        "Професионална засадка",
        "Поддържане след реализацията",
      ],
      price: "На договаряне",
    },
    {
      id: 5,
      title: "Торене и подхранване",
      description: "Оптимално хранене на растения",
      details: [
        "Диагностика на почвата",
        "Избор на подходящи торове",
        "График на подхранване",
        "Органични методи",
      ],
      price: "На договаряне",
    },
    {
      id: 6,
      title: "Консултации",
      description: "Експертни съвети за вашата градина",
      details: [
        "Персонална консултация",
        "План за развитие",
        "Препоръки за растения",
        "Онлайн поддържка",
      ],
      price: "На договаряне",
    },
  ];

  const portfolio = [
    {
      id: 1,
      title: "Частна резиденция - Варна",
      image: "🏡",
      description: "Комплексна озеленяване на градинска площ от 500кв.м",
      year: "2023",
    },
    {
      id: 2,
      title: "Корпоративен офис - София",
      image: "🏢",
      description: "Озеленяване на входна зона и тераса с дървета и храсти",
      year: "2023",
    },
    {
      id: 3,
      title: "Лечебна институция - Пловдив",
      image: "🏥",
      description: "Създаване на успокойваща градина със разнообразни растения",
      year: "2024",
    },
    {
      id: 4,
      title: "Хотелски комплекс - Черноморие",
      image: "🏨",
      description: "Озеленяване с екзотични растения и ландшафтен дизайн",
      year: "2024",
    },
    {
      id: 5,
      title: "Жилищен комплекс - Бургас",
      image: "🏘️",
      description: "Озеленяване на общи пространства и индивидуални градинки",
      year: "2023",
    },
    {
      id: 6,
      title: "Частна градина - Габрово",
      image: "🌳",
      description: "Восстановление и модернизация на историческа частна градина",
      year: "2024",
    },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as "services" | "portfolio");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Нашите услуги</h1>
          <p className="text-xl text-green-50">
            Пълен спектър от услуги за красива и здрава градина
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* SERVICES TAB */}
        {activeTab === "services" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Какво можем да направим</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-green-100"
                >
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-green-50 text-sm">{service.description}</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-2 mb-6">
                      {service.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-sm text-gray-700"
                        >
                          <span className="text-green-600 mr-2 font-bold">✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-green-600 font-bold">{service.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">
                Интересувате ли се от някоя от услугите?
              </h2>
              <p className="text-green-50 mb-6">
                Свържете се с нас сега и получете безплатна консултация
              </p>
              <Link
                href="/bg/contact"
                className="inline-block bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-colors"
              >
                Заявете консултация
              </Link>
            </div>
          </div>
        )}

        {/* PORTFOLIO TAB */}
        {activeTab === "portfolio" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Наши проекти</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all overflow-hidden border border-green-100 hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
                    <div className="text-6xl mb-3">{project.image}</div>
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-500">Година: {project.year}</span>
                      <button className="text-green-600 hover:text-green-700 font-bold text-sm">
                        Повече →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="border-t mt-16 py-8 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto flex justify-between flex-wrap gap-4">
          <Link href="/bg" className="text-green-600 hover:text-green-700 font-semibold">
            ← Начало
          </Link>
          <Link
            href="/bg/contact"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            Контакти →
          </Link>
        </div>
      </div>
    </div>
  );
}
