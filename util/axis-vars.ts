
export const JOGGING_CONSTS = {
    DIRECTIONS: {
        upperLeft: '-1,1,0,0',
        forward: '0,1,0,0',
        upperRight: '1,1,0,0',
        up: '0,0,1,0',
        left: '-1,0,0,0',
        center: 'zero:all',
        right: '1,0,0,0',
        Z0: 'zero:z',
        lowerLeft: '-1,-1,0,0',
        back: '0,-1,0,0',
        lowerRight: '1,-1,0,0',
        down: '0,0,-1,0',
    },
    INCREMENTS: {
        METRIC: {
            fine: 0.1,
            small: 1.0,
            medium: 10,
            large: 100,
        },
        IMPERIAL: {
            fine: 0.005,
            small: 0.05,
            medium: 10,
            large: 5,
        },
    }
};
export default function getAxisInfo(machineState, config) {

    // function computeAxes() {
    //     let homed = false;
    //
    //     for (let name of 'xyzabc') {
    //         const axis = data[name];
    //         if (!axis.enabled) {
    //             continue;
    //         }
    //
    //         if (!axis.homed) {
    //             homed = false;
    //             break
    //         }
    //         homed = true;
    //     }
    //
    //     let error = false;
    //     let warn = false;
    //
    //     if (homed) {
    //         for (let name of 'xyzabc') {
    //             const axis = data[name];
    //
    //             if (!axis.enabled) {
    //                 continue;
    //             }
    //
    //             if (axis.klass.indexOf('error') !== -1) {
    //                 error = true;
    //             }
    //
    //             if (axis.klass.indexOf('warn') !== -1) {
    //                 warn = true;
    //             }
    //             var klass = homed ? 'homed' : 'unhomed';
    //
    //             if (error) {
    //                 klass += ' error'
    //             } else if (warn) {
    //                 klass += ' warn'
    //             }
    //
    //             if (!homed && ask_home) {
    //                 ask_home_msg = true;
    //                 ask_home = false;
    //             }
    //
    //             return {
    //                 homed,
    //                 klass,
    //             }
    //         }
    //     }
    // }

    function _get_motor_id(axis) {
        if (!config?.motors) {
            return -1;
        }
        for (var i = 0; i < config.motors.length; i++) {
            var motor = config.motors[i];
            if (motor.axis.toLowerCase() == axis) return i;
        }

        return -1;
    };

    const _convert_length = (value) => {
        return machineState.imperial ? value / 25.4 : value;
    };


    const _length_str = (value) => {
        return _convert_length(value).toLocaleString() +
            (machineState.imperial ? ' in' : ' mm');
    };

    function computeAxis(axis) {
        let abs = machineState[axis + 'p'] || 0;
        let off = machineState['offset_' + axis];
        let motor_id = _get_motor_id(axis);
        let motor = motor_id == -1 ? {} : config.motors[motor_id];
        let enabled = typeof motor.enabled != 'undefined' && motor.enabled;
        let homingMode = motor['homing-mode']
        let homed = machineState[motor_id + 'homed'];
        let min = machineState[motor_id + 'tn'];
        let max = machineState[motor_id + 'tm'];
        let dim = max - min;
        let pathMin = machineState['path_min_' + axis];
        let pathMax = machineState['path_max_' + axis];
        let pathDim = pathMax - pathMin;
        let under = pathMin + off < min;
        let over = max < pathMax + off;
        let klass = (homed ? 'homed' : 'unhomed') + ' axis-' + axis;
        let state = 'UNHOMED';
        let icon = 'question-circle';
        let fault = machineState[motor_id + 'df'] & 0x1f;
        let shutdown = machineState.power_shutdown;
        let title;
        let ticon = 'question-circle';
        let tstate = 'NO FILE';
        let toolmsg;
        let tklass = (homed ? 'homed' : 'unhomed') + ' axis-' + axis;

        if (fault || shutdown) {
            state = shutdown ? 'SHUTDOWN' : 'FAULT';
            klass += ' error';
            icon = 'exclamation-circle';

        } else if (homed) {
            state = 'HOMED';
            icon = 'check-circle';
        }

        if (0 < dim && dim < pathDim) {
            tstate = 'NO FIT';
            tklass += ' error';
            ticon = 'ban';

        } else {

            if (over || under) {
                tstate = over ? 'OVER' : 'UNDER';
                tklass += ' warn';
                ticon = 'exclamation-circle';
            } else {
                tstate = 'OK';
                ticon = 'check-circle';
            }
        }

        switch (state) {
            case 'UNHOMED':
                title = 'Click the home button to home axis.';
                break;
            case 'HOMED':
                title = 'Axis successfuly homed.';
                break;
            case 'FAULT':
                title = 'Motor driver fault.  A potentially damaging electrical ' +
                    'condition was detected and the motor driver was shutdown.  ' +
                    'Please power down the controller and check your motor cabling.  ' +
                    'See the "Motor Faults" table on the "Indicators" tab for more ' +
                    'information.';
                break;
            case 'SHUTDOWN':
                title = 'Motor power fault.  All motors in shutdown.  ' +
                    'See the "Power Faults" table on the "Indicators" tab for more ' +
                    'information.  Reboot controller to reset.';
        }

        switch (tstate) {

            case 'OVER':
                toolmsg = 'Caution: The current tool path file would move ' +
                    _length_str(pathMax + off - max) + ' above axis limit with the current offset.';
                break;

            case 'UNDER':
                toolmsg = 'Caution: The current tool path file would move ' +
                    _length_str(min - pathMin - off) + ' below limit with the current offset.';
                break;

            case 'NO FIT':
                toolmsg = 'Warning: The current tool path dimensions (' +
                    _length_str(pathDim) + ') exceed axis dimensions (' +
                    _length_str(dim) + ') by ' +
                    _length_str(pathDim - dim) + '.';
                break;

            default:
                toolmsg = 'Tool path ' + axis + ' dimensions OK.';
                break;

        }


        return {
            pos: abs - off,
            abs: abs,
            off: off,
            min: min,
            max: max,
            dim: dim,
            pathMin: pathMin,
            pathMax: pathMax,
            pathDim: pathDim,
            motor: motor_id,
            enabled: enabled,
            homingMode: homingMode,
            homed: homed,
            klass: klass,
            state: state,
            icon: icon,
            title: title,
            ticon: ticon,
            tstate: tstate,
            toolmsg: toolmsg,
            tklass: tklass
        }
    }

    return {
        x: computeAxis('x'),
        y: computeAxis('y'),
        z: computeAxis('z'),
        a: computeAxis('a'),
        b: computeAxis('b'),
        c: computeAxis('c'),
        // axes: computeAxes(),
    };
}
