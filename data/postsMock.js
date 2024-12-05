export const posts = [
  {
    id: 1,
    imgUrl: require("../assets/img/china-6796350_1280.jpg"),
    title: "Ліс",
    locationTitle: "Ivano-Frankivs'k Regiom, Ukraine",
    geoLocationCoords: {},
    comments: [
      {
        id: 1,
        text: "Класна фотка!",
        user: {
          id: 1,
          name: "Oleg",
          avatar: require("../assets/img/avatar-3.jpeg"),
        },
      },
      {
        id: 2,
        text: "Дуже красиво!",
        user: {
          id: 2,
          name: "Elise",
          avatar: require("../assets/img/avatar-2.jpeg"),
        },
      },
    ],
    likes: 2,
  },
  {
    id: 2,
    imgUrl: require("../assets/img/landscape-1192669_1280.jpg"),
    title: "Красоти",
    locationTitle: "Lviv Regiom, Ukraine",
    geoLocationCoords: {},
    comments: [
      {
        id: 1,
        text: "Класна фотка!",
        user: {
          id: 1,
          name: "Meghan",
          avatar: require("../assets/img/avatar-2.jpeg"),
        },
      },
    ],
    likes: 3,
  },
  {
    id: 3,
    imgUrl: require("../assets/img/landscape-7115513_1280.jpg"),
    title: "Річка",
    locationTitle: "Ezgorod Regiom, Ukraine",
    geoLocationCoords: {},
    comments: [
      {
        id: 1,
        text: "Класна фотка!",
        user: {
          id: 1,
          name: "Oleg",
          avatar: require("../assets/img/avatar-3.jpeg"),
        },
      },
      {
        id: 2,
        text: "Дуже красиво!",
        user: {
          id: 2,
          name: "Vanessa",
          avatar: require("../assets/img/avatar-2.jpeg"),
        },
      },
    ],
    likes: 5,
  },
  {
    id: 4,
    imgUrl: require("../assets/img/meadow-7432891_1280.jpg"),
    title: "Луга",
    locationTitle: "Kiyv, Ukraine",
    geoLocationCoords: {},
    comments: [
      {
        id: 1,
        text: "Класна фотка!",
        user: {
          id: 1,
          name: "Kate",
          avatar: require("../assets/img/avatar-2.jpeg"),
        },
      },
    ],
    likes: 10,
  },
  {
    id: 5,
    imgUrl: require("../assets/img/nature-7897683_1280.jpg"),
    title: "Дорога",
    locationTitle: "Kiyv, Ukraine",
    geoLocationCoords: {},
    comments: [],
    likes: 0,
  },
];
