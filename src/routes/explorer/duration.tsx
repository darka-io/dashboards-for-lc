import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/explorer/duration')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/explorer/duration"!</div>
}
