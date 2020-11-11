import { send } from 'xstate'
import FibonacciMachine from '../fibonacci'

const implementation = {
    actions: {
        sendToProducer: send((_: any, event: any) => ({
            type: 'PRODUCE_TO_TOPIC',
            payload: event.payload
        }), {to: 'kafkaProducer'})
    },
    services: {
        startFibonacci: FibonacciMachine
    },
    guards: {},
    activities: {},
    delays: {}
}

export default implementation