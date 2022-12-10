export default {
  type: "object",
  properties: {
    front: { type: "string" },
    back: { type: "string" },
    folderId: { type: "number" },
    frontImageUrl: { type: "string" },
    backImageUrl: { type: "string" },
  },
  required: ["front", "back", "folderId"],
} as const;
