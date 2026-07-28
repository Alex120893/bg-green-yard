"use client";

import Link from "next/link";
import { useState } from "react";
import { TabNav } from "@/components/TabNav";

export default function PlantAndLawnCare() {
  const [activeTab, setActiveTab] = useState<"plants" | "lawn">("plants");

  const tabs = [
    { id: "plants", label: "Грижа за растенията", icon: "🌿" },
    { id: "lawn", label: "Грижа за тревата", icon: "🌾" },
  ];

  // PLANTS DATA
  const plants = {
    trees: [
      {
        id: 1,
        name: "Платан (Platanus orientalis)",
        description: "Разпространено дърво в парки и по улици",
        care: [
          "Поливане: Предпочита влажна почва, регулярно поливайте",
          "Светлина: Пълно слънце или полусянка",
          "Подхранване: Минерални торове през пролетта",
          "Подрязване: През февруари-март преди началото на растежа",
          "Почва: Влажна, добре дренирана"
        ]
      },
      {
        id: 2,
        name: "Дъб (Quercus spp.)",
        description: "Характерно за българските гори мощно дърво",
        care: [
          "Поливане: Умерено, устойчив на суша",
          "Светлина: Пълно слънце",
          "Подхранване: Органични торове веднъж годишно",
          "Подрязване: Минимално, само отстраняване на болни клони",
          "Почва: Адаптивно дърво, расте на различни типове почва"
        ]
      },
      {
        id: 3,
        name: "Клен (Acer spp.)",
        description: "Красивоцъфтяще дърво с привлекателни листа",
        care: [
          "Поливане: Редовно през първата година, след това при суша",
          "Светлина: Слънце или полусянка",
          "Подхранване: Органични торове през пролетта",
          "Подрязване: През февруари или август",
          "Почва: Добре дренирана, предпочита неутрална почва"
        ]
      },
      {
        id: 4,
        name: "Липа (Tilia spp.)",
        description: "Ароматно дърво със сладки цветя",
        care: [
          "Поливане: Редовно през растежния период",
          "Светлина: Пълно слънце до полусянка",
          "Подхранване: Комплексен тор през пролетта",
          "Подрязване: През февруари преди началото на растежа",
          "Почва: Адаптивно, предпочита плодородна почва"
        ]
      },
      {
        id: 5,
        name: "Сосна черна (Pinus nigra)",
        description: "Устойчива хвойна със стройна форма",
        care: [
          "Поливане: Умерено, устойчива на суша",
          "Светлина: Пълно слънце",
          "Подхранване: Специализиран тор за иглолистни",
          "Подрязване: Минимално, само формиране",
          "Почва: Добре дренирана, не толкова кислинна"
        ]
      },
      {
        id: 6,
        name: "Кипарис (Cupressus sempervirens)",
        description: "Елегантно иглолистно дърво със стройна форма",
        care: [
          "Поливане: Умерено, избягвайте преливане",
          "Светлина: Пълно слънце",
          "Подхранване: Тор за иглолистни през пролетта",
          "Подрязване: През пролетта и началото на лятото",
          "Почва: Добре дренирана, суха"
        ]
      }
    ],
    shrubs: [
      {
        id: 7,
        name: "Туя (Thuja occidentalis)",
        description: "Популярна за живи плетове и декоративна функция",
        care: [
          "Поливане: Редовно през първата година, след това при суша",
          "Светлина: Слънце или полусянка",
          "Подхранване: Комплексен тор за иглолистни през пролетта",
          "Подрязване: От февруари до август, поддържайте желаната форма",
          "Почва: Добре дренирана, влажна, но не заблатена"
        ]
      },
      {
        id: 8,
        name: "Лейланди (Cupressocyparis leylandii)",
        description: "Бързорастящо иглолистно растение за живи плетове",
        care: [
          "Поливане: Редовно, особено през първата година и горещите периоди",
          "Светлина: Слънце или полусянка",
          "Подхранване: Тор за иглолистни през пролетта и лятото",
          "Подрязване: През пролетта и лятото, избягвайте студеното време",
          "Защита: Следете за загниване при прекомерно овлажняване"
        ]
      },
      {
        id: 9,
        name: "Самшун (Buxus sempervirens)",
        description: "Компактно листопадно растение за живи плетове и топиари",
        care: [
          "Поливане: Умерено, избягвайте пресушаване",
          "Светлина: Полусянка е идеална, толерира и сянка",
          "Подхранване: Лек тор през вегетационния период",
          "Подрязване: През пролетта и лятото, може да се оформя в различни форми",
          "Почва: Добре дренирана"
        ]
      },
      {
        id: 10,
        name: "Лаванда (Lavandula angustifolia)",
        description: "Ароматен кустарник с красиви пурпурни цветя",
        care: [
          "Поливане: Умерено, адаптирана към суша",
          "Светлина: Пълно слънце",
          "Подхранване: Минимално - бедната почва е предпочитана",
          "Подрязване: През август след цъфтежа",
          "Почва: Добре дренирана, предпочита суха почва"
        ]
      },
      {
        id: 11,
        name: "Жимолост (Lonicera spp.)",
        description: "Бързорастящо растение с красиви цветя и плодове",
        care: [
          "Поливане: Редовно, особено през първата година",
          "Светлина: Слънце или полусянка",
          "Подхранване: Комплексен тор през пролетта и лятото",
          "Подрязване: След цъфтежа или през ранната пролет",
          "Почва: Адаптира се към различни видове почва"
        ]
      },
      {
        id: 12,
        name: "Спирея (Spiraea spp.)",
        description: "Декоративен кустарник с многобройни малки цветя",
        care: [
          "Поливане: Умерено, при суша поливайте редовно",
          "Светлина: Пълно слънце",
          "Подхранване: Органични торове през пролетта",
          "Подрязване: През пролетта преди началото на растежа",
          "Почва: Добре дренирана, лека и плодородна"
        ]
      }
    ],
    flowers: [
      { id: 13, name: "Роза (Rosa spp.)", description: "Царица на цветята, символ на красотата", care: ["Поливане: Редовно и обилно", "Светлина: Пълно слънце", "Подхранване: Комплексен тор", "Подрязване: През пролетта и лятото", "Защита: От милдю и оидиум"] },
      { id: 14, name: "Тюлипан (Tulipa spp.)", description: "Ранна пролетна цветя с богат избор на цветове", care: ["Поливане: Умерено", "Светлина: Пълно слънце", "Подхранване: Фосфорни торове", "Засадка: През есента", "Климат: Предпочита хладни зими"] },
      { id: 15, name: "Нарцис (Narcissus spp.)", description: "Ярка пролетна цветя със специфичен аромат", care: ["Поливане: Умерено през растежа", "Светлина: Слънце до полусянка", "Подхранване: Органични торове", "Засадка: През есента", "Резистентност: Устойчив на студ"] },
      { id: 16, name: "Лилия (Lilium spp.)", description: "Елегантна цветя с силен аромат", care: ["Поливане: Редовно, избягвайте преливане", "Светлина: Слънце до полусянка", "Подхранване: Комплексен тор", "Подпора: При необходимост", "Климат: Устойчива на студ"] },
      { id: 17, name: "Герань (Pelargonium spp.)", description: "Популярна балконна цветя с красиви листа", care: ["Поливане: Редовно, но умерено", "Светлина: Слънце", "Подхранване: Минерален тор", "Подрязване: През пролетта", "Защита: От гниене при преливане"] },
      { id: 18, name: "Хортензия (Hydrangea spp.)", description: "Блестящо цъфтяща с големи соцветия", care: ["Поливане: Обилно редовно", "Светлина: Полусянка е идеална", "Подхранване: За синьо цъфтене - кислинни торове", "Подрязване: След цъфтежа", "Почва: Влажна, добре дренирана"] },
    ],
    vegetables: [
      { id: 19, name: "Домат (Solanum lycopersicum)", description: "Популярна овощ за лятното градинство", care: ["Поливане: Редовно и обилно", "Светлина: Пълно слънце", "Подхранване: Комплексен тор", "Поддържане: Тапинериране", "Климат: Топлолюбива растение"] },
      { id: 20, name: "Краставица (Cucumis sativus)", description: "Зеленчук, нуждаещ се от топлина и влага", care: ["Поливане: Обилно и редовно", "Светлина: Пълно слънце", "Подхранване: Азотни торове", "Растеж: Нуждае се от опора", "Температура: Минимум 15°C"] },
      { id: 21, name: "Пипер (Capsicum annuum)", description: "Термофилна овощ с богат вкус", care: ["Поливане: Редовно и умерено", "Светлина: Пълно слънце", "Подхранване: Калий и фосфор", "Температура: 20-25°C е идеално", "Защита: От хлорози и гниене"] },
      { id: 22, name: "Лук (Allium cepa)", description: "Незаменим в кухнята и лесен за отглеждане", care: ["Поливане: Умерено", "Светлина: Пълно слънце", "Подхранване: Лек тор на початък", "Почва: Добре дренирана", "Съхранение: Можа да се съхранява месеци"] },
      { id: 23, name: "Чесън (Allium sativum)", description: "Вкусна овощ с здравословни свойства", care: ["Поливане: Умерено в основата", "Светлина: Пълно слънце", "Подхранване: Азотни торове", "Засадка: През есента", "Събиране: През лятото"] },
      { id: 24, name: "Моркови (Daucus carota)", description: "Сладко-оранжев коренен зеленчук", care: ["Поливане: Редовно и умерено", "Светлина: Пълно слънце", "Подхранване: Лек тор", "Разреждане: През растежа", "Събиране: 70-80 дни след засаждането"] },
    ]
  };

  const generalCare = [
    { title: "Поливане", tips: ["Поливайте рано сутрин или късно вечер, за да избегнете изпаряване", "През лятото поливайте по-често", "Използвайте капково напояване за икономичност", "Избягвайте преливане на листата", "Проверете почвата преди поливане"] },
    { title: "Торене и подхранване", tips: ["Подхранвайте растенията през вегетационния период", "Използвайте комплексни торове", "Следвайте препоръките на производителя", "Органични торове са предпочитани", "Подхранвайте всеки 4-6 седмици"] },
    { title: "Подрязване и формиране", tips: ["Редовното подрязване насърчава гъстия растеж", "Подрязвайте през вегетационния период", "Отстранете мъртвите и болни клони", "Формирайте според желаната форма", "Дезинфекцирайте инструментите"] },
    { title: "Почва и мулчиране", tips: ["Добре дренирана почва е критична", "Мулчирайте с органични материали", "Поддържайте правилния pH", "Подменяйте подхранвателния слой", "Избягвайте уплътняване на почвата"] },
    { title: "Защита от болести и вредители", tips: ["Редовно проверявайте растенията", "Премахвайте засегнатите листа", "Използвайте органични препарати", "Поддържайте добра циркулация на въздуха", "Консултирайте се при съмнение"] },
  ];

  // LAWN DATA
  const lawnCareGuides = [
    { title: "Поливане на тревата", icon: "💧", tips: ["Поливайте рано сутрин или късно вечер, за да избегнете изпаряване", "През лятото поливайте 2-3 пъти седмично", "Ориентировайте се на 10-15 литра на квадратен метър", "Използвайте капково напояване за по-ефективен полив", "През зимата намалете поливането значително"] },
    { title: "Косене", icon: "✂️", tips: ["Косете всеки 7-10 дни през вегетационния период", "Поддържайте височина на тревата 4-5 см", "Никога не отстранявайте повече от 1/3 от височината", "Използвайте остър нож на коса за чисти срезки", "През лятото при суша косете по-дълги (5-6 см)"] },
    { title: "Торене и подхранване", icon: "🌱", tips: ["Пролет: азотни торове за бърз растеж", "Лято: калийно-фосфорни торове за здравост", "Есен: специални есенни торове", "Зима: намалете подхранването", "Торете всеки 4-6 седмици през растежния период"] },
    { title: "Борба със сорняци", icon: "🚫", tips: ["Редовно кошене превысява сорняци", "Здравата трава сама се защитава от сорняци", "Ръчна прополка за малки участъци", "Селективни гербициди за газоните при необходимост", "Поддържайте гъст газон за природна защита"] },
    { title: "Аерация и дренаж", icon: "🌬️", tips: ["Аерирайте газона 1-2 пъти годишно", "Пролет и есен са идеални периоди", "Използвайте специален аератор или вилане", "Подобрява дренажа и растежа", "Важно за стари газони"] },
    { title: "Вертикутиране", icon: "⚙️", tips: ["Вертикутирайте през пролетта или есента", "Отстранява мъртва трава и вътрешни растения", "Улеснява приема на торове", "Подобрява циркулацията на въздуха", "Прави газона по гъст"] },
    { title: "Защита от болести", icon: "🛡️", tips: ["Здравата трава е защитена от болести", "Избягвайте прекомерно овлажняване", "Редовна аерация предотвратява гниене", "При съмнение консултирайте експерт", "Правилен pH на почвата е важен"] },
    { title: "Сезонна грижа", icon: "🌍", tips: ["Пролет: аерирайте, торете, почнете редовно косене", "Лято: интензивен полив и косене", "Есен: подготвяте газона за зима", "Зима: минимално кошене при хладно"] },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Грижа за градина и трава</h1>
          <p className="text-xl text-green-50">
            Пълно ръководство за отглеждане и поддържане
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* PLANTS TAB */}
        {activeTab === "plants" && (
          <div>
            {/* General Care Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Основни правила за грижа</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generalCare.map((section, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm font-bold">
                        {index + 1}
                      </span>
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start text-sm text-gray-700">
                          <span className="text-green-600 mr-2 font-bold">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Trees Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <span className="text-4xl mr-3">🌳</span> Дървета
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plants.trees.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            </section>

            {/* Shrubs Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <span className="text-4xl mr-3">🌿</span> Кустарници
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plants.shrubs.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            </section>

            {/* Flowers Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <span className="text-4xl mr-3">🌸</span> Цветя
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plants.flowers.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            </section>

            {/* Vegetables Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <span className="text-4xl mr-3">🥬</span> Зеленчуци
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plants.vegetables.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* LAWN TAB */}
        {activeTab === "lawn" && (
          <div>
            {/* Main Care Guide */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Основни правила за грижа на тревата</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {lawnCareGuides.map((guide, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-3">{guide.icon}</div>
                    <h3 className="text-lg font-bold text-green-600 mb-4">{guide.title}</h3>
                    <ul className="space-y-2">
                      {guide.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start text-sm text-gray-700">
                          <span className="text-green-600 mr-2 font-bold">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Имате въпроси или нуждаете се от професионална помощ?</h2>
          <p className="text-green-50 mb-6">Свържете се с нас за персонални съветы и консултации за вашия град или трава</p>
          <Link
            href="/bg/contact"
            className="inline-block bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-colors"
          >
            Заявете консултация
          </Link>
        </section>
      </div>

      {/* Footer Navigation */}
      <div className="border-t mt-12 py-8 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto flex justify-between flex-wrap gap-4">
          <Link href="/bg" className="text-green-600 hover:text-green-700 font-semibold">
            ← Начало
          </Link>
          <Link href="/bg/services" className="text-green-600 hover:text-green-700 font-semibold">
            Услуги →
          </Link>
        </div>
      </div>
    </div>
  );
}

function PlantCard({ plant }: { plant: any }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
        <h3 className="text-lg font-bold text-white">{plant.name}</h3>
        <p className="text-green-50 text-sm">{plant.description}</p>
      </div>
      <div className="p-4 flex-grow">
        <h4 className="font-bold text-gray-800 mb-3 text-sm">Указания за грижа:</h4>
        <ul className="space-y-2">
          {plant.care.map((care: string, careIndex: number) => (
            <li key={careIndex} className="flex items-start text-xs text-gray-700">
              <span className="text-green-600 mr-2">●</span>
              <span>{care}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
