export default function handler(req, res) {
  res.status(200).json([
    {
        id: 20,
        name: "Canned fruit",
        photo: "items/fruit_can.jpg",
        from: "Jack",
        time: "Expired in 3 days", 
        sponsored: "Coles"
      },
      {
        id: 21,
        name: "Breakfast cereal",
        photo: "items/breakfast_cereal.jpg",
        from: "John",
        time: "Expired in 5 days", 
        sponsored: "Woolsworths"
      },
      {
        id: 22,
        name: "Long life milk",
        photo: "items/Longlife_milk.png",
        from: "Mike",
        time: "Expired in 10 days", 
        sponsored: "Aldi"
      },
      {
        id: 45,
        name: "Soap and deodorant",
        photo: "items/soap.png",
        from: "Smith",
        time: "Expired in 5 days", 
        sponsored: "Coles"
      },
        {
        id: 45,
        name: "Dried Fruit and Nuts",
        photo: "items/FruitsandNuts.jpeg",
        from: "Dave",
        time: "Expired in 5 days", 
        sponsored: "Woolworths"
      }
    ])
}
