export type Restaurant = {
  id: string;
  name: string;
  city: string;
  cuisine: string;
  imageUrl: string;
  michelinStars?: number;
  greenStar?: boolean;
};

function getRandomImageFromDataset() {
  const randomNum = Math.floor(Math.random() * 1000) + 1;
  return `/images/kaggle-dataset/food${randomNum}.jpg`;
}

const restaurants: Restaurant[] = [
  {
    id: "nobu",
    name: "Nobu",
    city: "New York",
    cuisine: "Japanese",
    imageUrl: getRandomImageFromDataset(),
    michelinStars: 3,
    greenStar: false,
  },
  {
    id: "alinea",
    name: "Alinea",
    city: "Chicago",
    cuisine: "Contemporary",
    imageUrl: getRandomImageFromDataset(),
    michelinStars: 3,
    greenStar: false,
  },
  {
    id: "atelier-crenn",
    name: "Atelier Crenn",
    city: "San Francisco",
    cuisine: "Contemporary French",
    imageUrl: getRandomImageFromDataset(),
    michelinStars: 3,
    greenStar: true,
  },
  {
    id: "quince",
    name: "Quince",
    city: "San Francisco",
    cuisine: "Contemporary American",
    imageUrl: getRandomImageFromDataset(),
    michelinStars: 3,
    greenStar: false,
  },
  {
    id: "the-inn-at-little-washington",
    name: "The Inn at Little Washington",
    city: "Washington, VA",
    cuisine: "American",
    imageUrl: getRandomImageFromDataset(),
    michelinStars: 3,
    greenStar: true,
  },
  {
    id: "single-thread",
    name: "SingleThread",
    city: "Healdsburg, CA",
    cuisine: "Contemporary Californian",
    imageUrl: getRandomImageFromDataset(),
    michelinStars: 3,
    greenStar: true,
  },
  {
    id: "le-bernardin",
    name: "Le Bernardin",
    city: "New York",
    cuisine: "Seafood",
    imageUrl: getRandomImageFromDataset(),
    michelinStars: 3,
    greenStar: false,
  },
  {
    id: "per-se",
    name: "Per Se",
    city: "New York",
    cuisine: "Contemporary French",
    imageUrl: getRandomImageFromDataset(),
    michelinStars: 3,
    greenStar: false,
  },
  {
    id: "blue-hill-stone-barns",
    name: "Blue Hill at Stone Barns",
    city: "Pocantico Hills, NY",
    cuisine: "American",
    imageUrl: getRandomImageFromDataset(),
    michelinStars: 2,
    greenStar: true,
  },
  {
    id: "benu",
    name: "Benu",
    city: "San Francisco",
    cuisine: "Contemporary Asian",
    imageUrl: getRandomImageFromDataset(),
    michelinStars: 3,
    greenStar: false,
  },
];

export default restaurants;