export default {
  type: "object",
  properties: {
    front: { type: "string" },
    back: { type: "string" },
    folderId: { type: "number" },
  },
  required: ["front", "back", "folderId"],
} as const;
