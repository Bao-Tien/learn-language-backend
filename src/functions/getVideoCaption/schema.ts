export default {
  type: "object",
  properties: {
    videoUrl: { type: "string" },
  },
  required: ["videoId"],
} as const;
