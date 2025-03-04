type Steps = 'form' | 'topics' | 'summary'

interface StepsDisplayProps {
  activeStep: Steps
  steps: readonly Steps[]
}

export const StepsDisplay = ({ steps, activeStep }: StepsDisplayProps) => {
  const totalSteps = steps.length
  const currentStep = steps.findIndex(step => step === activeStep) + 1

  return (
    <div className="flex mx-auto items-center w-fit gap-5 mt-5">
      <p className="text-xs font-light text-neutral-200/75 w-16">
        Step {currentStep} of {totalSteps}
      </p>
      <div className="flex gap-4">
        <span
          data-active={activeStep === 'form'}
          className="block size-2.5 rounded-full bg-neutral-600 transition-[colors_outline] duration-150 data-[active=true]:bg-primary outline-0 data-[active=true]:outline-4 outline-primary-foreground/30"
        />
        <span
          data-active={activeStep === 'topics'}
          className="block size-2.5 rounded-full bg-neutral-600 transition-[colors_outline] duration-150 data-[active=true]:bg-primary outline-0 data-[active=true]:outline-4 outline-primary-foreground/30"
        />
        <span
          data-active={activeStep === 'summary'}
          className="block size-2.5 rounded-full bg-neutral-600 transition-[colors_outline] duration-150 data-[active=true]:bg-primary outline-0 data-[active=true]:outline-4 outline-primary-foreground/30"
        />
      </div>
    </div>
  )
}
