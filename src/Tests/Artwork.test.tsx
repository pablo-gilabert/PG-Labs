import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectArtwork } from '../Components/ProjectArtwork/ProjectArtwork';
import { DashboardVisual, ShowcaseVisual } from '../Components/ShowcaseVisual/ShowcaseVisual';

// The illustrations are explicitly decorative; visual strings are checked via the DOM,
// without relying on accessibility roles for aria-hidden artwork.
describe('ProjectArtwork — six distinct sector illustrations', () => {
  it.each([
    ['burger', 'blend-burger-demo.vercel.app'],
    ['store', 'dummy-data-tawny-three.vercel.app'],
    ['restaurant', 'restaurant-demo-iota-taupe.vercel.app'],
    ['academy', 'aulastudio.academy'],
    ['tattoo', 'inkstudio.design'],
    ['salon', 'atelier.salon'],
  ] as const)('renders the %s illustration without a broken branch', (variant, label) => {
    const { container } = render(<ProjectArtwork variant={variant} />);
    expect(container).toHaveTextContent(label);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('uses salon illustration for a fallback visual variant', () => {
    // This covers the default visual branch without changing production project data.
    const { container } = render(<ShowcaseVisual variant="burger" />);
    expect(container).toHaveTextContent('atelier.salon');
  });

  it('renders dashboard statistics in the hero showcase', () => {
    render(<DashboardVisual />);
    expect(screen.getByText('Total revenue')).toBeInTheDocument();
    expect(screen.getByText('Active clients')).toBeInTheDocument();
    expect(screen.getByText('12 bookings')).toBeInTheDocument();
  });
});
