"use client";

import Link from "next/link";
import { useState } from "react";
import { TabNav } from "@/components/TabNav";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"about" | "team" | "values">("about");

  const tabs = [
    { id: "about", label: "За нас", icon: "ℹ️" },
    { id: "team", label: "Екип", icon: "👥" },
    { id: "values", label: "Ценности", icon: "⭐" },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Александър Петров",
      role: "Собственик и ландшафтен дизайнер",
      bio: "20+ години опит в озеленяване и ландшафтен дизайн",
      image: "👨‍💼",
    },
    {
      id: 2,
      name: "Мария Йовева",
      role: "Хортикултуролог",
      bio: "Специалист по отглеждане на растения и защита от болести",
      image: "👩‍🌾",
    },
    {
      id: 3,
      name: "Иван Стойчев",
      role: "Техник по уход на газони",
      bio: "Експерт по поддържане и възстановяване на газони",
      image: "👨‍🔧",
    },
    {
      id: 4,
      name: "Елена Миланова",
      role: "Консултант",
      bio: "Помага на клиентите в избора на подходящи решения",
      image: "👩‍💼",
    },
  ];

  const values = [
    {
      id: 1,
      title: "Качество",
      description: "Последовно качество по всяко време на годината",
      icon: "✓",
    },
    {
      id: 2,
      title: "Професионализъм",
      description: "Висок стандарт на работа и обслужване",
      icon: "🎯",
    },
    {
      id: 3,
      title: "Иновация",
      description: "Използване на съвременни методи и технологии",
      icon: "💡",
    },
    {
      id: 4,
      title: "Екология",
      description: "Органични методи и устойчиво развитие",
      icon: "🌱",
    },
    {
      id: 5,
      title: "Пунктуалност",
      description: "Редовно и навременно обслужване",
      icon: "⏰",
    },
    {
      id: 6,
      title: "Партньорство",
      description: "Дългосрочни отношения с нашите клиенти",
      icon: "🤝",
    },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as "about" | "team" | "values");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">За компанията</h1>
          <p className="text-xl text-green-50">
            Узнайте повече за нас и нашата мисия
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* ABOUT TAB */}
        {activeTab === "about" && (
          <div className="space-y-12">
            {/* Mission and Vision */}
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Мисия и видение</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-8 border border-green-200">
                  <h3 className="text-xl font-bold text-green-600 mb-4">Нашата мисия</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Мисията ни е да съдържаме поддържани, здрави и красиви зелени пространства за живот и работа в С[...]
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-8 border border-green-200">
                  <h3 className="text-xl font-bold text-green-600 mb-4">Нашето видение</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Вярваме, че всеки добре поддържан двор носи повече спокойствие и стойност на имота. Поддържаме �[...]
                  </p>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center border-t-4 border-green-600">
                  <div className="text-4xl font-bold text-green-600 mb-2">15,000+</div>
                  <p className="text-gray-700">Поддържани зелени площи (кв.метри)</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 text-center border-t-4 border-green-600">
                  <div className="text-4xl font-bold text-green-600 mb-2">120+</div>
                  <p className="text-gray-700">Доволни клиенти и обекти</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 text-center border-t-4 border-green-600">
                  <div className="text-4xl font-bold text-green-600 mb-2">20+</div>
                  <p className="text-gray-700">Години опит в сферата</p>
                </div>
              </div>
            </section>

            {/* Location */}
            <section className="bg-gradient-to-r from-green-50 to-white rounded-lg p-8 border border-green-200">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📍</div>
                <div>
                  <h3 className="text-xl font-bold text-green-600 mb-2">София и регион</h3>
                  <p className="text-gray-700">
                    Бърза реакция, познаване на терена
                  </p>
                </div>
              </div>
            </section>

            {/* Working hours */}
            <section className="bg-white rounded-lg shadow-lg p-8 border border-green-200">
              <h3 className="text-xl font-bold text-green-600 mb-6">Работно време</h3>
              <p className="text-gray-700 font-semibold">Почиваме само в неделя</p>
            </section>
          </div>
        )}

        {/* TEAM TAB */}
        {activeTab === "team" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Нашият екип</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-green-100"
                >
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
                    <div className="text-6xl mb-3">{member.image}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-green-600 font-semibold text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-700 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VALUES TAB */}
        {activeTab === "values" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Наши ценности</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value) => (
                <div
                  key={value.id}
                  className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-green-600"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-green-600 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white my-12">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Готови ли сте да работите с нас?
          </h2>
          <p className="text-green-50 mb-6">
            Свържете се с нас и получете безплатна консултация
          </p>
          <Link
            href="/bg/contact"
            className="inline-block bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-colors"
          >
            Заявете консултация
          </Link>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t py-8 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto flex justify-between flex-wrap gap-4">
          <Link href="/bg" className="text-green-600 hover:text-green-700 font-semibold">
            ← Начало
          </Link>
          <Link
            href="/bg/services"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            Услуги →
          </Link>
        </div>
      </div>
    </div>
  );
}
