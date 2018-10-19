import { h } from 'preact';
import { deep, RenderContext } from 'preact-render-spy';
import { Marquee } from './Marquee';

// tslint:disable-next-line:no-any
let app: RenderContext<any, any>;

beforeEach(() => {
    app = deep(
        <Marquee>
            <span>Item</span>
        </Marquee>
    );
});

it('should render twice the item count as default because of looping content', () => {
    const expectedBreakingNewsItems: number = 2;

    expect(app.find('.preact-marquee__content-item').length).toBe(expectedBreakingNewsItems);
});

it('should animate the marquee content', () => {
    expect(app.find('.preact-marquee__content--is-animated').length).toBe(1);
});

it('should pause the animation when cursor is hovered over', () => {
    expect(app.find('.preact-marquee__content--pause-when-hovered').length).toBe(1);
});
