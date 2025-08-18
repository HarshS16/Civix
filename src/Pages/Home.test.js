import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './Home'; // Adjust path to your Home component

describe('Home Component', () => {
  it('should render the main heading', () => {
    // You'll need to wrap Home in any required providers (like Router, Redux, etc.)
    // For this example, we'll assume it renders without them.
    render(<Home />);

    // Check if an element with the text "Welcome to Civix" exists.
    expect(screen.getByText(/Welcome to Civix/i)).toBeInTheDocument();
  });
});
