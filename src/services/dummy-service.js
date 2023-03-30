import { helper } from "./helper-service";

export const execute = () => {
  const result = helper();
  if (result) {
    return "Learning JS";
  } else {
    return "Learning ReactJS";
  }
};
