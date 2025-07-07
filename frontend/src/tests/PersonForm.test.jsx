import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import PersonForm from '../components/PersonForm'

describe('PersonForm component', () => {
  it('renders form inputs and submit button correctly', () => {
    const mockProps = {
      newName: 'John Doe',
      handleNameChange: vi.fn(),
      newNumber: '123-456-7890',
      handleNumberChange: vi.fn(),
      addPerson: vi.fn(),
    }

    render(<PersonForm {...mockProps} />)

    // Check if form elements are rendered
    expect(screen.getByText('name:')).toBeInTheDocument()
    expect(screen.getByText('number:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument()

    // Check if inputs have correct values
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('123-456-7890')).toBeInTheDocument()
  })

  it('calls handlers when inputs change and form is submitted', async () => {
    const mockHandleNameChange = vi.fn()
    const mockHandleNumberChange = vi.fn()
    const mockAddPerson = vi.fn()
    const user = userEvent.setup()

    const mockProps = {
      newName: '',
      handleNameChange: mockHandleNameChange,
      newNumber: '',
      handleNumberChange: mockHandleNumberChange,
      addPerson: mockAddPerson,
    }

    render(<PersonForm {...mockProps} />)

    const inputs = screen.getAllByRole('textbox')
    const nameInput = inputs[0] // First input is the name input
    const numberInput = inputs[1] // Second input is the number input

    // Test name input change
    await user.type(nameInput, 'Jane')
    expect(mockHandleNameChange).toHaveBeenCalled()

    // Test number input change
    await user.type(numberInput, '555')
    expect(mockHandleNumberChange).toHaveBeenCalled()

    // Test form submission using fireEvent on the form element
    const formElement = nameInput.closest('form')
    fireEvent.submit(formElement)
    expect(mockAddPerson).toHaveBeenCalled()
  })
})
