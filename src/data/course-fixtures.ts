export type Citation = { section: string; title: string; detail: string }

export const course = {
  name: 'Introduction to Data Analysis',
  shortName: 'Data Analysis',
  lesson: 'Lesson 3',
  lessonTitle: 'Descriptive Statistics',
}

export const sections: Citation[] = [
  { section: '§3.1', title: 'Mean', detail: 'The sum of all values divided by the number of values.' },
  { section: '§3.2', title: 'Median', detail: 'The middle value after ordering the observations.' },
  { section: '§3.3', title: 'Variance and Standard Deviation', detail: 'Measures that describe how spread out observations are.' },
  { section: '§3.4', title: 'Outliers', detail: 'Observations that sit unusually far from the rest of the data.' },
  { section: '§3.5', title: 'Exercise 3', detail: 'Practice identifying appropriate descriptive statistics.' },
]
