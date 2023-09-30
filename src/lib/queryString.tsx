const urlParams = new URLSearchParams(window.location.search)

export const queryString = (key: string) => {
  return String(urlParams.get(key))
}
