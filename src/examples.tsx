import { h, render } from 'preact';
import { Marquee } from './Marquee';

const children = createChildren(10);

// Example 1
render(<Marquee>{children}</Marquee>, elementWithId('example-1'));

// Example 2
render(<Marquee animationFunction={'ease'}>{children}</Marquee>, elementWithId('example-2'));

// Example 3
render(<Marquee animationFunction={'ease-in'}>{children}</Marquee>, elementWithId('example-3'));

// Example 4
render(<Marquee animationFunction={'ease-out'}>{children}</Marquee>, elementWithId('example-4'));

// Example 5
render(<Marquee animationFunction={'ease-in-out'}>{children}</Marquee>, elementWithId('example-5'));

function createChildren(count: number): JSX.Element[] {
    let items = [];
    for (let i = 1; i <= count; i++) {
        items.push(<span className={'marquee-example__item'}>Element #{i}</span>);
    }
    return items;
}

function elementWithId(id: string): HTMLElement {
    return document.getElementById(id) as HTMLElement;
}
