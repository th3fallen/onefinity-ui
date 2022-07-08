import { useMachineState } from "store/store";

type Props = {
    precision?: number;
    unit?: string;
    scale?: number;
    value: number;
};

const defaultProps = {
    precision: 0,
    unit: 'mm',
    scale: 25.4
}

export default function Number(props: Props) {
    props = { ...defaultProps, ...props };

    const machineInImperial = useMachineState().data.imperial;

    const mutateValue = () => {
        const { value, precision, scale } = props;
        let mutatedValue = value;

        if (machineInImperial) {
            mutatedValue = value / scale;
        }

        return mutatedValue?.toFixed(precision).toLocaleString();
    };

    return <>{ mutateValue() } <span>{ props.unit }</span></>;
}
