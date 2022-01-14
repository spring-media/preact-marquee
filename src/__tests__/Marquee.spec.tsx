import { render, screen, waitFor } from '@testing-library/preact';
import { h } from 'preact';
import { DimensionsHelper } from '../__utils__/DimensionsHelper';
import { Marquee } from '../Marquee';

const dimensions = new DimensionsHelper();
let marqueeElement: HTMLElement;
let resizeMarqueeCallback: VoidFunction;

beforeEach(() => {
    dimensions.simulateValues({ offsetWidth: 500 });

    window.ResizeObserver = jest.fn().mockImplementation(cb => {
        resizeMarqueeCallback = cb;

        return {
            observe: jest.fn(),
            disconnect: jest.fn()
        };
    });

    const marquee = (
        <Marquee>
            <span>Item</span>
        </Marquee>
    );

    marqueeElement = render(marquee).container.firstChild as HTMLElement;
});

afterEach(() => {
    dimensions.restore();
});

it('should render twice the item count as default because of looping content', () => {
    expect(screen.getAllByText('Item').length).toBe(2);
});

it('should animate the marquee content', () => {
    expect(screen.getByTestId('content').classList).toContain('preact-marquee__content--is-animated');
});

it('should pause the animation when cursor is hovered over', () => {
    expect(screen.getByTestId('content').classList).toContain('preact-marquee__content--pause-when-hovered');
});

it('should re-measure the content width when marquee is resized', async () => {
    expect(getComputedStyle(marqueeElement).getPropertyValue('--preact-marquee--content-width')).toEqual('-500px');

    dimensions.simulateValues({ offsetWidth: 1000 });
    resizeMarqueeCallback();

    await waitFor(() => {
        expect(getComputedStyle(marqueeElement).getPropertyValue('--preact-marquee--content-width')).toEqual('-1000px');
    });
});
