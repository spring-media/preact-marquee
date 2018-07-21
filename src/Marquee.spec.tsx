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

    expect(app.find('.jsx-marquee__content-item').length).toBe(expectedBreakingNewsItems);
});
