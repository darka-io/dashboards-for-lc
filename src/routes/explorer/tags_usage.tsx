import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/explorer/tags_usage')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/explorer/tags_usage"!</div>
}
