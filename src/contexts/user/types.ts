export const possibleTopics = [
  'software-development',
  'user-experience',
  'graphic-design',
] as const

export interface Topics {
  id: (typeof possibleTopics)[number]
  label: string
}

export const topics: Topics[] = [
  {
    id: 'software-development',
    label: 'Software Development',
  },
  {
    id: 'user-experience',
    label: 'User Experience',
  },
  {
    id: 'graphic-design',
    label: 'Graphic Design',
  },
]

export interface User {
  id?: string
  name?: string
  email?: string
  selectedTopics?: Topics[]
}
