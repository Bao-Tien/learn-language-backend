export default {
  type: "object",
  properties: {
    action: { type: "string" },
    username: { type: "string" },
    password: { type: "string" },
  },
  required: ["action", "username", "password"],
} as const;
