import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from '../App'

// Mock the persons service
vi.mock('../services/persons', () => ({
  default: {
    getAll: vi.fn(() => Promise.resolve([])),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}))

describe('App component', () => {
  it('renders the phonebook application with main sections', async () => {
    render(<App />)

    // Check if main headings are rendered
    expect(screen.getByText('Phonebook')).toBeInTheDocument()
    expect(screen.getByText('Add a new')).toBeInTheDocument()
    expect(screen.getByText('Numbers')).toBeInTheDocument()

    // Check if form elements are present
    expect(screen.getByText('filter:')).toBeInTheDocument()
    expect(screen.getByText('name:')).toBeInTheDocument()
    expect(screen.getByText('number:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument()
  })
})
