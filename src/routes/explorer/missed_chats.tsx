import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/explorer/missed_chats')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/explorer/missed_chats"!</div>
}
