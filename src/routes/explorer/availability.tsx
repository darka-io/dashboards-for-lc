import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/explorer/availability')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/explorer/availability"!</div>
}
