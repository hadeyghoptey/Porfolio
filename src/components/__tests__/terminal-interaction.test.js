/**
 * Unit tests for terminal interaction enabling after transition
 * Tests Requirements 4.3 and 4.4
 */

import { render, screen, waitFor } from '@testing-library/react';
import IntroController from '../IntroController';
import { useFirstVisit } from '@/hooks/useFirstVisit';

// Mock the useFirstVisit hook
jest.mock('@/hooks/useFirstVisit');

// Mock the child components
jest.mock('../Terminal', () => {
  return function Terminal() {
    return <div data-testid="terminal">Terminal</div>;
  };
});

jest.mock('../KamehamehaAnimation', () => {
  return function KamehamehaAnimation({ onComplete }) {
    return (
      <div data-testid="animation">
        <button onClick={onComplete}>Complete Animation</button>
      </div>
    );
  };
});

describe('Terminal Interaction After Transition', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock window.matchMedia for reduced motion detection
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    // Mock Image for asset loading
    global.Image = class {
      constructor() {
        setTimeout(() => {
          this.onload();
        }, 0);
      }
    };
  });

  test('terminal has pointer-events: none during transition', async () => {
    // Setup: First-time visitor
    useFirstVisit.mockReturnValue({
      isFirstVisit: true,
      markVisited: jest.fn(),
    });

    const { container } = render(<IntroController />);

    // Wait for animation to be rendered
    await waitFor(() => {
      expect(screen.getByTestId('animation')).toBeInTheDocument();
    });

    // Trigger animation completion
    const completeButton = screen.getByText('Complete Animation');
    completeButton.click();

    // Wait for terminal to appear
    await waitFor(() => {
      expect(screen.getByTestId('terminal')).toBeInTheDocument();
    });

    // Check that terminal's parent wrapper has pointer-events: none during transition
    const terminal = screen.getByTestId('terminal');
    const terminalWrapper = terminal.parentElement;
    expect(terminalWrapper).toBeInTheDocument();
    
    // Get computed style to check pointer-events
    const computedStyle = window.getComputedStyle(terminalWrapper);
    expect(computedStyle.pointerEvents).toBe('none');
  });

  test('terminal has pointer-events: auto after transition completes', async () => {
    // Setup: First-time visitor
    useFirstVisit.mockReturnValue({
      isFirstVisit: true,
      markVisited: jest.fn(),
    });

    const { container } = render(<IntroController />);

    // Wait for animation to be rendered
    await waitFor(() => {
      expect(screen.getByTestId('animation')).toBeInTheDocument();
    });

    // Trigger animation completion
    const completeButton = screen.getByText('Complete Animation');
    completeButton.click();

    // Wait for terminal to appear
    await waitFor(() => {
      expect(screen.getByTestId('terminal')).toBeInTheDocument();
    });

    // Wait for transition to complete (800ms)
    await waitFor(
      () => {
        const terminal = screen.getByTestId('terminal');
        const terminalWrapper = terminal.parentElement;
        const computedStyle = window.getComputedStyle(terminalWrapper);
        expect(computedStyle.pointerEvents).toBe('auto');
      },
      { timeout: 1000 }
    );
  });

  test('terminal is fully functional after 800ms transition', async () => {
    // Setup: First-time visitor
    const markVisited = jest.fn();
    useFirstVisit.mockReturnValue({
      isFirstVisit: true,
      markVisited,
    });

    const { container } = render(<IntroController />);

    // Wait for animation to be rendered
    await waitFor(() => {
      expect(screen.getByTestId('animation')).toBeInTheDocument();
    });

    // Trigger animation completion
    const completeButton = screen.getByText('Complete Animation');
    completeButton.click();

    // Wait for terminal to appear
    await waitFor(() => {
      expect(screen.getByTestId('terminal')).toBeInTheDocument();
    });

    // Verify markVisited was called
    expect(markVisited).toHaveBeenCalledTimes(1);

    // Wait for transition to complete (800ms) and verify terminal is interactive
    await waitFor(
      () => {
        const terminal = screen.getByTestId('terminal');
        const terminalWrapper = terminal.parentElement;
        const computedStyle = window.getComputedStyle(terminalWrapper);
        expect(computedStyle.pointerEvents).toBe('auto');
      },
      { timeout: 1000 }
    );

    // Terminal should be visible and interactive
    const terminal = screen.getByTestId('terminal');
    expect(terminal).toBeVisible();
  });

  test('returning visitor gets terminal without transition delay', async () => {
    // Setup: Returning visitor
    useFirstVisit.mockReturnValue({
      isFirstVisit: false,
      markVisited: jest.fn(),
    });

    const { container } = render(<IntroController />);

    // Terminal should appear immediately
    await waitFor(() => {
      expect(screen.getByTestId('terminal')).toBeInTheDocument();
    });

    // Terminal should be rendered directly without wrapper (no transition)
    const terminal = screen.getByTestId('terminal');
    // For returning visitors, Terminal is rendered directly without TerminalWrapper
    // So the parent should be the container div from the test
    expect(terminal).toBeVisible();
  });
});
