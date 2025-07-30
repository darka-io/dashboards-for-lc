import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/explorer/responses_time')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/explorer/responses_time"!</div>
}
