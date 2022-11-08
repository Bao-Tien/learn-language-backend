export default {
  type: "object",
  properties: {
    videoUrl: { type: "string" },
  },
  required: ["videoUrl"],
} as const;
