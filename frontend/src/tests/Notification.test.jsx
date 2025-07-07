import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Notification from '../components/Notification'

describe('Notification component', () => {
  it('renders success notification with correct styling', () => {
    const message = 'Person added successfully'

    render(<Notification message={message} type='success' />)

    const notification = screen.getByText(message)
    expect(notification).toBeInTheDocument()
    expect(notification).toHaveClass('success')
  })

  it('renders error notification with correct styling', () => {
    const message = 'Something went wrong'

    render(<Notification message={message} type='error' />)

    const notification = screen.getByText(message)
    expect(notification).toBeInTheDocument()
    expect(notification).toHaveClass('error')
  })

  it('does not render when message is null', () => {
    const { container } = render(<Notification message={null} type='success' />)

    expect(container.firstChild).toBeNull()
  })

  it('defaults to success styling when type is not error', () => {
    const message = 'Default notification'

    render(<Notification message={message} type='info' />)

    const notification = screen.getByText(message)
    expect(notification).toHaveClass('success')
  })
})
