const requestCache: Record<string, any> = {}
const requestPromises: Record<string, Promise<any>> = {}

export const SEMESTER_ENGLISH_TO_HEBREW: Record<string, string> = {
  a: "א'",
  b: "ב'",
  s: " קיץ",
}

export const cachedFetchJson = async (url: string) => {
  if (requestCache[url] !== undefined) {
    return requestCache[url]
  }
  if (requestPromises[url] === undefined) {
    requestPromises[url] = fetch(url).then((r) => r.json())
  }
  const json = await requestPromises[url]
  requestCache[url] = json
  return json
}

export const formatSemester = (semester: string) => {
  return semester.slice(0, 4) + SEMESTER_ENGLISH_TO_HEBREW[semester[4]]
}
