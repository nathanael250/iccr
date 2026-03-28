function normalizeDocument(document) {
  if (!document) return null

  const value =
    typeof document.toObject === 'function'
      ? document.toObject({ virtuals: false })
      : { ...document }

  return {
    ...value,
    id: String(value._id),
    _id: undefined,
    __v: undefined,
  }
}

module.exports = {
  normalizeDocument,
}
