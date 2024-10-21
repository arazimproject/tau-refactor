import "@fortawesome/fontawesome-free/css/all.css"
import "@mantine/core/styles.css"
import "@mantine/charts/styles.css"

import {
  Autocomplete,
  DirectionProvider,
  Loader,
  MantineProvider,
} from "@mantine/core"
import Footer from "./Footer"
import Header from "./Header"
import { useColorScheme } from "@mantine/hooks"
import { useState } from "react"
import { useQueryParam, useURLValue } from "./hooks"
import ColorHash from "color-hash"
import GradeChart from "./GradeChart"

const hash = new ColorHash()

const App = () => {
  const colorScheme = useColorScheme()
  const [search, setSearch] = useState("")
  const [course, setCourse] = useQueryParam("course", "")

  const [courseInfo, loadingCourseInfo] = useURLValue<any>(
    "https://arazim-project.com/courses/courses.json"
  )
  const [gradeInfo, loadingGradeInfo] = useURLValue<any>(
    "https://arazim-project.com/courses/grades.json"
  )

  return (
    <DirectionProvider>
      <MantineProvider forceColorScheme={colorScheme}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Header />
          <div
            style={{
              flexGrow: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "auto",
            }}
          >
            <Autocomplete
              size="md"
              w="100%"
              maw={400}
              my="md"
              value={search}
              onChange={(courseName) => {
                const split = courseName.split("(")
                if (split.length < 2) {
                  setSearch(courseName)
                  return
                }
                const courseId = split[split.length - 1].split(")")[0]
                if (courseInfo[courseId] !== undefined) {
                  setCourse(courseId)
                  setSearch("")
                } else {
                  setSearch(courseName)
                }
              }}
              data={Object.keys(courseInfo)
                .filter((courseId) => gradeInfo[courseId] !== undefined)
                .map(
                  (courseId) => `${courseInfo[courseId]?.name} (${courseId})`
                )
                .sort()}
              leftSection={
                loadingCourseInfo || loadingGradeInfo ? (
                  <Loader size="xs" />
                ) : (
                  <i className="fa-solid fa-search" />
                )
              }
              placeholder="חיפוש קורס..."
              limit={20}
              maxDropdownHeight={300}
            />
            {course !== "" && !loadingCourseInfo && !loadingGradeInfo && (
              <div
                style={{
                  width: "calc(100% - 20px)",
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: hash.hex(course),
                  color: hash.hsl(course)[2] > 0.5 ? "black" : "white",
                  marginBottom: 20,
                }}
              >
                <p style={{ textAlign: "center", marginBottom: 10 }}>
                  <b style={{ marginInlineEnd: 5 }}>
                    {courseInfo[course]?.name}
                  </b>
                  ({course})
                </p>
                <GradeChart grades={gradeInfo[course]} />
              </div>
            )}
          </div>
          <Footer />
        </div>
      </MantineProvider>
    </DirectionProvider>
  )
}

export default App
