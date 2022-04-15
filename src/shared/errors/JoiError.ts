export function joiError(err): string {
  const parsedError = err.details.map(detail => {
    let redo = detail.message.replace('"', ' ')
    redo = redo.replace('"', '')
    return redo
  })

  return `Invalid data:${parsedError}`
}
