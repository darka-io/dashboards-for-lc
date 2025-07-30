import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/explorer/satisfaction')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/explorer/satisfaction"!</div>
}
