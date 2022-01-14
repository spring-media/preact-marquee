export type DimensionsHelperValues = {
    offsetWidth?: number;
    offsetHeight?: number;
    innerWidth?: number;
    innerHeight?: number;
};

/**
 * Helper class for managing browser dimensions.
 */
export class DimensionsHelper {
    private readonly originalOffsetHeight: PropertyDescriptor | undefined;
    private readonly originalOffsetWidth: PropertyDescriptor | undefined;
    private readonly originalInnerWidth: PropertyDescriptor | undefined;
    private readonly originalInnerHeight: PropertyDescriptor | undefined;

    public constructor() {
        this.originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
        this.originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
        this.originalInnerWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerWidth');
        this.originalInnerHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerHeight');
    }

    private static setAllProperties(config: Record<string, number | PropertyDescriptor | undefined>): void {
        Object.keys(config).forEach((propertyName) => {
            if (config[propertyName] !== undefined) {
                Object.defineProperty(HTMLElement.prototype, propertyName, {
                    configurable: true,
                    value: config[propertyName]
                });
            }
        });
    }

    public simulateValues(props: DimensionsHelperValues): void {
        const { offsetWidth, offsetHeight, innerWidth, innerHeight } = props;

        DimensionsHelper.setAllProperties({
            'offsetHeight': offsetHeight,
            'offsetWidth': offsetWidth,
            'innerWidth': innerWidth,
            'innerHeight': innerHeight,
        });
    }

    public restore(): void {
        DimensionsHelper.setAllProperties({
            'offsetHeight': this.originalOffsetHeight,
            'offsetWidth': this.originalOffsetWidth,
            'innerWidth': this.originalInnerWidth,
            'innerHeight': this.originalInnerHeight,
        });
    }
}
