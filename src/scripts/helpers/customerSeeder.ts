import { CustomerDB } from "../../models/Customer";

export const customerSeeder = async () => {
  await CustomerDB.deleteMany({});
  await CustomerDB.insertMany([
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      address: "456 Elm St",
    },
  ]);
  console.log("Customers seeded");
};
