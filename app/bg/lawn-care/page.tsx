import Link from "next/link";

export default function LawnCare() {
  const lawnCareGuides = [
    {
      title: "Поливане на газона",
      icon: "💧",
      tips: [
        "Поливайте рано сутрин или късно вечер, за да избегнете изпаряване",
        "През лятото поливайте 2-3 пъти седмично",
        "Ориентировайте се на 10-15 литра на квадратен метър",
        "Използвайте капково напояване за по-ефективен полив",
        "През зимата намалете поливането значително"
      ]
    },
    {
      title: "Косене",
      icon: "✂️",
      tips: [
        "Косете всеки 7-10 дни през вегетационния период",
        "Поддържайте височина на тревата 4-5 см",
        "Никога не отстранявайте повече от 1/3 от височината",
        "Използвайте остър нож на коса за чисти срезки",
        "През лятото при суша косете по-дълги (5-6 см)"
      ]
    },
    {
      title: "Торене и подхранване",
      icon: "🌱",
      tips: [
        "Пролет: азотни торове за бърз растеж",
        "Лято: калийно-фосфорни торове за здравост",
        "Есен: специални есенни торове",
        "Зима: намалете подхранването",
        "Торете всеки 4-6 седмици през растежния период"
      ]
    },
    {
      title: "Борба с плевели",
      icon: "🚫",
      tips: [
        "Редовното косене ограничава плевелите",
        "Здравата тревна площ се защитава по-добре от плевели",
        "Ръчна прополка за малки участъци",
        "Селективни гербициди за газоните при необходимост",
        "Поддържайте гъст газон за природна защита"
      ]
    },
    {
      title: "Аерация и дренаж",
      icon: "🌬️",
      tips: [
        "Аерирайте газона 1-2 пъти годишно",
        "Пролет и есен са идеални периоди",
        "Използвайте специален аератор или градинска вила",
        "Пескование след аерация подобрява почвата",
        "Това позволява кислород да достигне корените"
      ]
    },
    {
      title: "Вертикутиране",
      icon: "⚙️",
      tips: [
        "Вертикутирайте през пролетта или есента",
        "Отстранява мъртва трава и войлок",
        "Подобрява вентилацията на корените",
        "Подпомага по-гъстия растеж",
        "Направете това преди торене или аерация"
      ]
    },
    {
      title: "Защита от болести",
      icon: "🛡️",
      tips: [
        "Здравият газон е защитен от болести",
        "Избягвайте прекомерно овлажняване",
        "Осигурете добра циркулация на въздуха",
        "При гъбични болести използвайте фунгициди",
        "Редовно проверявайте за признаци на болест"
      ]
    },
    {
      title: "Сезонна грижа",
      icon: "🌍",
      tips: [
        "Пролет: аерирайте, торете и започнете редовно косене",
        "Лято: интензивен полив, по-редко косене",
        "Есен: последно торене, подготовка за зима",
        "Зима: минимална грижа, избягвайте ходене по замръзнала тревна площ",
        "Фокусирайте се на периода на растеж"
      ]
    }
  ];

  const seasonalSchedule = [
    {
      season: "Пролет (март-май)",
      tasks: [
        "Аерирайте газона",
        "Торете с азотни торове",
        "Започнете редовно косене (на всеки 7–10 дни)",
        "Борете се с плевелите",
        "Проверете дренажа"
      ]
    },
    {
      season: "Лято (юни-август)",
      tasks: [
        "Интензивен полив 2-3 пъти седмично",
        "Косете всеки 7-10 дни",
        "Торете с калиево-фосфорни торове",
        "Мулчирайте при силна жега",
        "Проверете за болести"
      ]
    },
    {
      season: "Есен (септември-ноември)",
      tasks: [
        "Вертикутирайте газона",
        "Аерирайте отново",
        "Торете с есенни торове",
        "Намалете честотата на косене",
        "Почистете листата"
      ]
    },
    {
      season: "Зима (декември-февруари)",
      tasks: [
        "Минимален полив при нужда",
        "Без косене, ако температурата е под 5°C",
        "Избягвайте вървене по замръзнал газон",
        "Проверете здравето на газона",
        "Планирайте пролетните работи"
      ]
    }
  ];

  const commonProblems = [
    {
      problem: "Жълт или кафяв газон",
      solutions: [
        "Проверете поливането - може да е недостатъчно",
        "Проверете за болести или вредители",
        "Торете с подходящи торове",
        "Осигурете добра циркулация на въздуха"
      ]
    },
    {
      problem: "Мъх и войлок",
      solutions: [
        "Вертикутирайте газона регулярно",
        "Аерирайте за по-добър дренаж",
        "Избягвайте преливане",
        "Поддържайте правилната височина на тревата"
      ]
    },
    {
      problem: "Голямо количество плевели",
      solutions: [
        "Поддържайте гъст газон чрез редовно косене",
        "Торете за здрав растеж",
        "Ръчна прополка или селективни гербициди",
        "Осигурете добър дренаж и аерация"
      ]
    },
    {
      problem: "Лысеи (голи петна)",
      solutions: [
        "Проверете за вредители и болести",
        "Осигурете достатъчно светлина",
        "Засейте нови семена на голите места",
        "Торете подходящо за възстановяване"
      ]
    },
    {
      problem: "Застойна вода",
      solutions: [
        "Направете дренажни канали",
        "Аерирайте газона регулярно",
        "Пескование на повърхността",
        "Подобрете структурата на почвата"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Грижа за тревната площ</h1>
          <p className="text-xl text-green-50">Всичко което трябва да знаете за поддържане на красив и здрав газон в България</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Care Guide */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Основни правила за грижа на газона</h2>
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

        {/* Seasonal Schedule */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Сезонна схема за грижа</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {seasonalSchedule.map((schedule, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-green-600 mb-4">{schedule.season}</h3>
                <ul className="space-y-3">
                  {schedule.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start text-gray-700">
                      <span className="text-green-600 mr-3 text-lg">●</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Common Problems */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Често срещани проблеми и решения</h2>
          <div className="space-y-6">
            {commonProblems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-600 mb-4">⚠️ {item.problem}</h3>
                <div className="ml-4">
                  <p className="text-gray-600 font-semibold mb-3">Решения:</p>
                  <ul className="space-y-2">
                    {item.solutions.map((solution, solutionIndex) => (
                      <li key={solutionIndex} className="flex items-start text-gray-700">
                        <span className="text-green-600 mr-3">→</span>
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-16 bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">💡 Полезни съвети</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-3 text-lg">За оптимално здравие на газона:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Поддържайте последователна рутина на грижа</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Инвестирайте в добро оборудване</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Проверявайте почвата редовно</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Следете прогнозата за времето</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-lg">Екологични практики:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Използвайте органични торове</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Минимизирайте химикали</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Събирайте срязаната трава за компост</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Използвайте електрически косачки</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Нуждаете се от професионална помощ?</h2>
          <p className="text-blue-50 mb-6">Нашият екип е готов да помогне за красивия и здравия газон на вашия двор</p>
          <Link
            href="/bg/contact"
            className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-colors"
          >
            Заявете услуга
          </Link>
        </section>
      </div>

      {/* Navigation Links */}
      <div className="border-t mt-12 py-8 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto flex justify-between flex-wrap gap-4">
          <div className="flex gap-4">
            <Link href="/bg" className="text-green-600 hover:text-green-700 font-semibold">
              ← Начало
            </Link>
            <Link href="/bg/plant-care" className="text-green-600 hover:text-green-700 font-semibold">
              🌿 Грижа за растенията
            </Link>
          </div>
          <Link href="/bg/services" className="text-green-600 hover:text-green-700 font-semibold">
            Услуги →
          </Link>
        </div>
      </div>
    </div>
  );
}
