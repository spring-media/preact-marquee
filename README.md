# preact-marquee

![npm version](https://img.shields.io/npm/v/preact-marquee.svg)
![dependencies](https://img.shields.io/david/spring-media/preact-marquee.svg)
![dev dependencies](https://img.shields.io/david/dev/spring-media/preact-marquee.svg)
![License](https://img.shields.io/npm/l/preact-marquee.svg)

Preact-Marquee is a marquee component for [Preact](https://preactjs.com/).

In case you don’t know what a marquee is, here is a short description:
A marquee is generally some content that floats from one side of the screen to the other.

**Features**:
* High performance
* Dynamic content
* Revolver mode

## Getting Started

Install it via yarn or npm:

```shell
yarn add preact-marquee --save
```

```shell
npm install preact-marquee --save
```

## Example

```jsx
import { Component, h } from 'preact';
import { Marquee } from './Marquee';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <h1>Your App</h1>

                <Marquee>
                    <span>Item 1</span>
                    <span>Item 2</span>
                    <span>Item 3</span>
                </Marquee>
            </div>
        );
    }
}
```

## Props

### pauseWhenHovered
Should the marquee animation pause when cursor is hovered over?

- Type: Boolean
- Default: `true`

### durationInSeconds
The rate (in seconds) at which the content makes one round.

- Type: Number
- Default: `12`

### startAnimationAfterInSeconds
 The time (in seconds) after which the animation begins.

- Type: Number
- Default: `1.5`

### animationFunction
The animation function specifies the speed curve of the animation.

- Type: `linear | ease | ease-in | ease-out | ease-in-out`
- Default: `linear`

### breakpointSpeedConfig
Custom speed configuration for various breakpoints.

- Type: BreakpointSpeedConfig
    ```typescript
    type BreakpointSpeedConfig = {
        name: string;
        fromWidth: number;
        speedMultiplier: number;
    };
    ```

- Default:
    ```
    {
        name: 'small',
        fromWidth: 0,
        speedMultiplier: 2.5
    },
    {
        name: 'medium',
        fromWidth: 600,
        speedMultiplier: 1.5
    },
    {
        name: 'large',
        fromWidth: 910,
        speedMultiplier: 1
    }
    ```

## Scripts

```bash
# start app
yarn start

# run tests
yarn test

# build
yarn build
```

## License

[MIT](./LICENSE)
