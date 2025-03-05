import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import zod from 'zod'

import { useSteps } from '@/contexts/steps'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const registerFormSchema = zod.object({
  name: zod
    .string()
    .min(1, 'Name is required')
    .min(3, 'Name must have at least 3 letters'),
  email: zod.string().min(1, 'Email is required').email('Invalid email'),
})

type RegisterFormSchema = zod.infer<typeof registerFormSchema>

export const RegisterForm = () => {
  const { onNextStep } = useSteps()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: 'Gabriel',
      email: 'gabrielpaiva423@gmail.com',
    },
  })

  function onSubmit(data: RegisterFormSchema) {
    console.log(data)

    onNextStep()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col grow gap-2 items-center"
    >
      <Label className="text-sm font-light w-full flex flex-col items-start">
        Name
        <Input {...register('name')} className="border-neutral-200/50" />
        <span
          data-visible={Boolean(errors.name?.message)}
          className="text-destructive text-xs font-medium h-4 transition-opacity duration-200 opacity-0 data-[visible=true]:opacity-100"
        >
          {errors.name?.message}
        </span>
      </Label>
      <Label className="text-sm font-light w-full flex flex-col items-start">
        Email
        <Input {...register('email')} className="border-neutral-200/50" />
        <span
          data-visible={Boolean(errors.email?.message)}
          className="text-destructive text-xs font-medium h-4 transition-opacity duration-200 opacity-0 data-[visible=true]:opacity-100"
        >
          {errors.email?.message}
        </span>
      </Label>

      <Button
        type="submit"
        className="mt-auto w-32 rounded-3xl bg-primary-foreground text-white font-light transition-[colors_transform] duration-200 hover:scale-105 cursor-pointer"
      >
        Continue
      </Button>
    </form>
  )
}
