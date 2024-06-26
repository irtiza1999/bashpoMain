const productsData = [
    // E-Liquids
    {
        name: "Blue Raspberry Burst",
        brand: "VapeMaster",
        flavor: "Blue Raspberry",
        nicotineStrength: "3mg",
        description: "Experience the burst of sweet and tangy blue raspberry flavor in every puff.",
        category: "E-Liquids",
        deviceType: "Sub-Ohm",
        price: 19.99,
        countInStock: 50,
        image: "/blue_raspberry.webp",
        numReviews: 0,
        rating: 0,
        isVerified: true
    },
    {
        name: "Strawberry Fields",
        brand: "VapeNation",
        flavor: "Strawberry",
        nicotineStrength: "6mg",
        description: "Indulge in the luscious taste of ripe strawberries, perfect for all-day vaping.",
        category: "E-Liquids",
        deviceType: "Sub-Ohm",
        price: 22.99,
        countInStock: 40,
        image: "/strawberry_fields.jpeg",
        numReviews: 0,
        rating: 0,
        isVerified: true
    },

    // Vape Kits
    {
        name: "Starter Pro Kit",
        brand: "VapeTech",
        description: "The perfect kit for beginners, providing a smooth vaping experience.",
        category: "Vape Kits",
        deviceType: "Starter Kit",
        price: 34.99,
        countInStock: 30,
        image: "/starter_pro_kit.jpeg",
        numReviews: 0,
        rating: 0,
        isVerified: true
    },
    {
        name: "Advanced Vaporizer Kit",
        brand: "CloudChaser",
        description: "For the advanced user, unleash massive clouds with this powerful vaporizer kit.",
        category: "Vape Kits",
        deviceType: "Advanced Kit",
        price: 69.99,
        countInStock: 20,
        image: "/advanced_vaporizer_kit.jpeg",
        numReviews: 0,
        rating: 0,
        isVerified: true
    },

    // Tanks and Atomizers
    {
        name: "Sub-Ohm Beast Tank",
        brand: "VaporBeast",
        description: "Unleash the beast with this sub-ohm tank, delivering intense flavor and vapor production.",
        category: "Tanks and Atomizers",
        deviceType: "Sub-Ohm Tank",
        price: 29.99,
        countInStock: 25,
        image: "/sub_ohm_beast_tank.webp",
        numReviews: 0,
        rating: 0,
        isVerified: true
    },
    {
        name: "RDA Master",
        brand: "CoilCraft",
        description: "Perfect your coil-building skills with this high-quality rebuildable dripping atomizer.",
        category: "Tanks and Atomizers",
        deviceType: "RDA",
        price: 39.99,
        countInStock: 15,
        image: "/rda_master.webp",
        numReviews: 0,
        rating: 0,
        isVerified: true
    },

    // Coils and Replacement Parts
    {
        name: "Mesh Replacement Coils",
        brand: "VapeCoil",
        description: "Experience smooth and consistent vapor production with these mesh replacement coils.",
        category: "Coils and Replacement Parts",
        deviceType: "Replacement Coils",
        price: 12.99,
        countInStock: 50,
        image: "/mesh_replacement_coils.webp",
        numReviews: 0,
        rating: 0,
        isVerified: true
    },

    // Batteries and Chargers
    {
        name: "18650 High-Drain Battery",
        brand: "PowerCell",
        description: "Power up your device with this high-drain 18650 battery for extended vaping sessions.",
        category: "Batteries and Chargers",
        deviceType: "18650 Batteries",
        price: 14.99,
        countInStock: 30,
        image: "/18650_high_drain_battery.webp",
        numReviews: 0,
        rating: 0,
        isVerified: true
    },


    // Accessories
    {
        name: "VapeCase XL",
        brand: "GearGuard",
        description: "Protect your vape setup with this extra-large and durable vape case.",
        category: "Accessories",
        deviceType: "Vape Cases",
        price: 19.99,
        countInStock: 25,
        image: "/vape_case_xl.jpg",
        numReviews:0,
        rating: 0,
        isVerified: true
    },
    {
        name: "Drip Tip Variety Pack",
        brand: "TipCraft",
        description: "Customize your vaping experience with this variety pack of stylish drip tips.",
        category: "Accessories",
        deviceType: "Drip Tips",
        price: 9.99,
        countInStock: 30,
        image: "/drip_tip_variety_pack.jpeg",
        numReviews: 0,
        rating: 0,
        isVerified: true
    },

    // CBD Products
    {
        name: "CBD E-Liquid - Watermelon Bliss",
        brand: "CBDVape",
        flavor: "Watermelon",
        description: "Experience the calming effects of CBD with the refreshing taste of watermelon.",
        category: "CBD Products",
        deviceType: "CBD E-Liquids",
        price: 29.99,
        countInStock: 20,
        image: "/cbd_watermelon_bliss.jpeg",
        numReviews: 0,
        rating: 0,
        isVerified: true
    },
  
    // Apparel and Merchance
    {
        name: "VapeNation T-Shirt",
        brand: " ",
        description: "Show your love for vaping with this stylish VapeNation logo T-shirt.",
        category: "Apparel and Merchandise",
        deviceType: "T-Shirts",
        price: 14.99,
        countInStock: 35,
        image: "/vape_nation_tshirt.jpeg",
        numReviews: 0,
        rating: 0,
        isVerified: true
    },
    {
        name: "VapeMaster Snapback Hat",
        brand: "VapeMaster",
        description: "Complete your look with this high-quality VapeMaster embroidered snapback hat.",
        category: "Apparel and Merchandise",
        deviceType: "Hats",
        price: 19.99,
        countInStock: 25,
        image: "/vape_master_snapback_hat.jpeg",
        numReviews: 0,
        rating: 0,
        isVerified: true
    },

    // Starter Bundles
    {
        name: "Beginner Vape Starter Bundle",
        brand: "VapeStarter",
        description: "Get everything you need to start vaping with this comprehensive beginner bundle.",
        category: "Starter Bundles",
        deviceType: "Beginner Kits",
        price: 49.99,
        countInStock: 15,
        image: "/beginner_vape_starter_bundle.jpeg",
        numReviews: 0,
        rating: 0,
        isVerified: true
    },
    {
        name: "Advanced Vaper's Essentials Bundle",
        brand: "VapePro",
        description: "Upgrade your vaping experience with this essentials bundle for advanced users.",
        category: "Starter Bundles",
        deviceType: "Advanced Kits",
        price: 89.99,
        countInStock: 10,
        image: "/advanced_vapers_essentials_bundle.jpeg",
        numReviews: 0,
        rating: 0,
        isVerified: true
    }
];

async function seedProducts() {
    try {
        await Product.deleteMany({});
        const createdProducts = await Product.insertMany(productsData);
        console.log(`${createdProducts.length} products created successfully.`);
    } catch (error) {
        console.error("Error seeding products:", error);
    }
}

seedProducts();