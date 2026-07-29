"use client";

import Link from "next/link";
import { useState } from "react";

interface Plant {
  id: number;
  name: string;
  description: string;
  care: string[];
}

interface CareSection {
  title: string;
  tips: string[];
}

interface LawnCareGuide {
  title: string;
  icon: string;
  tips: string[];
}

interface PlantsData {
  trees: Plant[];
  shrubs: Plant[];
  flowers: Plant[];
  vegetables: Plant[];
}

export default function PlantAndLawnCareEn() {
  const [activeTab, setActiveTab] = useState<"plants" | "lawn">("plants");

  const plants: PlantsData = {
    trees: [
      {
        id: 1,
        name: "Plane Tree (Platanus orientalis)",
        description: "A common tree in parks and along streets",
        care: [
          "Watering: Prefers moist soil; water regularly.",
          "Light: Full sun or partial shade.",
          "Fertilizing: Feed in spring with organic fertilizer.",
          "Pruning: Prune in late winter to maintain shape.",
          "Soil: Well-drained, fertile soil.",
        ],
      },
      {
        id: 2,
        name: "Oak (Quercus spp.)",
        description: "A strong tree typical of Bulgarian forests",
        care: [
          "Watering: Moderate; drought-tolerant once established.",
          "Light: Full sun.",
          "Fertilizing: Apply organic compost in spring.",
          "Pruning: Minimal pruning; remove dead branches.",
          "Soil: Deep, well-drained soil.",
        ],
      },
      {
        id: 3,
        name: "Maple (Acer spp.)",
        description: "A beautiful ornamental tree with attractive foliage",
        care: [
          "Watering: Water regularly during the first year, then during dry periods.",
          "Light: Sun or partial shade.",
          "Fertilizing: Use balanced fertilizer in spring.",
          "Pruning: Prune in winter when dormant.",
          "Soil: Moist, well-drained soil.",
        ],
      },
      {
        id: 4,
        name: "Linden (Tilia spp.)",
        description: "A fragrant tree with sweet-smelling flowers",
        care: [
          "Watering: Water regularly during the growing season.",
          "Light: Full sun to partial shade.",
          "Fertilizing: Add compost in early spring.",
          "Pruning: Prune after flowering if needed.",
          "Soil: Rich, well-drained soil.",
        ],
      },
      {
        id: 5,
        name: "Black Pine (Pinus nigra)",
        description: "A hardy conifer with a slender form",
        care: [
          "Watering: Moderate; drought-tolerant once established.",
          "Light: Full sun.",
          "Fertilizing: Use a conifer-specific fertilizer in spring.",
          "Pruning: Light pruning only to remove damaged branches.",
          "Soil: Well-drained sandy or loamy soil.",
        ],
      },
      {
        id: 6,
        name: "Cypress (Cupressus sempervirens)",
        description: "An elegant conifer with a columnar shape",
        care: [
          "Watering: Moderate; avoid overwatering.",
          "Light: Full sun.",
          "Fertilizing: Feed with conifer fertilizer in spring.",
          "Pruning: Trim lightly to maintain shape.",
          "Soil: Well-drained soil.",
        ],
      },
    ],
    shrubs: [
      {
        id: 7,
        name: "Thuja (Thuja occidentalis)",
        description: "Popular for hedges and decorative landscaping",
        care: [
          "Watering: Water regularly in the first year, then during dry spells.",
          "Light: Sun or partial shade.",
          "Fertilizing: Apply evergreen fertilizer in spring.",
          "Pruning: Trim in late spring or summer.",
          "Soil: Moist, well-drained soil.",
        ],
      },
      {
        id: 8,
        name: "Leyland Cypress (Cupressocyparis leylandii)",
        description: "A fast-growing conifer ideal for hedges",
        care: [
          "Watering: Water regularly, especially in the first year and during hot weather.",
          "Light: Sun or partial shade.",
          "Fertilizing: Feed in spring with balanced fertilizer.",
          "Pruning: Prune 2-3 times per year to control growth.",
          "Soil: Fertile, well-drained soil.",
        ],
      },
      {
        id: 9,
        name: "Boxwood (Buxus sempervirens)",
        description: "A compact evergreen for hedges and topiary",
        care: [
          "Watering: Moderate; do not let the soil dry out completely.",
          "Light: Partial shade is ideal, but it tolerates sun.",
          "Fertilizing: Use slow-release fertilizer in spring.",
          "Pruning: Prune regularly to maintain shape.",
          "Soil: Well-drained, slightly alkaline soil.",
        ],
      },
      {
        id: 10,
        name: "Lavender (Lavandula angustifolia)",
        description: "A fragrant shrub with beautiful purple flowers",
        care: [
          "Watering: Moderate; drought-tolerant once established.",
          "Light: Full sun.",
          "Fertilizing: Minimal feeding; avoid rich fertilizers.",
          "Pruning: Prune after flowering to keep plants compact.",
          "Soil: Light, well-drained, slightly alkaline soil.",
        ],
      },
      {
        id: 11,
        name: "Honeysuckle (Lonicera spp.)",
        description: "A fast-growing plant with fragrant flowers and berries",
        care: [
          "Watering: Water regularly, especially in the first year.",
          "Light: Sun or partial shade.",
          "Fertilizing: Feed with balanced fertilizer in spring.",
          "Pruning: Prune after flowering to control growth.",
          "Soil: Moist, fertile, well-drained soil.",
        ],
      },
      {
        id: 12,
        name: "Spirea (Spiraea spp.)",
        description: "An ornamental shrub with many small flowers",
        care: [
          "Watering: Moderate; water regularly during dry periods.",
          "Light: Full sun.",
          "Fertilizing: Apply compost or balanced fertilizer in spring.",
          "Pruning: Prune after flowering to encourage new growth.",
          "Soil: Well-drained soil.",
        ],
      },
    ],
    flowers: [
      {
        id: 13,
        name: "Rose (Rosa spp.)",
        description: "The queen of flowers and a symbol of beauty",
        care: [
          "Watering: Water regularly and deeply, especially in summer.",
          "Light: 6-8 hours of full sun daily.",
          "Fertilizing: Feed with rose fertilizer every 4-6 weeks.",
          "Pruning: Prune in late winter or early spring.",
          "Soil: Fertile, well-drained soil.",
        ],
      },
      {
        id: 14,
        name: "Tulip (Tulipa spp.)",
        description: "An early spring flower available in many colors",
        care: [
          "Watering: Moderate during the growing season.",
          "Light: Full sun.",
          "Fertilizing: Feed when shoots appear and after flowering.",
          "Pruning: Remove spent flowers; let foliage die back naturally.",
          "Soil: Well-drained soil.",
        ],
      },
      {
        id: 15,
        name: "Daffodil (Narcissus spp.)",
        description: "A bright spring flower with a distinctive fragrance",
        care: [
          "Watering: Moderate during the growing season.",
          "Light: Sun or partial shade.",
          "Fertilizing: Apply bulb fertilizer in early spring.",
          "Pruning: Remove faded blooms only.",
          "Soil: Well-drained soil.",
        ],
      },
      {
        id: 16,
        name: "Lily (Lilium spp.)",
        description: "An elegant flower with a strong fragrance",
        care: [
          "Watering: Water regularly; avoid waterlogging.",
          "Light: Sun or partial shade.",
          "Fertilizing: Use complete fertilizer during active growth.",
          "Pruning: Remove spent flowers and dead stems.",
          "Soil: Rich, well-drained soil.",
        ],
      },
      {
        id: 17,
        name: "Geranium (Pelargonium spp.)",
        description: "A popular balcony flower with attractive foliage",
        care: [
          "Watering: Water regularly, allowing the soil to dry slightly between waterings.",
          "Light: Full sun to partial shade.",
          "Fertilizing: Feed every 2-3 weeks during the growing season.",
          "Pruning: Pinch back to encourage bushy growth.",
          "Soil: Light, well-drained potting mix.",
        ],
      },
      {
        id: 18,
        name: "Hydrangea (Hydrangea spp.)",
        description: "A stunning plant with large flower clusters",
        care: [
          "Watering: Water deeply and regularly, especially in summer.",
          "Light: Partial shade.",
          "Fertilizing: Use hydrangea fertilizer in spring and early summer.",
          "Pruning: Prune according to variety type.",
          "Soil: Moist, rich, well-drained soil.",
        ],
      },
    ],
    vegetables: [
      {
        id: 19,
        name: "Tomato (Solanum lycopersicum)",
        description: "A popular vegetable for summer gardens",
        care: [
          "Watering: Water regularly and deeply, especially during fruiting.",
          "Light: At least 6-8 hours of direct sun.",
          "Fertilizing: Feed every 2-3 weeks with tomato fertilizer.",
          "Pruning: Remove suckers on indeterminate varieties.",
          "Soil: Fertile, well-drained soil.",
        ],
      },
      {
        id: 20,
        name: "Cucumber (Cucumis sativus)",
        description: "A vegetable that needs warmth and moisture",
        care: [
          "Watering: Water abundantly and consistently, especially during flowering and fruiting.",
          "Light: Full sun (at least 6 hours daily).",
          "Fertilizing: Feed with balanced fertilizer every 2 weeks.",
          "Pruning: Remove damaged leaves and train vines as needed.",
          "Soil: Loose, fertile, well-drained soil.",
        ],
      },
      {
        id: 21,
        name: "Pepper (Capsicum annuum)",
        description: "A heat-loving vegetable with rich flavor",
        care: [
          "Watering: Water regularly and moderately; avoid overwatering.",
          "Light: Full sun.",
          "Fertilizing: Feed every 2-3 weeks with phosphorus-rich fertilizer.",
          "Pruning: Remove early flowers for stronger growth if needed.",
          "Soil: Warm, fertile, well-drained soil.",
        ],
      },
      {
        id: 22,
        name: "Onion (Allium cepa)",
        description: "A kitchen staple that is easy to grow",
        care: [
          "Watering: Moderate; avoid overwatering.",
          "Light: Full sun.",
          "Fertilizing: Use organic fertilizer before planting.",
          "Pruning: No pruning needed; remove dry leaves.",
          "Soil: Loose, fertile, well-drained soil.",
        ],
      },
      {
        id: 23,
        name: "Garlic (Allium sativum)",
        description: "A flavorful vegetable with many health benefits",
        care: [
          "Watering: Moderate; water at the base of the plant.",
          "Light: Full sun.",
          "Fertilizing: Add compost before planting.",
          "Pruning: Remove flower stalks to improve bulb size.",
          "Soil: Well-drained, fertile soil.",
        ],
      },
      {
        id: 24,
        name: "Carrot (Daucus carota)",
        description: "A sweet orange root vegetable",
        care: [
          "Watering: Water regularly and moderately.",
          "Light: Sun or partial shade.",
          "Fertilizing: Use low-nitrogen fertilizer.",
          "Pruning: Thin seedlings to provide adequate spacing.",
          "Soil: Loose, deep, stone-free soil.",
        ],
      },
    ],
  };

  const generalCare: CareSection[] = [
    {
      title: "Watering",
      tips: [
        "Water early in the morning or late in the evening to reduce evaporation.",
        "Water more frequently in summer due to higher temperatures.",
        "Use drip irrigation for efficient watering and water savings.",
      ],
    },
    {
      title: "Fertilizing and Feeding",
      tips: [
        "Feed plants during the growing season (March-September).",
        "Use complete fertilizers suited to each plant type.",
        "Organic fertilizers (compost, manure) improve long-term soil quality.",
      ],
    },
    {
      title: "Pruning and Shaping",
      tips: [
        "Regular pruning encourages dense, healthy growth.",
        "Prune during the active season (March-August).",
        "Remove dead or diseased branches immediately.",
        "Shape hedges and ornamental plants regularly.",
      ],
    },
    {
      title: "Soil and Mulching",
      tips: [
        "Well-drained soil is essential for most plants.",
        "Apply organic mulch around the base of plants.",
        "Mulch helps retain moisture and improve soil fertility.",
        "Keep mulch away from stems and trunks to prevent rot.",
      ],
    },
    {
      title: "Disease and Pest Protection",
      tips: [
        "Inspect plants regularly for signs of disease.",
        "Remove affected leaves or branches promptly.",
        "Use organic or chemical treatments when necessary.",
        "Maintain good airflow between plants to prevent fungal issues.",
      ],
    },
  ];

  const lawnCareGuides: LawnCareGuide[] = [
    {
      title: "Lawn Watering",
      icon: "💧",
      tips: [
        "Water early in the morning or late in the evening to reduce evaporation.",
        "Water 2-3 times per week in summer.",
        "Apply 10-15 liters of water per square meter.",
        "Use a sprinkler or drip irrigation system for even coverage.",
      ],
    },
    {
      title: "Mowing",
      icon: "✂️",
      tips: [
        "Mow every 7-10 days during the growing season.",
        "Maintain grass height at 4-5 cm.",
        "Never remove more than one-third of the grass height at once.",
        "Use sharp mower blades for clean cuts.",
      ],
    },
    {
      title: "Fertilizing and Feeding",
      icon: "🌱",
      tips: [
        "Spring: Use nitrogen-rich fertilizer for active growth.",
        "Summer: Use potassium- and phosphorus-rich fertilizer for stress tolerance.",
        "Fall: Apply an autumn lawn fertilizer for winter preparation.",
        "Do not fertilize during very hot weather.",
      ],
    },
    {
      title: "Weed Control",
      icon: "🚫",
      tips: [
        "Regular mowing helps suppress weeds.",
        "A healthy, dense lawn naturally resists weed growth.",
        "Hand-pull weeds in small areas.",
        "Use selective lawn herbicides when needed.",
      ],
    },
    {
      title: "Aeration and Drainage",
      icon: "🌬️",
      tips: [
        "Aerate the lawn 1-2 times per year.",
        "Spring and fall are ideal for aeration.",
        "Use a lawn aerator or garden fork.",
        "Top-dress after aeration to improve soil structure.",
      ],
    },
    {
      title: "Verticutting",
      icon: "⚙️",
      tips: [
        "Verticut in spring or fall.",
        "This removes dead grass and thatch buildup.",
        "It improves root aeration.",
        "It promotes denser turf growth.",
        "Do this before fertilizing for better nutrient absorption.",
      ],
    },
    {
      title: "Disease Protection",
      icon: "🛡️",
      tips: [
        "A healthy lawn is less vulnerable to disease.",
        "Avoid excessive watering.",
        "Ensure good air circulation.",
        "Use fungicides for fungal diseases when required.",
      ],
    },
    {
      title: "Seasonal Care",
      icon: "🌍",
      tips: [
        "Spring: Aerate, fertilize, and begin regular mowing.",
        "Summer: Water deeply and mow less frequently during heat.",
        "Fall: Apply final fertilizer and prepare for winter.",
        "Winter: Keep off frozen grass and avoid heavy traffic.",
      ],
    },
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
              ? "A complete guide to growing and maintaining all types of plants in Bulgaria."
              : "Everything you need to know to maintain a beautiful, healthy lawn in Bulgaria."}
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
          <p className="text-green-50 mb-6">
            Contact us for personalized advice and consultation for your garden or lawn.
          </p>
          <Link
            href="/en/contact"
            className="inline-block bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-colors"
          >
            Schedule a Consultation
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

function PlantCard({ plant }: { plant: Plant }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
        <h3 className="text-lg font-bold text-white">{plant.name}</h3>
        <p className="text-green-50 text-sm">{plant.description}</p>
      </div>
      <div className="p-4 flex-grow">
        <h4 className="font-bold text-gray-800 mb-3 text-sm">Care instructions:</h4>
        <ul className="space-y-2">
          {plant.care.map((care, careIndex) => (
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
