import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

const steps = ['form', 'topics', 'summary'] as const

export type PossibleSteps = (typeof steps)[number]

// Definição do tipo para o contexto
interface StepsContextType {
  // states
  currentStep: {
    id: string
    name: PossibleSteps
  }
  stepsCount: {
    total: number
    current: number
  }

  // functions
  onNextStep: () => void
}

// Criando o contexto com um valor padrão
const StepsContext = createContext<StepsContextType | undefined>(undefined)

// Criando o provider
interface StepsProviderProps {
  children: ReactNode
}

export const StepsProvider = ({ children }: StepsProviderProps) => {
  const [activeStep, setActiveStep] = useState<PossibleSteps>('form')

  const onNextStep = useCallback(() => {
    const activeStepIndex = steps.findIndex(step => step === activeStep)
    const nextStep = steps[activeStepIndex + 1] || steps[0]

    setActiveStep(nextStep)
  }, [activeStep])

  const totalSteps = steps.length
  const currentIndex = steps.findIndex(step => step === activeStep) + 1

  const providerValues: StepsContextType = useMemo(() => {
    return {
      // states
      currentStep: {
        id: `${activeStep}_${new Date()}`,
        name: activeStep,
      },
      stepsCount: {
        total: totalSteps,
        current: currentIndex,
      },

      // functions
      onNextStep,
    }
  }, [activeStep, onNextStep, totalSteps, currentIndex])
  return (
    <StepsContext.Provider value={providerValues}>
      {children}
    </StepsContext.Provider>
  )
}

// Hook personalizado para acessar o contexto de forma segura
export const useSteps = (): StepsContextType => {
  const context = useContext(StepsContext)
  if (!context) {
    throw new Error('useExample must be used within an ExampleProvider')
  }
  return context
}
