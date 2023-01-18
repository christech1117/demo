import { extend } from "vee-validate";
import {
  required,
  confirmed,
  length,
  email,
  integer,
  min_value,
  max_value
} from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});

extend("integer", {
  ...integer,
  message: "This field must be a valid integer"
});

extend("confirmed", {
  ...confirmed,
  message: "This field confirmation does not match"
});

extend("length", {
  ...length,
  message: "This field must have 2 options"
});

extend("min_value", {
  ...min_value,
  message: "This field must be at least {min}"
});

extend("max_value", {
  ...max_value,
  message: "This field may not be greater than {max}"
});

extend("min", {
  validate(value, args) {
    return value.length >= args.length;
  },
  params: ["length"],
  message: "This field must be at least {length} characters"
});

extend("max", {
  validate(value, args) {
    return value.length <= args.length;
  },
  params: ["length"],
  message: "This field may not be greater than {length} characters"
});

extend("minmax", {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  params: ["min", "max"],
  message:
    "This field must have at least {min} characters and {max} characters at most"
});

extend("full_width", value => {
  if (String(value).search(/[\uFF00-\uFFEF]/g) === -1) {
    return true;
  }
  return "This field must be a half width word(s)";
});
