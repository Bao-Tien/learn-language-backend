export default {
  type: "object",
  properties: {
    contentType: { type: "string" },
  },
  required: ["contentType"],
} as const;
