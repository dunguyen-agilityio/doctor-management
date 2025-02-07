import { IArtcile, IFood, TIngredient, TNutritional } from '@types';

export const MOCK_FOODS: IFood[] = [
  {
    id: 22,
    name: 'Pizza',
    weight: 200,
    ingredients: [
      {
        id: 1,
        name: 'Bread',
        value: 200,
      },
      {
        id: 2,
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: 3,
        name: 'Cacumber',
        value: 300,
      },
      {
        id: 4,
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
    category: 1,
    color: 'RED',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/a2.png?alt=media&token=abe65f60-e23e-48d9-a2c8-13c9e3ccb921',
    desc: "Note that in TypeScript, you can define the return type of the function using a colon (:) after the function parameter list. In this example, we don't explicitly define the return type, but TypeScript will infer that the return type is a Promise that resolves to a JSON object.",
    favorite: 0,
  },
  {
    id: 1,
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
    category: 7,
    ingredients: [
      {
        id: 1,
        name: 'Bread',
        value: 200,
      },
      {
        id: 2,
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: 3,
        name: 'Cacumber',
        value: 300,
      },
      {
        id: 4,
        name: 'Onion',
        value: 200,
      },
    ],
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/a2.png?alt=media&token=abe65f60-e23e-48d9-a2c8-13c9e3ccb921',
    favorite: 1,
  },
  {
    id: 4,
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
    category: 3,
    ingredients: [
      {
        id: 1,
        name: 'Bread',
        value: 200,
      },
      {
        id: 2,
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: 3,
        name: 'Cacumber',
        value: 300,
      },
      {
        id: 4,
        name: 'Onion',
        value: 200,
      },
    ],
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/a5.png?alt=media&token=af718429-aabf-4329-91e5-439cff65e187',
    favorite: 0,
  },
  {
    id: 5,
    name: 'Bacon',
    weight: 400,
    color: 'GREEN',
    desc: "Note that in TypeScript, you can define the return type of the function using a colon (:) after the function parameter list. In this example, we don't explicitly define the return type, but TypeScript will infer that the return type is a Promise that resolves to a JSON object.",
    nutritional: {
      calories: 200,
      carbs: 100,
      fat: 100,
      protein: 100,
    },
    category: 3,
    ingredients: [
      {
        id: 1,
        name: 'Bread',
        value: 200,
      },
      {
        id: 2,
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: 3,
        name: 'Cacumber',
        value: 300,
      },
      {
        id: 4,
        name: 'Onion',
        value: 200,
      },
    ],
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/a6.png?alt=media&token=e16ecdc8-e597-464d-90ce-0c6b64e0c5a8',
    favorite: 1,
  },
  {
    id: 6,
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
    favorite: 0,
    category: 2,
    ingredients: [
      {
        id: 1,
        name: 'Bread',
        value: 200,
      },
      {
        id: 2,
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: 3,
        name: 'Cacumber',
        value: 300,
      },
      {
        id: 4,
        name: 'Onion',
        value: 200,
      },
    ],
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/a2.png?alt=media&token=abe65f60-e23e-48d9-a2c8-13c9e3ccb921',
  },
  {
    id: 7,
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
    category: 2,
    ingredients: [
      {
        id: 1,
        name: 'Bread',
        value: 200,
      },
      {
        id: 2,
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: 3,
        name: 'Cacumber',
        value: 300,
      },
      {
        id: 4,
        name: 'Onion',
        value: 200,
      },
    ],
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/a6.png?alt=media&token=e16ecdc8-e597-464d-90ce-0c6b64e0c5a8',
    favorite: 0,
  },
  {
    id: 8,
    desc: "Note that in TypeScript, you can define the return type of the function using a colon (:) after the function parameter list. In this example, we don't explicitly define the return type, but TypeScript will infer that the return type is a Promise that resolves to a JSON object.",
    name: 'Pork',
    weight: 400,
    color: 'RED',
    nutritional: {
      calories: 200,
      carbs: 100,
      fat: 100,
      protein: 100,
    },
    category: 3,
    ingredients: [
      {
        id: 1,
        name: 'Bread',
        value: 200,
      },
      {
        id: 2,
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: 3,
        name: 'Cacumber',
        value: 300,
      },
      {
        id: 4,
        name: 'Onion',
        value: 200,
      },
    ],
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/a2.png?alt=media&token=abe65f60-e23e-48d9-a2c8-13c9e3ccb921',
    favorite: 0,
  },
  {
    id: 9,
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
    category: 3,
    ingredients: [
      {
        id: 1,
        name: 'Bread',
        value: 200,
      },
      {
        id: 2,
        name: 'Meat (Chicken)',
        value: 500,
      },
      {
        id: 3,
        name: 'Cacumber',
        value: 300,
      },
      {
        id: 4,
        name: 'Onion',
        value: 200,
      },
    ],
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/a2.png?alt=media&token=abe65f60-e23e-48d9-a2c8-13c9e3ccb921',
    favorite: 0,
  },
];

export const MOCK_ACTICLES: IArtcile[] = [
  {
    id: 1,
    title: 'The pros and cons of fast food.',
    name: 'Article',
    color: 'green',
    backgroundColor: ['#b3f6a8', '#ebfff3'],
    image:
      'https://s3-alpha-sig.figma.com/img/8b33/a5b6/24d2e37a7dcbf108d35e8be410c96a58?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=avSEEtN22vSh8aq5Gzzi~bofxqRUv6YwaUlTa0ZvmTH6S-UnlgE4S3sKXqlu~YtbnlHLtmBqMsfniDWOWRRccMEfs2zvaqOmrx6bTqBQuqMauI8qc93mWyLi0PlDjWuA2OukEGCFPxfF~3cSSgMkCnxXpkiSUh6UvXQCHUGrb3smseU6TKWtbBp3MHkG5pCP8NKockzv0FBZQvuLgITaGQ9mFpD3Th5xHP0qpGfG6HUrDD6bSnKTLopvWrJ~8XyYweSy7yi6yiwEsT-KeC2zdXQGy5mMAGc0VuVPQeUcbmesl9SE4qGiNx7kTe59Qg41NHJ-mFj1aVEhu50Amx6m8g__',
  },
  {
    id: 2,
    title: 'The pros and cons of vegetable',
    color: 'secondary',
    name: 'Article',
    backgroundColor: ['#fff2f0', '#fff8eb'],
    image:
      'https://res.cloudinary.com/dn5vw6fjp/image/upload/v1738897004/Group_1_q9kcho.png',
  },
];

export const MOCK_INGREDIENTS: TIngredient[] = [
  {
    id: 1,
    value: 200,
    name: 'Bread',
  },
  {
    id: 2,
    name: 'Meat (Chicken)',
    value: 200,
  },
  {
    id: 3,
    name: 'Cacumber',
    value: 200,
  },
  {
    id: 4,
    name: 'Onion',
    value: 200,
  },
];

export const MOCK_NUTRITIONAL: TNutritional[] = [
  {
    calories: 12,
    carbs: 105,
    protein: 10,
    fat: 18,
  },
];
