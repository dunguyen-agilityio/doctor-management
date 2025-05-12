import { IFood } from '@/types';

export const MOCK_FOOD_LIST: IFood[] = [
  {
    id: '22',
    name: 'Pizza',
    weight: 200,
    ingredients: [
      {
        id: '1',
        name: 'Bread',
        value: 200,
      },
      {
        id: '2',
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: '3',
        name: 'Cucumber',
        value: 300,
      },
      {
        id: '4',
        name: 'Onion',
        value: 200,
      },
    ],
    nutritional: {
      calories: 100,
      carbs: 100,
      protein: 100,
      fat: 100,
    },
    category: '1',
    color: 'RED',
    imgUrl:
      'https://s3-alpha-sig.figma.com/img/0d17/c4d2/3b2ee1931e0c9de420fcbd861f82a29a?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Kk7cHm44D-dhlRtVx3PsLJimx9ElGp1B1ZVxjk~020IbqEEYgd83GQp-7--731jfo0qy4U42pvGksvbN5HjY6OQO8iei44zogdIMdsFzfmaXFwuhNsjH4dZvZ0u0UTPrxiNPVcy969pmpPKjehOI7wPI4iCIaFeZVgMFbLuH0h4b-P0RAdrpZVKE9--rAS540cWY71ix8OHIENnsj~91X8wuOfoZh1NNgs1rWRZew8PMO3y8vEsyyD62OX6oYAfDVEA83TkVKq7Xxti8mVQMx7-A-Cs6T4h1L1QLE0cPUXRGwV-C3DjCTXt5zI0vlGIzWh~hPbGzH57VtGhqWDrX0Q__',
    desc: "Note that in TypeScript, you can define the return type of the function using a colon (:) after the function parameter list. In this example, we don't explicitly define the return type, but TypeScript will infer that the return type is a Promise that resolves to a JSON object.",
    favorite: false,
  },
  {
    id: '1',
    name: 'Chicken 1',
    weight: 400,
    color: 'RED',
    desc: "Note that in TypeScript, you can define the return type of the function using a colon after the function parameter list. In this example, we don't explicitly define the return type, but TypeScript will infer that the return type is a Promise that resolves to a JSON object.",
    nutritional: {
      calories: 200,
      carbs: 100,
      fat: 100,
      protein: 100,
    },
    category: '7',
    ingredients: [
      {
        id: '1',
        name: 'Bread',
        value: 200,
      },
      {
        id: '2',
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: '3',
        name: 'Cucumber',
        value: 300,
      },
      {
        id: '4',
        name: 'Onion',
        value: 200,
      },
    ],
    imgUrl:
      'https://s3-alpha-sig.figma.com/img/0d17/c4d2/3b2ee1931e0c9de420fcbd861f82a29a?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Kk7cHm44D-dhlRtVx3PsLJimx9ElGp1B1ZVxjk~020IbqEEYgd83GQp-7--731jfo0qy4U42pvGksvbN5HjY6OQO8iei44zogdIMdsFzfmaXFwuhNsjH4dZvZ0u0UTPrxiNPVcy969pmpPKjehOI7wPI4iCIaFeZVgMFbLuH0h4b-P0RAdrpZVKE9--rAS540cWY71ix8OHIENnsj~91X8wuOfoZh1NNgs1rWRZew8PMO3y8vEsyyD62OX6oYAfDVEA83TkVKq7Xxti8mVQMx7-A-Cs6T4h1L1QLE0cPUXRGwV-C3DjCTXt5zI0vlGIzWh~hPbGzH57VtGhqWDrX0Q__',
    favorite: true,
  },
  {
    id: '4',
    desc: "Note that in TypeScript, you can define the return type of the function using a colon (:) after the function parameter list. In this example, we don't explicitly define the return type, but TypeScript will infer that the return type is a Promise that resolves to a JSON object.",
    name: 'Fish',
    weight: 400,
    color: 'YELLOW',
    nutritional: {
      calories: 200,
      carbs: 100,
      fat: 100,
      protein: 100,
    },
    category: '3',
    ingredients: [
      {
        id: '1',
        name: 'Bread',
        value: 200,
      },
      {
        id: '2',
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: '3',
        name: 'Cucumber',
        value: 300,
      },
      {
        id: '4',
        name: 'Onion',
        value: 200,
      },
    ],
    imgUrl:
      'https://s3-alpha-sig.figma.com/img/0d17/c4d2/3b2ee1931e0c9de420fcbd861f82a29a?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Kk7cHm44D-dhlRtVx3PsLJimx9ElGp1B1ZVxjk~020IbqEEYgd83GQp-7--731jfo0qy4U42pvGksvbN5HjY6OQO8iei44zogdIMdsFzfmaXFwuhNsjH4dZvZ0u0UTPrxiNPVcy969pmpPKjehOI7wPI4iCIaFeZVgMFbLuH0h4b-P0RAdrpZVKE9--rAS540cWY71ix8OHIENnsj~91X8wuOfoZh1NNgs1rWRZew8PMO3y8vEsyyD62OX6oYAfDVEA83TkVKq7Xxti8mVQMx7-A-Cs6T4h1L1QLE0cPUXRGwV-C3DjCTXt5zI0vlGIzWh~hPbGzH57VtGhqWDrX0Q__',
    favorite: false,
  },
  {
    id: '5',
    name: 'Bacon',
    weight: 400,
    color: 'PURPLE',
    desc: "Note that in TypeScript, you can define the return type of the function using a colon (:) after the function parameter list. In this example, we don't explicitly define the return type, but TypeScript will infer that the return type is a Promise that resolves to a JSON object.",
    nutritional: {
      calories: 200,
      carbs: 100,
      fat: 100,
      protein: 100,
    },
    category: '3',
    ingredients: [
      {
        id: '1',
        name: 'Bread',
        value: 200,
      },
      {
        id: '2',
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: '3',
        name: 'Cucumber',
        value: 300,
      },
      {
        id: '4',
        name: 'Onion',
        value: 200,
      },
    ],
    imgUrl:
      'https://s3-alpha-sig.figma.com/img/0d17/c4d2/3b2ee1931e0c9de420fcbd861f82a29a?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Kk7cHm44D-dhlRtVx3PsLJimx9ElGp1B1ZVxjk~020IbqEEYgd83GQp-7--731jfo0qy4U42pvGksvbN5HjY6OQO8iei44zogdIMdsFzfmaXFwuhNsjH4dZvZ0u0UTPrxiNPVcy969pmpPKjehOI7wPI4iCIaFeZVgMFbLuH0h4b-P0RAdrpZVKE9--rAS540cWY71ix8OHIENnsj~91X8wuOfoZh1NNgs1rWRZew8PMO3y8vEsyyD62OX6oYAfDVEA83TkVKq7Xxti8mVQMx7-A-Cs6T4h1L1QLE0cPUXRGwV-C3DjCTXt5zI0vlGIzWh~hPbGzH57VtGhqWDrX0Q__',
    favorite: true,
  },
  {
    id: '6',
    name: 'Chicken 2',
    weight: 400,
    color: 'RED',
    desc: "Note that in TypeScript, you can define the return type of the function using a colon (:) after the function parameter list. In this example, we don't explicitly define the return type, but TypeScript will infer that the return type is a Promise that resolves to a JSON object.",
    nutritional: {
      calories: 200,
      carbs: 100,
      fat: 100,
      protein: 100,
    },
    favorite: false,
    category: '2',
    ingredients: [
      {
        id: '1',
        name: 'Bread',
        value: 200,
      },
      {
        id: '2',
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: '3',
        name: 'Cucumber',
        value: 300,
      },
      {
        id: '4',
        name: 'Onion',
        value: 200,
      },
    ],
    imgUrl:
      'https://s3-alpha-sig.figma.com/img/0d17/c4d2/3b2ee1931e0c9de420fcbd861f82a29a?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Kk7cHm44D-dhlRtVx3PsLJimx9ElGp1B1ZVxjk~020IbqEEYgd83GQp-7--731jfo0qy4U42pvGksvbN5HjY6OQO8iei44zogdIMdsFzfmaXFwuhNsjH4dZvZ0u0UTPrxiNPVcy969pmpPKjehOI7wPI4iCIaFeZVgMFbLuH0h4b-P0RAdrpZVKE9--rAS540cWY71ix8OHIENnsj~91X8wuOfoZh1NNgs1rWRZew8PMO3y8vEsyyD62OX6oYAfDVEA83TkVKq7Xxti8mVQMx7-A-Cs6T4h1L1QLE0cPUXRGwV-C3DjCTXt5zI0vlGIzWh~hPbGzH57VtGhqWDrX0Q__',
  },
  {
    id: '7',
    desc: "Note that in TypeScript, you can define the return type of the function using a colon (:) after the function parameter list. In this example, we don't explicitly define the return type, but TypeScript will infer that the return type is a Promise that resolves to a JSON object.",
    name: 'Beef',
    weight: 400,
    color: 'GREEN',
    nutritional: {
      calories: 200,
      carbs: 100,
      fat: 100,
      protein: 100,
    },
    category: '2',
    ingredients: [
      {
        id: '1',
        name: 'Bread',
        value: 200,
      },
      {
        id: '2',
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: '3',
        name: 'Cucumber',
        value: 300,
      },
      {
        id: '4',
        name: 'Onion',
        value: 200,
      },
    ],
    imgUrl:
      'https://s3-alpha-sig.figma.com/img/0d17/c4d2/3b2ee1931e0c9de420fcbd861f82a29a?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Kk7cHm44D-dhlRtVx3PsLJimx9ElGp1B1ZVxjk~020IbqEEYgd83GQp-7--731jfo0qy4U42pvGksvbN5HjY6OQO8iei44zogdIMdsFzfmaXFwuhNsjH4dZvZ0u0UTPrxiNPVcy969pmpPKjehOI7wPI4iCIaFeZVgMFbLuH0h4b-P0RAdrpZVKE9--rAS540cWY71ix8OHIENnsj~91X8wuOfoZh1NNgs1rWRZew8PMO3y8vEsyyD62OX6oYAfDVEA83TkVKq7Xxti8mVQMx7-A-Cs6T4h1L1QLE0cPUXRGwV-C3DjCTXt5zI0vlGIzWh~hPbGzH57VtGhqWDrX0Q__',
    favorite: false,
  },
  {
    id: '8',
    desc: "Note that in TypeScript, you can define the return type of the function using a colon (:) after the function parameter list. In this example, we don't explicitly define the return type, but TypeScript will infer that the return type is a Promise that resolves to a JSON object.",
    name: 'Pork',
    weight: 400,
    color: 'GREEN',
    nutritional: {
      calories: 200,
      carbs: 100,
      fat: 100,
      protein: 100,
    },
    category: '3',
    ingredients: [
      {
        id: '1',
        name: 'Bread',
        value: 200,
      },
      {
        id: '2',
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: '3',
        name: 'Cucumber',
        value: 300,
      },
      {
        id: '4',
        name: 'Onion',
        value: 200,
      },
    ],
    imgUrl:
      'https://s3-alpha-sig.figma.com/img/0d17/c4d2/3b2ee1931e0c9de420fcbd861f82a29a?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Kk7cHm44D-dhlRtVx3PsLJimx9ElGp1B1ZVxjk~020IbqEEYgd83GQp-7--731jfo0qy4U42pvGksvbN5HjY6OQO8iei44zogdIMdsFzfmaXFwuhNsjH4dZvZ0u0UTPrxiNPVcy969pmpPKjehOI7wPI4iCIaFeZVgMFbLuH0h4b-P0RAdrpZVKE9--rAS540cWY71ix8OHIENnsj~91X8wuOfoZh1NNgs1rWRZew8PMO3y8vEsyyD62OX6oYAfDVEA83TkVKq7Xxti8mVQMx7-A-Cs6T4h1L1QLE0cPUXRGwV-C3DjCTXt5zI0vlGIzWh~hPbGzH57VtGhqWDrX0Q__',
    favorite: false,
  },
  {
    id: '9',
    desc: "Note that in TypeScript, you can define the return type of the function using a colon (:) after the function parameter list. In this example, we don't explicitly define the return type, but TypeScript will infer that the return type is a Promise that resolves to a JSON object.",
    name: 'Fish 2',
    weight: 400,
    color: 'ORANGE',
    nutritional: {
      calories: 200,
      carbs: 100,
      fat: 100,
      protein: 100,
    },
    category: '3',
    ingredients: [
      {
        id: '1',
        name: 'Bread',
        value: 200,
      },
      {
        id: '2',
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: '3',
        name: 'Cucumber',
        value: 300,
      },
      {
        id: '4',
        name: 'Onion',
        value: 200,
      },
    ],
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/a2.png?alt=media&token=abe65f60-e23e-48d9-a2c8-13c9e3ccb921',
    favorite: false,
  },
];
