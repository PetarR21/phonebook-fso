import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Persons from '../components/Persons'

describe('Persons component', () => {
  const mockPersons = [
    { id: '1', name: 'John Doe', number: '123-456-7890' },
    { id: '2', name: 'Jane Smith', number: '098-765-4321' },
  ]

  it('renders list of persons with names and numbers', () => {
    const mockRemovePerson = vi.fn()

    render(
      <Persons filteredPersons={mockPersons} removePerson={mockRemovePerson} />
    )

    // Check if persons are rendered
    expect(screen.getByText(/John Doe/)).toBeInTheDocument()
    expect(screen.getByText(/123-456-7890/)).toBeInTheDocument()
    expect(screen.getByText(/Jane Smith/)).toBeInTheDocument()
    expect(screen.getByText(/098-765-4321/)).toBeInTheDocument()

    // Check if delete buttons are rendered
    const deleteButtons = screen.getAllByText('delete')
    expect(deleteButtons).toHaveLength(2)
  })

  it('calls removePerson when delete button is clicked', async () => {
    const mockRemovePerson = vi.fn()
    const user = userEvent.setup()

    render(
      <Persons filteredPersons={mockPersons} removePerson={mockRemovePerson} />
    )

    const deleteButtons = screen.getAllByText('delete')

    // Click the first delete button
    await user.click(deleteButtons[0])

    expect(mockRemovePerson).toHaveBeenCalledWith(mockPersons[0])
  })

  it('renders empty list when no persons provided', () => {
    const mockRemovePerson = vi.fn()

    const { container } = render(
      <Persons filteredPersons={[]} removePerson={mockRemovePerson} />
    )

    // Should render a div but with no persons
    expect(container.firstChild).toBeInTheDocument()
    expect(screen.queryByText('delete')).not.toBeInTheDocument()
  })
})
