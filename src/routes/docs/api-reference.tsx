import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/api-reference')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/docs/api-reference"!</div>
}
