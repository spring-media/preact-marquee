import { mount, ReactWrapper, render } from 'enzyme';
import { h } from 'preact';
import { ReactElement } from 'react';
import { Marquee } from './Marquee';

let marqueeWithAllChildren: Cheerio, marqueeWithLifecycleMethods: ReactWrapper;

beforeEach(() => {
    const marquee: ReactElement = (
        <Marquee>
            <span>Item</span>
        </Marquee>
    ) as ReactElement;

    marqueeWithAllChildren = render(marquee);
    marqueeWithLifecycleMethods = mount(marquee);
});

it('should render twice the item count as default because of looping content', () => {
    const expectedBreakingNewsItems: number = 2;

    expect(marqueeWithAllChildren.find('.preact-marquee__content-item').length).toBe(expectedBreakingNewsItems);
});

it('should animate the marquee content', () => {
    expect(marqueeWithLifecycleMethods.find('.preact-marquee__content--is-animated').length).toBe(1);
});

it('should pause the animation when cursor is hovered over', () => {
    expect(marqueeWithLifecycleMethods.find('.preact-marquee__content--pause-when-hovered').length).toBe(1);
});
