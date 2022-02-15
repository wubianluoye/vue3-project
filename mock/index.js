import Mock from "mockjs";
// Mock.setup({
//   timeout: "10-600",
// });

const Random = Mock.Random;

function createList(min = 0, max = 10) {
  const len = Random.integer(min, max);
  const arr = [];
  for (let i = 0; i < len; i++) {
    const obj = {
      id: Random.id(),
      title: Random.cparagraph(20),
      username: Random.name(),
      password: Random.id(),
    };
    arr.push(obj);
  }
  return arr;
}

function createOrder(min = 0, max = 10) {
  const types = ["imp", "game", "gen"];
  const len = Random.integer(min, max);
  const arr = [];
  for (let i = 0; i < len; i++) {
    const obj = {
      id: Random.increment(),
      title: Random.cparagraph(1, 2),
      name: Random.name(),
      password: Random.id(),
      type: Random.pick(types),
      avat: Random.image("20x20", "#000000", "#fffff", "jpg"),
    };
    arr.push(obj);
  }
  return arr;
}

export default [
  {
    url: "/login",
    method: "post",
    response: (res) => {
      const user = {
        username: "admin",
        password: "123456",
      };
      const flag = Mock.valid(user, res.body);

      const ft = res.body.username.trim()[0].toUpperCase();

      if (!flag.length) {
        return {
          code: 200,
          message: "ok",
          data: {
            avat: Random.image("100x100", "#000000", "#FFFFFF", ft),
            username: "admin",
            token: Random.guid(),
          },
        };
      } else {
        return {
          code: 204,
          message: "用户名或密码错误",
          data: null,
        };
      }
    },
  },
  {
    url: "/home",
    method: "get",
    response: (res) => {
      const arr = createList();
      return {
        code: 200,
        message: "ok",
        data: [
          {
            title: Random.name(),
            desc: Random.email(),
            create_at: Random.datetime("yyyy-MM-dd HH:mm:ss"),
            total: arr.length,
            list: arr,
          },
          {
            title: Random.name(),
            desc: Random.email(),
            create_at: Random.datetime("yyyy-MM-dd HH:mm:ss"),
            total: arr.length,
            list: arr,
          },
          {
            title: Random.name(),
            desc: Random.email(),
            create_at: Random.datetime("yyyy-MM-dd HH:mm:ss"),
            total: arr.length,
            list: arr,
          },
        ],
      };
    },
  },
  {
    url: "/list",
    method: "get",
    response: (res) => {
      const type = res.url.split("?")[1].split("=")[1];
      const list =
        type === "all"
          ? createOrder(20)
          : createOrder(20).filter((item) => item.type === type);
      const total = list.length;
      const genTotal = list.filter((item) => item.type === "gen").length;

      return {
        code: 200,
        message: "ok",
        data: {
          total,
          gen_total: genTotal,
          list,
        },
      };
    },
  },
];
