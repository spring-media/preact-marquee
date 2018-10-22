import { Component, h } from 'preact';
import './marquee.scss';

export interface Props {
    // Should the marquee animation pause when cursor is hovered over?
    pauseWhenHovered?: boolean;
    // The rate at which the content makes one round.
    durationInSeconds?: number;
    // The time after which the animation begins.
    startAnimationAfterInSeconds?: number;
    // The animation function specifies the speed curve of the animation.
    animationFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
    // Custom speed configuration for various breakpoints.
    breakpointSpeedConfig?: BreakpointSpeedConfig[];
}

export interface State {
    copyCount: number;
    pauseWhenHoveredClassName: string;
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
        pauseWhenHovered: true,
        durationInSeconds: 12,
        startAnimationAfterInSeconds: 2,
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
            pauseWhenHoveredClassName: '',
            animationClassName: '',
            animationTimeInSeconds: 0,
            contentWidth: 0,
            containerWidth: 0
        });
    }

    public componentDidMount(): void {
        this.setupRuntimeVariables();
        this.startAnimation();
        this.pauseWhenHovered();
        this.measureRuntimeVariablesAgainIfWindowIsResized();
    }

    public componentWillUnmount(): void {
        window.removeEventListener('resize', this.resizeCallback);
    }

    public render(): JSX.Element {
        const cssVariables: string = [
            `--preact-marquee--animation-function: ${this.props.animationFunction}`,
            `--preact-marquee--animation-delay: ${this.props.startAnimationAfterInSeconds}s`,
            `--preact-marquee--content-width: -${this.state.contentWidth}px`,
            `--preact-marquee--animation-time: ${this.state.animationTimeInSeconds}s`
        ].join(';');

        return (
            <div className={'preact-marquee'} style={cssVariables} ref={this.saveMarqueeReference}>
                <div
                    className={`preact-marquee__content ${this.state.animationClassName} ${
                        this.state.pauseWhenHoveredClassName
                    }`}
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
        this.setState({
            animationClassName: 'preact-marquee__content--is-animated'
        });
    }

    private stopAnimation(): void {
        this.setState({
            animationClassName: ''
        });
    }

    private pauseWhenHovered(): void {
        if (this.props.pauseWhenHovered) {
            this.setState({
                pauseWhenHoveredClassName: 'preact-marquee__content--pause-when-hovered'
            });
        }
    }

    private measureRuntimeVariablesAgainIfWindowIsResized(): void {
        this.resizeCallback = (): void => {
            const pageWidthHasChanged: boolean = this.pageWidth !== Marquee.getPageWidth();

            if (pageWidthHasChanged) {
                this.stopAnimation();

                this.setupRuntimeVariables();

                this.startAnimationAndForceReflow();
            }
        };

        window.addEventListener('resize', this.resizeCallback);
    }

    // This is to force a reflow which is necessary in order to transition styles when adding a class name.
    private startAnimationAndForceReflow() {
        setTimeout(() => {
            this.startAnimation();
        }, 0);
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
                <div className={`preact-marquee__content-item`} key={`content-row-${i}`}>
                    {this.props.children}
                </div>
            );
        }

        return content;
    }
}
