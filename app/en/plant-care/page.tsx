"use client";

import Link from "next/link";
import { useState } from "react";

export default function PlantAndLawnCareEn() {
  const [activeTab, setActiveTab] = useState<"plants" | "lawn">("plants");

  const plants = {
    trees: [
      { id: 1, name: "Plane (Platanus orientalis)", description: "Common tree in parks and streets", care: ["Watering: Prefers moist soil, water regularly", "Light: Full sun or partial shade", "Fertilizing: Mineral fertilizers in spring", "Pruning: February-March before growth starts", "Soil: Moist, well-drained"] },
      { id: 2, name: "Oak (Quercus spp.)", description: "Powerful tree characteristic of Bulgarian forests", care: ["Watering: Moderate, drought tolerant", "Light: Full sun", "Fertilizing: Organic fertilizers once yearly", "Pruning: Minimal, only remove sick branches", "Soil: Adaptive tree, grows on different soil types"] },
      { id: 3, name: "Maple (Acer spp.)", description: "Beautiful flowering tree with attractive leaves", care: ["Watering: Regular in first year, then during drought", "Light: Sun or partial shade", "Fertilizing: Organic fertilizers in spring", "Pruning: February or August", "Soil: Well-drained, prefers neutral soil"] },
      { id: 4, name: "Linden (Tilia spp.)", description: "Fragrant tree with sweet flowers", care: ["Watering: Regular during growing season", "Light: Full sun to partial shade", "Fertilizing: Complex fertilizer in spring", "Pruning: February before growth starts", "Soil: Adaptive, prefers fertile soil"] },
      { id: 5, name: "Black Pine (Pinus nigra)", description: "Hardy conifer with slender form", care: ["Watering: Moderate, drought tolerant", "Light: Full sun", "Fertilizing: Specialized conifer fertilizer", "Pruning: Minimal, shaping only", "Soil: Well-drained, not too acidic"] },
      { id: 6, name: "Cypress (Cupressus sempervirens)", description: "Elegant conifer with columnar form", care: ["Watering: Moderate, avoid overwatering", "Light: Full sun", "Fertilizing: Conifer fertilizer in spring", "Pruning: Spring and early summer", "Soil: Well-drained, dry"] },
    ],
    shrubs: [
      { id: 7, name: "Thuja (Thuja occidentalis)", description: "Popular for hedges and decorative purposes", care: ["Watering: Regular first year, then during drought", "Light: Sun or partial shade", "Fertilizing: Complex conifer fertilizer in spring", "Pruning: February to August, maintain desired shape", "Soil: Well-drained, moist, not waterlogged"] },
      { id: 8, name: "Leyland Cypress (Cupressocyparis leylandii)", description: "Fast-growing conifer for hedges", care: ["Watering: Regular, especially first year and hot periods", "Light: Sun or partial shade", "Fertilizing: Conifer fertilizer spring and summer", "Pruning: Spring and summer, avoid cold seasons", "Protection: Watch for rot with excessive moisture"] },
      { id: 9, name: "Boxwood (Buxus sempervirens)", description: "Compact evergreen for hedges and topiaries", care: ["Watering: Moderate, avoid drying out", "Light: Partial shade ideal, tolerates shade", "Fertilizing: Light feeding during growing season", "Pruning: Spring and summer, can be shaped", "Soil: Well-drained"] },
      { id: 10, name: "Lavender (Lavandula angustifolia)", description: "Fragrant shrub with beautiful purple flowers", care: ["Watering: Moderate, drought adapted", "Light: Full sun", "Fertilizing: Minimal - poor soil preferred", "Pruning: August after flowering", "Soil: Well-drained, prefers dry soil"] },
      { id: 11, name: "Honeysuckle (Lonicera spp.)", description: "Fast-growing plant with beautiful flowers and berries", care: ["Watering: Regular, especially first year", "Light: Sun or partial shade", "Fertilizing: Complex fertilizer spring and summer", "Pruning: After flowering or early spring", "Soil: Adapts to different soil types"] },
      { id: 12, name: "Spirea (Spiraea spp.)", description: "Decorative shrub with many small flowers", care: ["Watering: Moderate, water regularly during drought", "Light: Full sun", "Fertilizing: Organic fertilizers in spring", "Pruning: Spring before growth starts", "Soil: Well-drained, light and fertile"] },
    ],
    flowers: [
      { id: 13, name: "Rose (Rosa spp.)", description: "Queen of flowers, symbol of beauty", care: ["Watering: Regular and abundant, especially in summer", "Light: 6-8 hours full sun daily", "Fertilizing: Specialized rose fertilizer during growing season", "Pruning: February-March to half height", "Soil: Well-drained, fertile, acidic"] },
      { id: 14, name: "Tulip (Tulipa spp.)", description: "Early spring flower with rich color choice", care: ["Watering: Moderate during growing season", "Light: Full sun", "Fertilizing: Feed when sprouting", "Pruning: Remove flowers after blooming, keep leaves", "Soil: Well-drained, light"] },
      { id: 15, name: "Narcissus (Narcissus spp.)", description: "Bright spring flower with distinctive fragrance", care: ["Watering: Moderate during growing season", "Light: Sun or partial shade", "Fertilizing: Minimal, hardy plant", "Pruning: Remove dead flowers, keep leaves", "Soil: Well-drained"] },
      { id: 16, name: "Lily (Lilium spp.)", description: "Elegant flower with strong fragrance", care: ["Watering: Regular, avoid overwatering", "Light: Sun or partial shade", "Fertilizing: Complex fertilizer during growing season", "Pruning: Remove dead flowers and stems", "Soil: Well-drained, fertile"] },
      { id: 17, name: "Geranium (Pelargonium spp.)", description: "Popular balcony flower with beautiful leaves", care: ["Watering: Regular but allow soil to dry between waterings", "Light: Full sun (minimum 4 hours)", "Fertilizing: Regular feeding during growing season", "Pruning: Regulate shape and remove dead flowers", "Soil: Well-drained, light"] },
      { id: 18, name: "Hydrangea (Hydrangea spp.)", description: "Stunning blooms with large flower clusters", care: ["Watering: Abundant regular watering, especially in summer", "Light: Partial shade, avoid all-day sun", "Fertilizing: Specialized hydrangea fertilizer", "Pruning: February-March, remove dead branches", "Soil: Acidic to neutral, well-drained"] },
    ],
    vegetables: [
      { id: 19, name: "Tomato (Solanum lycopersicum)", description: "Popular vegetable for summer gardening", care: ["Watering: Regular and abundant, especially during fruiting", "Light: Minimum 6-8 hours full sun", "Fertilizing: Complex fertilizer every 2-3 weeks, high potassium", "Pruning: Suckering - remove side shoots", "Soil: Fertile, well-drained, pH 6-7"] },
      { id: 20, name: "Cucumber (Cucumis sativus)", description: "Vegetable needing warmth and moisture", care: ["Watering: Abundant and regular, especially during flowering", "Light: Full sun (minimum 8 hours)", "Fertilizing: Regular feeding with complex fertilizers", "Support: Cucumbers need netting or trellis", "Soil: Fertile, moist, well-drained"] },
      { id: 21, name: "Pepper (Capsicum annuum)", description: "Thermophilic vegetable with rich flavor", care: ["Watering: Regular and moderate, avoid overwatering", "Light: Full sun", "Fertilizing: Feed every 2 weeks with phosphorus-rich fertilizer", "Pruning: Remove first flowers for better growth", "Soil: Fertile, warm, well-drained"] },
      { id: 22, name: "Onion (Allium cepa)", description: "Essential in kitchen and easy to grow", care: ["Watering: Moderate, avoid overwatering", "Light: Full sun", "Fertilizing: Organic fertilizers at planting", "Pruning: Minimal", "Soil: Well-drained, fertile"] },
      { id: 23, name: "Garlic (Allium sativum)", description: "Tasty vegetable with health benefits", care: ["Watering: Moderate, at base of plant", "Light: Full sun", "Fertilizing: Organic fertilizers at planting", "Pruning: Remove flower stems for better bulbs", "Soil: Well-drained, fertile"] },
      { id: 24, name: "Carrot (Daucus carota)", description: "Sweet orange root vegetable", care: ["Watering: Regular and moderate", "Light: Sun or partial shade", "Fertilizing: Organic fertilizers at planting", "Pruning: Thinning overcrowded seedlings", "Soil: Loose, well-drained, stone-free"] },
    ]
  };

  const generalCare = [
    { title: "Watering", tips: ["Water early morning or late evening to avoid evaporation", "Water more frequently in summer due to higher temperatures", "Use drip irrigation for efficiency and savings", "Avoid overwatering and waterlogging"] },
    { title: "Fertilizing and Feeding", tips: ["Feed plants during growing season (March-September)", "Use complex fertilizers suited to plant type", "Organic fertilizers (compost, manure) are excellent", "Increase doses for vegetables during fruiting"] },
    { title: "Pruning and Shaping", tips: ["Regular pruning encourages dense growth", "Prune during growing season (March-August)", "Remove dead or diseased branches immediately", "Shape living hedges to desired form"] },
    { title: "Soil and Mulching", tips: ["Well-drained soil is critical for most plants", "Mulch with organic materials around the base", "Mulch helps retain moisture and increase fertility", "Keep 5-10 cm distance between mulch and stem"] },
    { title: "Disease and Pest Protection", tips: ["Regularly inspect plants for disease signs", "Remove affected branches immediately", "Use organic or chemical treatments when needed", "Maintain good hygiene and cleanliness in garden"] }
  ];

  const lawnCareGuides = [
    { title: "Lawn Watering", icon: "💧", tips: ["Water early morning or late evening to avoid evaporation", "Water 2-3 times weekly in summer", "Aim for 10-15 liters per square meter", "Use drip irrigation for more efficient watering", "Reduce watering significantly in winter"] },
    { title: "Mowing", icon: "✂️", tips: ["Mow every 7-10 days during growing season", "Maintain grass height of 4-5 cm", "Never remove more than 1/3 of height", "Use sharp blades for clean cuts", "During summer heat, mow longer (5-6 cm)"] },
    { title: "Fertilizing and Feeding", icon: "🌱", tips: ["Spring: nitrogen fertilizers for fast growth", "Summer: potassium-phosphorus fertilizers for health", "Fall: special autumn fertilizers", "Winter: reduce feeding", "Fertilize every 4-6 weeks during growing season"] },
    { title: "Weed Control", icon: "🚫", tips: ["Regular mowing displaces weeds", "Healthy lawn protects itself from weeds", "Hand pulling for small areas", "Selective herbicides for lawns if needed", "Maintain dense lawn for natural protection"] },
    { title: "Aeration and Drainage", icon: "🌬️", tips: ["Aerate lawn 1-2 times yearly", "Spring and fall are ideal periods", "Use specialized aerator or fork", "Top dressing after aeration improves soil", "Allows oxygen to reach roots"] },
    { title: "Verticutting", icon: "⚙️", tips: ["Verticut in spring or fall", "Removes dead grass and thatch", "Improves root ventilation", "Promotes denser growth", "Do this before fertilizing or aerating"] },
    { title: "Disease Protection", icon: "🛡️", tips: ["Healthy lawn is protected from diseases", "Avoid excessive watering", "Ensure good air circulation", "Use fungicides for fungal diseases", "Regularly check for disease signs"] },
    { title: "Seasonal Care", icon: "🌍", tips: ["Spring: aerate, fertilize, start regular mowing", "Summer: intensive watering, less frequent mowing", "Fall: final feeding, winter preparation", "Winter: minimal care, avoid walking on frozen grass", "Focus on growth period"] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header with Tabs */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Garden and Lawn Care</h1>
          
          {/* Tab Switcher */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("plants")}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                activeTab === "plants"
                  ? "bg-white text-green-600 shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              🌿 Plant Care
            </button>
            <button
              onClick={() => setActiveTab("lawn")}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                activeTab === "lawn"
                  ? "bg-white text-green-600 shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              🌾 Lawn Care
            </button>
          </div>
          
          <p className="text-xl text-green-50">
            {activeTab === "plants" 
              ? "Complete guide for growing and maintaining all types of plants in Bulgaria"
              : "Everything you need to know about maintaining a beautiful and healthy lawn in Bulgaria"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* PLANTS TAB */}
        {activeTab === "plants" && (
          <div>
            {/* General Care Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Basic Care Rules</h2>
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
                <span className="text-4xl mr-3">🌳</span> Trees
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
                <span className="text-4xl mr-3">🌿</span> Shrubs
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
                <span className="text-4xl mr-3">🌸</span> Flowers
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
                <span className="text-4xl mr-3">🥬</span> Vegetables
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
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Basic Lawn Care Rules</h2>
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
          <h2 className="text-2xl font-bold mb-4">Have questions or need professional help?</h2>
          <p className="text-green-50 mb-6">Contact us for personalized advice and consultation for your garden or lawn</p>
          <Link
            href="/en/contact"
            className="inline-block bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-colors"
          >
            Schedule Consultation
          </Link>
        </section>
      </div>

      {/* Footer Navigation */}
      <div className="border-t mt-12 py-8 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto flex justify-between flex-wrap gap-4">
          <Link href="/en" className="text-green-600 hover:text-green-700 font-semibold">
            ← Home
          </Link>
          <Link href="/en/services" className="text-green-600 hover:text-green-700 font-semibold">
            Services →
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
        <h4 className="font-bold text-gray-800 mb-3 text-sm">Care instructions:</h4>
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
