export default {
  type: "object",
  properties: {
    folderId: { type: "number" },
  },
  required: ["folderId"],
} as const;
