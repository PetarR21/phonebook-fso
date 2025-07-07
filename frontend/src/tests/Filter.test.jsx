import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Filter from '../components/Filter'

describe('Filter component', () => {
  it('renders filter input with correct value and calls handler on change', async () => {
    const mockHandleFilterChange = vi.fn()
    const filterValue = 'test filter'
    const user = userEvent.setup()

    render(
      <Filter
        filter={filterValue}
        handleFilterChange={mockHandleFilterChange}
      />
    )

    // Check if the component renders correctly
    expect(screen.getByText('filter:')).toBeInTheDocument()

    // Check if input has correct value
    const filterInput = screen.getByDisplayValue(filterValue)
    expect(filterInput).toBeInTheDocument()

    // Test that onChange handler is called when typing
    await user.type(filterInput, ' more text')
    expect(mockHandleFilterChange).toHaveBeenCalled()
  })
})
