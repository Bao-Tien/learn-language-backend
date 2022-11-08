export default {
  type: "object",
  properties: {
    videoId: { type: "string" },
  },
  required: ["videoId"],
} as const;
