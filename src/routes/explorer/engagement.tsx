import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/explorer/engagement')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/explorer/engagement"!</div>
}
