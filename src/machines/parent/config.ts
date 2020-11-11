const context = {}

const config = {
    id: 'parent',
    context,
    initial: 'start',
    states: {
        start: {
            invoke: [
                {
                    id: 'startFibonacci',
                    src: 'startFibonacci'
                }
            ],
            on: {
                SEND_TO_PRODUCER: {
                    actions: ['sendToProducer']
                }
            }
        }
    }
}

export default config