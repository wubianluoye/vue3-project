import http from "../../http/index";
export function getList(type: string) {
  const query = {
    params: {
      type,
    },
  };
  return http.get("/list", query).then((res) => res.data);
}
