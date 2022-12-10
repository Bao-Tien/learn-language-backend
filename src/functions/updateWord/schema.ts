export default {
  type: "object",
  properties: {
    id: { type: "number" },
    front: { type: "string" },
    back: { type: "string" },
    frontImageUrl: { type: "string" },
    backImageUrl: { type: "string" },
  },
  required: ["id", "front", "back"],
} as const;
