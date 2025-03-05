import bgRadial from './assets/blur-radial.png'

import { RegisterForm } from './components/pages/register-form'
import { Summary } from './components/pages/summary'
import { TopicsForm } from './components/pages/topics'
import { StepsDisplay } from './components/steps-display'

import { AnimatePresence, motion } from 'framer-motion'
import { useSteps } from './contexts/steps'

const pages = {
  form: {
    title: 'Register',
    element: <RegisterForm />,
  },
  topics: {
    title: 'Which topics are you interested in',
    element: <TopicsForm />,
  },
  summary: {
    title: 'Summary',
    element: <Summary />,
  },
} as const

export const App = () => {
  const { currentStep } = useSteps()

  const { title: pageTitle, element: currentPage } = pages[currentStep.name]
  return (
    <main className="w-dvw h-dvh bg-neutral-900 flex items-center justify-center text-neutral-200 antialiased">
      <div className="relative h-100 w-full max-w-lg shiny-tl rounded-md p-px mx-2 sm:mx-0">
        <img
          src={bgRadial}
          alt="blurred purple circle"
          className="absolute size-96 -top-36 -left-36"
        />

        <div className="size-full bg-neutral-800 rounded-md p-10 backdrop-opacity-100 overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={currentStep.id}
              initial={{ translateX: '120%' }}
              animate={{ translateX: 0 }}
              exit={{ translateX: '-120%' }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                visualDuration: 0.5,
              }}
              className="flex flex-col gap-8 h-full"
            >
              <h1 className="text-xl font-semibold">{pageTitle}</h1>

              {currentPage}
            </motion.div>
          </AnimatePresence>
        </div>

        <StepsDisplay />
      </div>
    </main>
  )
}
