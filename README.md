# preact-marquee

![npm version](https://img.shields.io/npm/v/preact-marquee.svg)
![dependencies](https://img.shields.io/david/spring-media/preact-marquee.svg)
![dev dependencies](https://img.shields.io/david/dev/spring-media/preact-marquee.svg)
![License](https://img.shields.io/npm/l/preact-marquee.svg)

A <marquee> component for Preact.

## Getting Started

Install it via npm or yarn:

```shell
npm install --save preact-marquee
```

```shell
yarn add preact-marquee --save
```

## Example

```html
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

### durationInSeconds
The rate (in seconds) at which the content makes one round.

- Type: Number
- Default: `12`

### startAnimationAfterInMs
 The time (in milliseconds) after which the animation begins.

- Type: Number
- Default: `1500`

### animationFunction
The animation function specifies the speed curve of the animation.

- Type: `linear | ease | ease-in | ease-out | ease-in-out`
- Default: `linear`

### breakpointSpeedConfig
Custom speed configuration for various breakpoints.

- Type: BreakpointSpeedConfig
    ```
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

MIT
