import { useSteps } from '@/contexts/steps'
import { useUserData } from '@/contexts/user/user'
import { tv } from 'tailwind-variants'
import { Button } from '../ui/button'

const text = tv({
  base: 'text-base font-medium text-left',
  variants: {
    text: {
      title: 'text-neutral-400',
      value: 'text-neutral-200',
    },
  },
})

export const Summary = () => {
  const { onNextStep } = useSteps()
  const { userData, onResetUserData } = useUserData()

  function handleReturn() {
    onResetUserData()
    onNextStep()
  }

  const topics = userData?.selectedTopics || []
  return (
    <div className="flex flex-col grow gap-6">
      <div className="space-y-1">
        <p className={text({ text: 'title' })}>
          Name:{' '}
          <span className={text({ text: 'value' })}>{userData?.name}</span>
        </p>
        <p className={text({ text: 'title' })}>
          Email:{' '}
          <span className={text({ text: 'value' })}>{userData?.email}</span>
        </p>
      </div>

      <div>
        <p className={text({ text: 'title' })}>Topics:</p>
        <ul
          className={text({
            text: 'value',
            className: 'list-disc list-inside **:pl-3',
          })}
        >
          {topics.map(topic => (
            <li key={topic.id}>{topic.label}</li>
          ))}
        </ul>
      </div>
      <Button
        type="button"
        onClick={handleReturn}
        className="mt-auto w-32 self-center rounded-3xl bg-primary-foreground text-white font-light transition-[colors_transform] duration-200 hover:scale-105 cursor-pointer"
      >
        Reset
      </Button>
    </div>
  )
}
