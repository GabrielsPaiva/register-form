import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { type Topics, type User, topics } from './types'

interface UserContextType {
  // states
  userData: User | undefined

  // functions
  onRegisterUser: (user: Omit<User, 'selectedTopics'>) => void
  onSaveUserTopics: (selectedTopics: Topics['id'][]) => void
  onResetUserData: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<User>({})

  const onRegisterUser = useCallback(
    ({ id, name, email }: Omit<User, 'selectedTopics'>) => {
      setUserData(prevData => {
        return {
          ...prevData,
          id,
          name,
          email,
        }
      })
    },
    [] // Added setUserData as a dependency
  )

  const onSaveUserTopics = useCallback((selectedTopicsIds: Topics['id'][]) => {
    const selectedTopics = selectedTopicsIds.map(topic => {
      const topicId = topic
      const topicLabel = topics.find(t => t.id === topic)?.label || ''

      return {
        id: topicId,
        label: topicLabel,
      }
    })

    setUserData(prevData => {
      return {
        ...prevData,
        selectedTopics,
      }
    })
  }, []) // Added setUserData as a dependency

  const onResetUserData = useCallback(() => {
    setUserData({})
  }, []) // Added setUserData as a dependency

  const providerValues: UserContextType = useMemo(() => {
    return {
      // states
      userData,

      // functions
      onRegisterUser,
      onSaveUserTopics,
      onResetUserData,
    }
  }, [
    // states
    userData,

    // functions
    onRegisterUser,
    onSaveUserTopics,
    onResetUserData,
  ])

  return (
    <UserContext.Provider value={providerValues}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserData = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserData must be used within a UserProvider')
  }
  return context
}
