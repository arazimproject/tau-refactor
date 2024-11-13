import "@fortawesome/fontawesome-free/css/all.css"
import "@mantine/core/styles.css"
import "@mantine/charts/styles.css"

import {
  Alert,
  Autocomplete,
  DirectionProvider,
  Loader,
  MantineProvider,
} from "@mantine/core"
import Footer from "./Footer"
import Header from "./Header"
import { useColorScheme, useLocalStorage } from "@mantine/hooks"
import { useState } from "react"
import { useQueryParam, useURLValue } from "./hooks"
import ColorHash from "color-hash"
import GradeChart from "./GradeChart"
import { AllTimeCourses, AllTimeGrades } from "./types"

const hash = new ColorHash()

const App = () => {
  const colorScheme = useColorScheme()
  const [search, setSearch] = useState("")
  const [course, setCourse] = useQueryParam("course", "")

  const [courseInfo, loadingCourseInfo] = useURLValue<AllTimeCourses>(
    "https://arazim-project.com/data/courses.json"
  )
  const [gradeInfo, loadingGradeInfo] = useURLValue<AllTimeGrades>(
    "https://arazim-project.com/data/grades.json"
  )
  const [alertOpen, setAlertOpen] = useLocalStorage({
    key: "Is Alert Open",
    defaultValue: true,
  })

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
            {alertOpen && (
              <Alert
                color="blue"
                variant="light"
                w="100%"
                maw={400}
                mt="xs"
                flex="none"
                title="עזרו להוסיף מידע ל-TAU Factor!"
                icon={<i className="fa-solid fa-cloud" />}
                withCloseButton
                onClose={() => setAlertOpen(false)}
              >
                <p>
                  מאגר הציונים של TAU Factor התקבל מהאתר המקורי
                  www.tau-factor.com. בכדי להוסיף היסטוגרמות ציונים (אנונימיות)
                  ולעזור לכלל הסטודנטים, אנא התקינו את התוסף{" "}
                  <a
                    className="link handle text-accent"
                    href="https://chromewebstore.google.com/detail/tau-factor/ocnjdmhgcphlaeaoneikpobbjlkdpiib"
                    target="_blank"
                  >
                    מכאן!
                  </a>
                </p>

                <p>
                  התוסף לא מבצע שום פעולה בלי אישורכם והקוד שלו{" "}
                  <a
                    className="link handle text-accent"
                    href="https://github.com/arazimproject/tau-factor-extension"
                    target="_blank"
                  >
                    פתוח
                  </a>
                  . אנא{" "}
                  <a className="link handle text-accent" href="/contact-us">
                    פנו אלינו
                  </a>{" "}
                  במידה שאתם נתקלים בבעייה.
                </p>
              </Alert>
            )}
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
                <GradeChart courseId={course} grades={gradeInfo[course]} />
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
