import { tv } from 'tailwind-variants'
import { Button } from '../ui/button'

interface SummaryProps {
  onChangeStep: () => void
}

const text = tv({
  base: 'text-base font-medium text-left',
  variants: {
    text: {
      title: 'text-neutral-400',
      value: 'text-neutral-200',
    },
  },
})

export const Summary = ({ onChangeStep }: SummaryProps) => {
  const topics = ['React', 'Tailwind CSS', 'TypeScript']

  function handleReturn() {
    onChangeStep()
  }

  return (
    <div className="flex flex-col grow gap-6">
      <div className="space-y-1">
        <p className={text({ text: 'title' })}>
          Name: <span className={text({ text: 'value' })}>John Doe</span>
        </p>
        <p className={text({ text: 'title' })}>
          Email:{' '}
          <span className={text({ text: 'value' })}>johndoe@email.com</span>
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
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>
      <Button
        type="button"
        onClick={handleReturn}
        className="mt-auto w-32 self-center rounded-3xl bg-primary-foreground text-white font-light transition-[colors_transform] duration-200 hover:scale-105 cursor-pointer"
      >
        Finish
      </Button>
    </div>
  )
}
