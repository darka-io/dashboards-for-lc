import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/explorer/agent_performance')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/explorer/agent_performance"!</div>
}
