import { Component, h } from 'preact';
import './marquee.scss';

export interface Props {
    // The rate at which the content makes one round.
    durationInSeconds?: number;
    // The time after which the animation begins.
    startAnimationAfterInMs?: number;
    // The animation function specifies the speed curve of the animation.
    animationFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
    // Custom speed configuration for various breakpoints.
    breakpointSpeedConfig?: BreakpointSpeedConfig[];
}

export interface State {
    copyCount: number;
    animationClassName: string;
    animationTimeInSeconds: number;
    contentWidth: number;
    containerWidth: number;
}

export type BreakpointSpeedConfig = {
    name: string;
    fromWidth: number;
    speedMultiplier: number;
};

export class Marquee extends Component<Props, State> {
    public static defaultProps: Props = {
        durationInSeconds: 12,
        startAnimationAfterInMs: 1500,
        animationFunction: 'linear',
        breakpointSpeedConfig: [
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
        ]
    };

    private marqueeElement: HTMLElement;
    private contentElement: HTMLElement;
    private resizeCallback: () => void;
    private startAnimationTimeout: number;
    private pageWidth: number;

    private static getPageWidth(): number {
        return Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.documentElement.clientWidth
        );
    }

    constructor(props: Props) {
        super(props);

        this.setState({
            copyCount: 2,
            animationClassName: '',
            animationTimeInSeconds: 0,
            contentWidth: 0,
            containerWidth: 0
        });
    }

    public componentDidMount(): void {
        this.setupRuntimeVariables();
        this.startAnimation();
        this.measureRuntimeVariablesAgainIfWindowIsResized();
    }

    public componentWillUnmount(): void {
        clearTimeout(this.startAnimationTimeout);
        window.removeEventListener('resize', this.resizeCallback);
    }

    public render(): JSX.Element {
        const cssVariables: string = [
            `--jsx-marquee--animation-function: ${this.props.animationFunction}`,
            `--jsx-marquee--start-animation-time-in-ms: ${this.props.startAnimationAfterInMs}`,
            `--jsx-marquee--content-width: -${this.state.contentWidth}px`,
            `--jsx-marquee--animation-time: ${this.state.animationTimeInSeconds}s`
        ].join(';');

        return (
            <div className={'jsx-marquee'} style={cssVariables} ref={this.saveMarqueeReference}>
                <div
                    className={`jsx-marquee__content ${this.state.animationClassName}`}
                    ref={this.saveContentReference}
                >
                    {this.renderContent(this.state)}
                </div>
            </div>
        );
    }

    private saveMarqueeReference = (container: HTMLElement): void => {
        this.marqueeElement = container;
    };

    private saveContentReference = (content: HTMLElement): void => {
        this.contentElement = content;
    };

    private setupRuntimeVariables(): void {
        this.measureContent();
        this.calculateAnimationTime();
        this.setPageWidth();
    }

    private setPageWidth(): void {
        this.pageWidth = Marquee.getPageWidth();
    }

    private breakpointSpeedFactor(): number {
        // tslint:disable-next-line:no-non-null-assertion
        const multiplier: BreakpointSpeedConfig = this.props.breakpointSpeedConfig
            .filter((breakpointSpeedConfig: BreakpointSpeedConfig) => {
                return Marquee.getPageWidth() > breakpointSpeedConfig.fromWidth;
            })
            .pop();

        return multiplier ? 1 / multiplier.speedMultiplier : 1;
    }

    private calculateAnimationTime(): void {
        this.setState({
            animationTimeInSeconds: Math.ceil(
                // tslint:disable-next-line:no-non-null-assertion
                this.state.contentWidth /
                    (this.state.containerWidth / (this.props.durationInSeconds * this.breakpointSpeedFactor()))
            )
        });
    }

    private startAnimation(): void {
        this.startAnimationTimeout = setTimeout(() => {
            this.setState({
                animationClassName: 'jsx-marquee__content--is-animated'
            });
        }, this.props.startAnimationAfterInMs);
    }

    private measureRuntimeVariablesAgainIfWindowIsResized(): void {
        this.resizeCallback = (): void => {
            const pageWidthHasNotChanged: boolean = this.pageWidth === Marquee.getPageWidth();
            if (pageWidthHasNotChanged) {
                return;
            }

            const stopAnimation: () => void = (): void => {
                this.setState({ animationClassName: '' });
            };

            stopAnimation();
            this.setupRuntimeVariables();
            this.startAnimation();
        };

        window.addEventListener('resize', this.resizeCallback);
    }

    private measureContent(): void {
        const containerWidth: number = this.marqueeElement.offsetWidth;
        const contentWidth: number = (this.contentElement.firstChild as HTMLElement).offsetWidth;

        const hasSizeOfContentChanged: boolean =
            this.state.containerWidth !== containerWidth || this.state.contentWidth !== contentWidth;
        if (hasSizeOfContentChanged) {
            const copyCount: number = Math.ceil(containerWidth / contentWidth) + 1;

            this.setState({
                copyCount: copyCount,
                contentWidth: contentWidth,
                containerWidth: containerWidth
            });
        }
    }

    private renderContent({ copyCount }: { copyCount: number }): JSX.Element[] {
        const content: JSX.Element[] = [];

        for (let i: number = 0; i < copyCount; ++i) {
            content.push(
                <div className={`jsx-marquee__content-item`} key={`content-row-${i}`}>
                    {this.props.children}
                </div>
            );
        }

        return content;
    }
}
