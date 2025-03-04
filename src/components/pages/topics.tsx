import { Controller, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'

import { zodResolver } from '@hookform/resolvers/zod'
import type { CheckedState } from '@radix-ui/react-checkbox'
import zod from 'zod'

interface TopicsFormProps {
  onChangeStep: () => void
}

const topics = [
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
] as const

const topicsFormSchema = zod.object({
  topics: zod
    .array(
      zod.enum(['software-development', 'user-experience', 'graphic-design'])
    )
    .optional(),
})

type TopicsFormSchema = zod.infer<typeof topicsFormSchema>

export const TopicsForm = ({ onChangeStep }: TopicsFormProps) => {
  const { control, handleSubmit } = useForm<TopicsFormSchema>({
    resolver: zodResolver(topicsFormSchema),
    defaultValues: {
      topics: [],
    },
  })

  function onTopicsFormSubmit(_data: TopicsFormSchema) {
    onChangeStep()
  }

  return (
    <form
      onSubmit={handleSubmit(onTopicsFormSubmit)}
      className="w-full h-full grid grid-rows-3 gap-4"
    >
      {topics.map(topic => (
        <Controller
          key={topic.id}
          name="topics"
          control={control}
          render={({ field: { onChange, value } }) => {
            function onSelectTopic(isChecked: CheckedState) {
              const currentTopics = value || []

              if (!isChecked) {
                return currentTopics.filter(
                  checkedOption => checkedOption !== topic.id
                )
              }

              return [...currentTopics, topic.id]
            }

            return (
              <Checkbox
                key={topic.id}
                type="button"
                onCheckedChange={state => onChange(onSelectTopic(state))}
                checked={value?.includes(topic.id)}
                className="w-full h-full text-sm text-left px-5 rounded-xl bg-neutral-700 border-neutral-200/25 transition-colors duration-200 data-[state=checked]:border-neutral-200/25 data-[state=checked]:text-neutral-200"
              >
                {topic.label}
              </Checkbox>
            )
          }}
        />
      ))}
      <Button
        type="submit"
        className="mt-4 w-32 justify-self-center rounded-3xl bg-primary-foreground text-white font-light transition-[colors_transform] duration-200 hover:scale-105 cursor-pointer"
      >
        Continue
      </Button>
    </form>
  )
}
