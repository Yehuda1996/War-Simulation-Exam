import mongoose from "mongoose";
import Organization from "../models/organizationModel"

// Define the data
const organizationData = [
    {
      name: "IDF - North",
      resources: [
        { name: "Iron Dome", amount: 25 },
        { name: "David's Sling", amount: 15 }
      ],
      budget: 8000000
    },
    {
      name: "IDF - South",
      resources: [
        { name: "Iron Dome", amount: 30 },
        { name: "Patriot", amount: 20 }
      ],
      budget: 9000000
    },
    {
      name: "IDF - Center",
      resources: [
        { name: "Iron Dome", amount: 40 },
        { name: "Arrow", amount: 10 }
      ],
      budget: 10000000
    },
    {
      name: "IDF - West Bank",
      resources: [
        { name: "Iron Dome", amount: 10 }
      ],
      budget: 7000000
    },
    {
      name: "Hezbollah",
      resources: [
        { name: "Fajr-5", amount: 20 },
        { name: "Zelzal-2", amount: 10 }
      ],
      budget: 3000000
    },
    {
      name: "Hamas",
      resources: [
        { name: "Qassam", amount: 50 },
        { name: "M-75", amount: 30 }
      ],
      budget: 2500000
    },
    {
      name: "IRGC",
      resources: [
        { name: "Shahab-3", amount: 15 },
        { name: "Fateh-110", amount: 25 }
      ],
      budget: 4000000
    },
    {
      name: "Houthis",
      resources: [
        { name: "Badr-1", amount: 20 },
        { name: "Quds-1", amount: 15 }
      ],
      budget: 2000000
    }
];

// Connect to MongoDB and insert the data
const seedDatabase = async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/War-Simulator");
      console.log("Connected to MongoDB");
  
      // Clear the collection before seeding
      await Organization.deleteMany({});
      console.log("Cleared the Organization collection");
  
      // Insert the organization data
      await Organization.insertMany(organizationData);
      console.log("Organization data seeded successfully");
    } catch (error) {
      console.error("Error seeding the database:", error);
    } finally {
      mongoose.connection.close();
    }
  };
  

seedDatabase();
